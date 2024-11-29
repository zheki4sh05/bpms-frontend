import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';
import getRequestFormData from '../../API/requestFormData';


// {
//   id: "id",
//   numeric: true,
//   disablePadding: true,
//   label: "ID",
// },
// {
//   id: "name",
//   numeric: false,
//   disablePadding: false,
//   label: "Название",
// },
// {
//   id: "done",
//   numeric: true,
//   disablePadding: false,
//   label: "Выполнено %",
// },
// {
//   id: "createdAt",
//   numeric: false,
//   disablePadding: false,
//   label: "Начало",
// },
// {
//   id: "deadline",
//   numeric: true,
//   disablePadding: false,
//   label: "Дэдлайн",
// },
// {
//   id: "tasks",
//   numeric: false,
//   disablePadding: false,
//   label: "Задачи",
// },




const initialState = {
    list:[


    ],
    statuses:[],
    addedDocuments:[],
    assignmentStatuses:{},
    created:'idle',
    error:null,
    status:'idle',
    added:'idle',
    selectedTask:{

      id:0,
      stage:{
        id:0,
        name:""
      }

    },

    updated:'idle',

    delDoc:'idle',

    updateTodos:'idle',

    updateStatus:'idle',

    addedDoc:"idle"
}

export const createAssignment = createAsyncThunk(DomainNames.assignments.concat('/createAssignment')  , async (initialData) => {
 
    const response = await axios.post(api.assignments.create,initialData.assignment,getRequestConfig(initialData.token));
    
      return response.data
  })
  
export const getAllUserAssignmnets = createAsyncThunk(DomainNames.assignments.concat('/fetchAssignment')  , async (initialData) => {
    const response = await axios.get(api.assignments.fetch.concat(addParams(initialData.data))  ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const getAllUserAssignmentsStatuses = createAsyncThunk(DomainNames.assignments.concat('/fetchAssignmentStatuses')  , async (initialData) => {
    const response = await axios.get(api.assignments.statuses.concat(addParams(initialData.data))  ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const updateAssignment = createAsyncThunk(DomainNames.assignments.concat('/updateAssignment')  , async (initialData) => {
    const response = await axios.post(api.assignments.update, initialData.data ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const delDocFromAssignment = createAsyncThunk(DomainNames.assignments.concat('/delDocFromAssignment')  , async (initialData) => {
    const response = await axios.delete(api.assignments.docDel.concat(addParams(initialData.data)) ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const updateAssignmentTodos = createAsyncThunk(DomainNames.assignments.concat('/updateAssignmentTodos')  , async (initialData) => {
    const response = await axios.post(api.assignments.updateTodos, initialData.data ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const updateAssignmentWorker = createAsyncThunk(DomainNames.assignments.concat('/updateAssignmentWorker')  , async (initialData) => {
    const response = await axios.post(api.assignments.updateAssignmentWorker, initialData.data ,getRequestConfig(initialData.token));
    
      return response.data
  })

  export const changeAssignmentStatus =  createAsyncThunk(DomainNames.assignments.concat('/changeAssignmentStatus')  , async (initialData) => {
    const response = await axios.post(api.assignments.changeAssignmentStatus, initialData.data ,getRequestConfig(initialData.token));
    
      return response.data
  })
  export const uploadDocForAssignment =  createAsyncThunk(DomainNames.assignments.concat('/upload')  , async (initialData) => {

  
    const response = await axios.post(api.assignments.upload, initialData.data,getRequestFormData(initialData.token));
    
      return response.data
  }) 




  const assignmentsSlice = createSlice({
    name: DomainNames.assignments,
    initialState,
    reducers: {
      resetCreatedAssignStatus(state,action){
        state.created = 'idle'
      },
      setSelectedTask(state,action){
        state.selectedTask = action.payload;
      },
      addDocuments(state,action){
        state.addedDocuments = action.payload;
      },
      resetAddedDocuments(state,action){
        state.addedDocuments = []
      },
      changeTaskStatus(state,action){
      

        state.list = state.list.map((item,index)=>{
          item=>item.id == state.selectedTask.id ?

          {...item, status_id: state.selectedTask.stage.id}
          : item

      })

        state.selectedTask = {
          id:0,
          stage:{
            id:0,
            name:""
          }
        }

      },
      resetAddedDocsStatus(state,action){
        state.addedDoc = 'idle'
      }
    },
    extraReducers(builder) {
        builder
            // -----создание поручения--------------------
          .addCase(createAssignment.pending, (state, action) => {
            state.created = 'loading'
          })
          .addCase(createAssignment.fulfilled, (state, action) => {
            state.created = 'succeeded';
            state.error = null;
          })
          .addCase(createAssignment.rejected, (state, action) => {
            state.created = 'failed';
            state.error = action.error
          })
          //-------------------------------------------------------
          //-----------Получение поручений--------------------------
          .addCase(getAllUserAssignmnets.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(getAllUserAssignmnets.fulfilled, (state, action) => {
            state.status = 'succeeded';

            state.list = action.payload;

            state.error = null;
          })
          .addCase(getAllUserAssignmnets.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------
            //-----------Получение статусов поручений--------------------------
          .addCase(getAllUserAssignmentsStatuses.pending, (state, action) => {
            state.added = 'loading'
          })
          .addCase(getAllUserAssignmentsStatuses.fulfilled, (state, action) => {
            state.added = 'succeeded';
            state.assignmentStatuses = action.payload
            state.error = null;
          })
          .addCase(getAllUserAssignmentsStatuses.rejected, (state, action) => {
            state.added = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------
             //-----------Обновление поручение--------------------------
          .addCase(updateAssignment.pending, (state, action) => {
            state.updated = 'loading'
          })
          .addCase(updateAssignment.fulfilled, (state, action) => {
            state.updated = 'succeeded';
           
            let mass = state.list.filter(item=>item.id!= action.payload.id)
            mass.push(action.payload)
            state.list = mass;
            state.error = null;
          })
          .addCase(updateAssignment.rejected, (state, action) => {
            state.updated = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------

           //-----------Удаление документа от поручения--------------------------
          .addCase(delDocFromAssignment.pending, (state, action) => {
            state.delDoc = 'loading'
          })
          .addCase(delDocFromAssignment.fulfilled, (state, action) => {
            state.delDoc = 'succeeded';
           
            state.error = null;
          })
          .addCase(delDocFromAssignment.rejected, (state, action) => {
            state.delDoc = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------

           //-----------Обновление чек-листа--------------------------
          .addCase(updateAssignmentTodos.pending, (state, action) => {
            state.updateTodos = 'loading'
          })
          .addCase(updateAssignmentTodos.fulfilled, (state, action) => {
            state.updateTodos = 'succeeded';

            state.assignmentStatuses.toDoDTOList = action.payload
           
            state.error = null;
          })
          .addCase(updateAssignmentTodos.rejected, (state, action) => {
            state.updateTodos = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------
           .addCase(updateAssignmentWorker.pending, (state, action) => {
            state.updateWorker = 'loading'
          })
          .addCase(updateAssignmentWorker.fulfilled, (state, action) => {
            state.updateWorker = 'succeeded';

            state.assignmentStatuses.viewUserAsWorker = action.payload
           
            state.error = null;
          })
          .addCase(updateAssignmentWorker.rejected, (state, action) => {
            state.updateWorker = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------
          //-----------Обновление статуса поручения--------------------------
          .addCase(changeAssignmentStatus.pending, (state, action) => {
            state.updateStatus = 'loading'
          })
          .addCase(changeAssignmentStatus.fulfilled, (state, action) => {
            state.updateStatus = 'succeeded';


            let mass =  state.list.filter(item=>item.id != action.payload.id)
            mass.push(action.payload)
            

            state.list = mass;
           
            state.error = null;
          })
          .addCase(changeAssignmentStatus.rejected, (state, action) => {
            state.updateStatus = 'failed';
            state.error = action.error
          })
          //  -------------------------------------------------------
           //-----сохранение документов для поручения--------------
           .addCase(uploadDocForAssignment.pending, (state, action) => {
            state.addedDoc = 'loading'
          })
          .addCase(uploadDocForAssignment.fulfilled, (state, action) => {
            state.addedDoc = 'succeeded';

            state.addedDocuments = action.payload

              state.error = null;
          })
          .addCase(uploadDocForAssignment.rejected, (state, action) => {
            state.addedDoc = 'failed';
            state.error = action.error
          })

           //----------------------------------------------------
           
    }
  })

  export const { resetCreatedAssignStatus,setSelectedTask,changeTaskStatus,addDocuments,resetAddedDocsStatus} = assignmentsSlice.actions
  export default assignmentsSlice.reducer
  export function getAssignmentsList(state) {
  
  
    return state[DomainNames.assignments].list;
  }

    // export const getAssignmentsList = createSelector(state=>state[DomainNames.assignments].list, (list)=>({list}))

  export function getCreatedAssignStatus(state){
    return state[DomainNames.assignments].created
  }
  export function getAssignmentsResults(state){
    return state[DomainNames.assignments].statuses
  }
  export function getSelectedTask(state){
    return state[DomainNames.assignments].selectedTask   
  }
  export function getAssignmentsStatuses(state){
    return state[DomainNames.assignments].assignmentStatuses
  }
  export function getAddedAssignmentStatus(state){
    return state[DomainNames.assignments].added
  }

  export function getDelDocStatus(state){
    return state[DomainNames.assignments].delDoc
  }

  export function getAddedDocsStatus(state){
    return state[DomainNames.assignments].addedDoc
  }

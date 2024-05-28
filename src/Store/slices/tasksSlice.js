import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    myList:[],
    statusMyList:'idle',

    otherList:[],
    statusOtherList:'idle',

    task:{},
    taskStatus:'idle',

    added:'idle',

    error:null,
}

export const fetchMyTasks = createAsyncThunk(DomainNames.tasks.concat('/myTasks')  , async (initialData) => {
    const response = await axios.get(api.tasks.fetchMy.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })
  export const fetchOtherTasks = createAsyncThunk(DomainNames.assignments.concat('/otherTasks')  , async (initialData) => {
    const response = await axios.get(api.tasks.fetchOther.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })

  export const fetchTaskById = createAsyncThunk(DomainNames.assignments.concat('/task')  , async (initialData) => {
    const response = await axios.get(api.tasks.task.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })
  


  const assignmentsSlice = createSlice({
    name: DomainNames.tasks,
    initialState,
    reducers: {
     
    },
    extraReducers(builder) {
        builder
            // -----получение задач пользователя--------------------
          .addCase(fetchMyTasks.pending, (state, action) => {
            state.statusMyList = 'loading'
          })
          .addCase(fetchMyTasks.fulfilled, (state, action) => {
            state.statusMyList = 'succeeded';

            state.myList = action.payload

            state.error = null;
          })
          .addCase(fetchMyTasks.rejected, (state, action) => {
            state.statusMyList = 'failed';
            state.error = action.error
          })
          //-------------------------------------------------------
              // -----получение отальных задач по проекту пользователя--------------------
              .addCase(fetchOtherTasks.pending, (state, action) => {
                state.statusOtherList = 'loading'
              })
              .addCase(fetchOtherTasks.fulfilled, (state, action) => {
                state.statusOtherList = 'succeeded';
    
                state.otherList = action.payload
    
                state.error = null;
              })
              .addCase(fetchOtherTasks.rejected, (state, action) => {
                state.statusOtherList = 'failed';
                state.error = action.error
              })
              //-------------------------------------------------------
              // -----получение данных задачи по ID--------------------
              .addCase(fetchTaskById.pending, (state, action) => {
              state.taskStatus = 'loading'
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
              state.taskStatus = 'succeeded';
  
              state.task = action.payload
  
              state.error = null;
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
              state.taskStatus = 'failed';
              state.error = action.error
            })
            //-------------------------------------------------------
     
    }
  })

  export function getMyTasks(state){

        return state[DomainNames.tasks].myList;

  }
  export function getOtherTasks(state){

    return state[DomainNames.tasks].otherList;

}

export function getTaskStatus(state){
  return state[DomainNames.tasks].taskStatus;
}

export function getTasksError(state){
  return state[DomainNames.tasks].error;
}

  export default assignmentsSlice.reducer



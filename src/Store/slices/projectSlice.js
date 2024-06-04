import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';


const initialState = {
    projects:[{
      id:1,
      name:"Новый проект",
     
      finish:"14.09.2023",
      role:"admin",
      access:'private',
      stages:[{
        id:1,
        name:"Надо сделать"
        },{
          id:2,
          name:"Готово"
          }]
    }],
    statuses:[{
      id:1,
      done:90,
      workers:[{}]

    }],
    // projects:[],
    // statuses:[],
    error:null,
    status:'idle',
    created:"idle",
    added:"idle",
}


export const createProject = createAsyncThunk(DomainNames.projects.concat('/create')  , async (initialUser) => {
    const response = await axios.post(api.project.create,  initialUser.project, getRequestConfig(initialUser.token));
      return response.data
  })



  export const getAllUserProjects = createAsyncThunk(DomainNames.projects.concat('/fetch')  , async (initialUser) => {

    const response = await axios.get(api.project.fetch.concat(addParams(initialUser.data)), getRequestConfig(initialUser.token));
      return response.data
  })

  export const getAllProjectsStatuses = createAsyncThunk(DomainNames.projects.concat('/statuses')  , async (initialUser) => {

    const response = await axios.get(api.project.statuses.concat(addParams(initialUser.data)), getRequestConfig(initialUser.token));
      return response.data
  })

  export const updateProject = createAsyncThunk(DomainNames.projects.concat('/update')  , async (initialUser) => {

    const response = await axios.post(api.project.update.concat(addParams(initialUser.data)), getRequestConfig(initialUser.token));
      return response.data
  })

  const projectsSlice = createSlice({
    name: DomainNames.projects,
    initialState,
    reducers: {
      resetCreatedStatus(state,action){
        state.created = 'idle'
      }
    },
    extraReducers(builder) {
      builder
      //-------------Создание проекта----------------------
      .addCase(createProject.pending, (state, action) => {
        state.created = 'loading'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.created = 'succeeded';

        state.error = null
        
      })
      .addCase(createProject.rejected, (state, action) => {
        state.created = 'failed';
        
        state.error = action.error
      })
      //------------------------------------------------------
      //------Получение всех проектов пользователя-----------
      .addCase(getAllUserProjects.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllUserProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';

       state.projects = action.payload;

        state.error = null
        
      })
      .addCase(getAllUserProjects.rejected, (state, action) => {
        state.status = 'failed';
        
        state.error = action.error
      })
       //-----------------------------------------------------
       //-------Получение статусов проектов-------------------

       .addCase(getAllProjectsStatuses.pending, (state, action) => {
        state.added = 'loading'
      })
      .addCase(getAllProjectsStatuses.fulfilled, (state, action) => {
        state.added = 'succeeded';

        console.log("st "+action.payload)

        state.statuses = action.payload;

        state.error = null
        
      })
      .addCase(getAllProjectsStatuses.rejected, (state, action) => {
        state.added = 'failed';
        
        state.error = action.error
      })
        //-----------------------------------------------------
        //-------Изменение описания проекта-------------------

       .addCase(updateProject.pending, (state, action) => {
        state.added = 'loading'
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.added = 'succeeded';

        console.log(action.payload)

        state.statuses = action.payload;

        state.error = null
        
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.added = 'failed';
        
        state.error = action.error
      })
        //-----------------------------------------------------

    }
  })

  export default projectsSlice.reducer
  export function getCreatedStatus(state) {
    return state[DomainNames.projects].created;
  }
  export function getActiveProjectsCount(state){
    return state[DomainNames.projects].statuses.filter(item=>
      item.isActive===1
    ).length;
  }
  export function getAdminProjectsCount(state){

    let mass = state[DomainNames.projects].projects.filter(item=>item.role==="admin")

    return mass.length
  }
  export function getParticipantProjectsCount(state){
    return state[DomainNames.projects].projects.filter(item=>
      item.role==="participant"
    ).length;
  }

// function isOverdue(project){

  

//   return false;
// }


// export async function processProjectIsOverdue(id,token) {
//     const response = await axios.get(api.project.overdue.concat(addParams({projectId:id})), getRequestConfig(token));
//     return response.data
// }


  export function getOverdueProjectsCount(state){
    return state[DomainNames.projects].statuses.filter(item=>
      item.isOverdue == 1
    ).length;
  }

  export function getProjectsResults(state){


    return state[DomainNames.projects].statuses;
  }

  
  export function getProjectsCount(state){
    return state[DomainNames.projects].projects.length;
  }

  export function getProjects(state){
    return state[DomainNames.projects].projects
  }
  
  export function getActiveProjects(state){
    return []
  }
  export function getOverdueProjects(state){

   return state[DomainNames.projects].projects.filter(item=>
      item.id == state[DomainNames.projects].statuses.find(s=>s.id==item.id && s.isOverdue==1).id
      )

  }

  export function getProjectsLoadedStatus(state){
    return state[DomainNames.projects].status
  }

  export function getAddedStatus(state){
    return state[DomainNames.projects].added
  }

  export function getProjectStages(state,projectId){
    
    return state[DomainNames.projects].projects.find(project => project.id == projectId).stages
  }

  export function getProjectById(state,id){
    return state[DomainNames.projects].projects.find(project => project.id == projectId)
  }

  export const { resetCreatedStatus} = projectsSlice.actions




  
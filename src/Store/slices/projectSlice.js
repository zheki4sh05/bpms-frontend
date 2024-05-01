import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    projects:[],
    error:null,
    status:'idle'
}


export const createProject = createAsyncThunk(DomainNames.projects.concat('/create')  , async (initialUser) => {
    const response = await axios.post(api.project.create,  initialUser, getRequestConfig(initialUser.token));
      return response.data
  })


  export const getAllUserProjects = createAsyncThunk(DomainNames.projects.concat('/fetch')  , async (initialUser) => {

    const response = await axios.get(api.project.fetch.concat(addParams(initialUser.data)), getRequestConfig(initialUser.token));
      return response.data
  })

  const projectsSlice = createSlice({
    name: DomainNames.projects,
    initialState,
    reducers: {
       
    },
    extraReducers(builder) {
      builder
      //-------------Создание проекта----------------------
      .addCase(createProject.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';

        project.name = action.payload.name;   
        project.desc = action.payload.desc;  
        project.start = action.payload.start;  
        project.workers = action.payload.workers;  
        project.role = action.payload.role;  
        project.access = action.payload.access;  

        state.projects.push(project)

        state.error = null
        
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        
        state.error = action.error
      })
      //------------------------------------------------------
      //------Получение всех проектов пользователя-----------
      .addCase(getAllUserProjects.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllUserProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';

        console.log(action.payload)

        state.error = null
        
      })
      .addCase(getAllUserProjects.rejected, (state, action) => {
        state.status = 'failed';
        
        state.error = action.error
      })
       //-----------------------------------------------------

    }
  })

  export default projectsSlice.reducer
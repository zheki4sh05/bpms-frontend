import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';

const initialState = {
    projects:[],
    error:null,
    status:'idle'
}

export const createProject = createAsyncThunk(DomainNames.projects.concat('/projects')  , async (initialUser) => {
    const response = await axios.post(api.project.create,  initialUser, getRequestConfig(initialUser.token));
      return response.data
  })

  const projectsSlice = createSlice({
    name: DomainNames.projects,
    initialState,
    reducers: {
       
    },
    extraReducers(builder) {
       
    }
  })


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    list:[],
    statuses:[],
    created:'idle',
    error:null,
    status:'idle',
    added:'idle'
}

export const createAssignment = createAsyncThunk(DomainNames.assignments.concat('/createAssignment')  , async (initialData) => {
    const response = await axios.get(api.assignments.create,initialData.data ,getRequestConfig(initialData.token));
    
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


  const assignmentsSlice = createSlice({
    name: DomainNames.assignments,
    initialState,
    reducers: {
      resetCreatedAssignStatus(state,action){
        state.created = 'idle'
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
            state.error = null;
          })
          .addCase(getAllUserAssignmentsStatuses.rejected, (state, action) => {
            state.added = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------
    }
  })

  export const { resetCreatedAssignStatus} = assignmentsSlice.actions
  export default assignmentsSlice.reducer
  export function getAssignmentsList(state) {
    console.log(state[DomainNames.assignments])
    return state[DomainNames.assignments].list;
  }

  export function getCreatedAssignStatus(state){
    return state[DomainNames.assignments].created
  }
  export function getAssignmentsResults(state){
    return state[DomainNames.assignments].statuses
  }


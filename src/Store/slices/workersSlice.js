import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';

const initialState = {
    workers:[],
    error:null,
    status:'idle'
}

export const getAllWorkers = createAsyncThunk(DomainNames.workers.concat('/')  , async (initialUser) => {
    const response = await axios.get(api.workers.fetch, initialUser.data, getRequestConfig(initialUser.token));
      return response.data
  })

  const workresSlice = createSlice({
    name: DomainNames.workers,
    initialState,
    reducers: {
       
    },
    extraReducers(builder) {
        builder
            // -----запрос сотрудников компании--------------------
          .addCase(getAllWorkers.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(getAllWorkers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error = null;
            state.workers.splice(0,state.workers.length)
          
          })
          .addCase(getAllWorkers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error
          })
    }
  })


  export function getWorkersList(state) {
    return state[DomainNames.workers].workers;
  }
  export default workresSlice.reducer
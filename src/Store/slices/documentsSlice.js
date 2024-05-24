import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    list:[],
    error:null,
    status:'idle',
    added:'idle'
}

export const getReportsList = createAsyncThunk(DomainNames.assignments.concat('/reportsList')  , async (initialData) => {
    const response = await axios.get(api.documents.reports.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })
  


  const assignmentsSlice = createSlice({
    name: DomainNames.assignments,
    initialState,
    reducers: {
     
    },
    extraReducers(builder) {
        builder
            // -----получение форм-отчетов компании--------------------
          .addCase(getReportsList.pending, (state, action) => {
            state.created = 'loading'
          })
          .addCase(getReportsList.fulfilled, (state, action) => {
            state.created = 'succeeded';

            state.list = action.payload

            state.error = null;
          })
          .addCase(getReportsList.rejected, (state, action) => {
            state.created = 'failed';
            state.error = action.error
          })
          //-------------------------------------------------------
     
    }
  })

  export function getAllReports(state){

        return state[DomainNames.documents].list;

  }

  export default assignmentsSlice.reducer



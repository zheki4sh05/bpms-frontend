import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    documents:[],
    statusDoc:'idle',

    reports:[],
    statusRep:'idle',

    error:null,
    added:'idle'
}

export const getReportsList = createAsyncThunk(DomainNames.assignments.concat('/reportsList')  , async (initialData) => {
    const response = await axios.get(api.documents.reports.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })

  export const getDocList = createAsyncThunk(DomainNames.assignments.concat('/docsList')  , async (initialData) => {
    const response = await axios.get(api.documents.docs, initialData.data,getRequestConfig(initialData.token));
    
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
            state.statusRep = 'loading'
          })
          .addCase(getReportsList.fulfilled, (state, action) => {
            state.statusRep = 'succeeded';

            state.reports = action.payload

            state.error = null;
          })
          .addCase(getReportsList.rejected, (state, action) => {
            state.statusRep = 'failed';
            state.error = action.error
          })
          //-------------------------------------------------------
          // -----получение документов (по умолчанию общедоступные) компании--------------
          .addCase(getDocList.pending, (state, action) => {
            state.statusDoc = 'loading'
          })
          .addCase(getDocList.fulfilled, (state, action) => {
            state.statusDoc = 'succeeded';

            state.documents = action.payload

            state.error = null;
          })
          .addCase(getDocList.rejected, (state, action) => {
            state.statusDoc = 'failed';
            state.error = action.error
          })
          //------------------------------------------------------------------------------
     
    }
  })

  export function getReports(state){

        return state[DomainNames.documents].reports;

  }

  export function getDocuments(state){

    return state[DomainNames.documents].documents;

}

  export default assignmentsSlice.reducer



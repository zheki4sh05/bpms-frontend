import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';
import statusTypes from '../../API/status';
import getRequestFormData from '../../API/requestFormData';

const initialState = {
    documents:[{
      id:1,
      name:"doc",
      format:"docx",
      downloadAt:"14.06.2024",
      access:"Проект",
      size:3
    }],
    statusDoc:'idle',

    reports:[],
    statusRep:'idle',

    error:null,
    added:'idle',

    uploaded:'idle'
}

export const getReportsList = createAsyncThunk(DomainNames.documents.concat('/reportsList')  , async (initialData) => {
    const response = await axios.get(api.documents.reports.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })

  export const getDocList = createAsyncThunk(DomainNames.documents.concat('/docsList')  , async (initialData) => {
    const response = await axios.get(api.documents.docs, initialData.data,getRequestConfig(initialData.token));
    
      return response.data
  })  

  export const uploadDoc =  createAsyncThunk(DomainNames.documents.concat('/upload')  , async (initialData) => {

  
    const response = await axios.post(api.documents.upload, initialData.data,getRequestFormData(initialData.token));
    
      return response.data
  }) 
  


  const documentsSlice = createSlice({
    name: DomainNames.assignments,
    initialState,
    reducers: {
      resetUploadedStatus(state, action){
      state.uploaded = statusTypes.idle
      }
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
          .addCase(uploadDoc.pending, (state, action) => {
            state.statusDoc = 'loading'
          })
          .addCase(uploadDoc.fulfilled, (state, action) => {
            state.statusDoc = 'succeeded';

            state.documents.push(action.payload)

            state.error = null;
          })
          .addCase(uploadDoc.rejected, (state, action) => {
            state.statusDoc = 'failed';
            state.error = action.error
          })
     
    }
  })

  export function getReports(state){

        return state[DomainNames.documents].reports;

  }

  export function getDocuments(state){

    return state[DomainNames.documents].documents;

}

export function getUploadedStatus(state){
  return state[DomainNames.documents].uploaded;
}
export function getStatusDoc(state){
  return state[DomainNames.documents].statusDoc
}

  export default documentsSlice.reducer


  export const { resetUploadedStatus} = documentsSlice.actions
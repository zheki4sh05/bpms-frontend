import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';
import statusTypes from '../../API/status';
import getRequestFormData from '../../API/requestFormData';

// {
//   id:1,
//   name:"документ",
//   format:"docx",
//   downloadAt:"15.04.2023",
//   access:"Общедоступный",
//   size:"10"

// }

const initialState = {
    documents:[],
    statusDoc:'idle',

    reports:[],
    statusRep:'idle',

    error:null,

    added:'idle',

    uploaded:'idle',

    docInfo:{},

    forAssignment:[],
    loaded:'idle'

  }

export const getReportsList = createAsyncThunk(DomainNames.documents.concat('/reportsList')  , async (initialData) => {
    const response = await axios.get(api.documents.fetch.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })

  export const getDocList = createAsyncThunk(DomainNames.documents.concat('/docsList')  , async (initialData) => {
    const response = await axios.get(api.documents.fetch.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })  

  export const uploadDoc =  createAsyncThunk(DomainNames.documents.concat('/upload')  , async (initialData) => {

  
    const response = await axios.post(api.documents.upload, initialData.data,getRequestFormData(initialData.token));
    
      return response.data
  }) 

  export const docInfo = createAsyncThunk(DomainNames.documents.concat('/docInfo')  , async (initialData) => {
    const response = await axios.get(api.documents.info.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
      return response.data
  })  


  
  export const docForAssignment = createAsyncThunk(DomainNames.documents.concat('/docAssign')  , async (initialData) => {
    const response = await axios.get(api.documents.doc_for_assignment.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    
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
          // -----получение документов  компании--------------
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
             // -----получение документов компании--------------
          .addCase(uploadDoc.pending, (state, action) => {
            state.uploaded = 'loading'
          })
          .addCase(uploadDoc.fulfilled, (state, action) => {
            state.uploaded = 'succeeded';

           

            state.error = null;
          })
          .addCase(uploadDoc.rejected, (state, action) => {
            state.uploaded = 'failed';
            state.error = action.error
          })
           //------------------------------------------------------------------------------
           //-----получение подробной информации по документу----------------
           .addCase(docInfo.pending, (state, action) => {
            state.added = 'loading'
          })
          .addCase(docInfo.fulfilled, (state, action) => {
            state.added = 'succeeded';

            state.docInfo = action.payload;

            state.error = null;
          })
          .addCase(docInfo.rejected, (state, action) => {
            state.added = 'failed';
            state.error = action.error
          })
           //----------------------------------------------------------- 
           //------Получение документов для поручения-------------------

           .addCase(docForAssignment.pending, (state, action) => {
            state.loaded = 'loading'
          })
          .addCase(docForAssignment.fulfilled, (state, action) => {
            state.loaded = 'succeeded';

            state.forAssignment = action.payload;

            state.error = null;
          })
          .addCase(docForAssignment.rejected, (state, action) => {
            state.loaded = 'failed';
            state.error = action.error
          })
           //-------------------------------------------------------    
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

export function getDocInfo(){
  return state[DomainNames.documents].docInfo
}

export function getDocForAssignment(state){
  return state[DomainNames.documents].forAssignment
}

export function getDocsCount(state){
  return state[DomainNames.documents].documents.length + state[DomainNames.documents].reports.length
}

  export default documentsSlice.reducer


  export const { resetUploadedStatus} = documentsSlice.actions

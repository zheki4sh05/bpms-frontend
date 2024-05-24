import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';

const initialState = {
    workers:[],
    relevant:[],
    error:null,
    status:'idle'
}

export const getAllWorkers = createAsyncThunk(DomainNames.workers.concat('/getAllWorkers')  , async (initialUser) => {
    const response = await axios.get(api.workers.list.concat(addParams(initialUser.data)), getRequestConfig(initialUser.token));
    
      return response.data
  });

 export const fetchRelevantWorkers = createAsyncThunk(DomainNames.workers.concat('/relevant')  , async (initialData) => {

  const response = await axios.get(api.workers.list.concat(addParams(initialData.data)), getRequestConfig(initialData.token));
  
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
            state.workers=action.payload
                 
          })
          .addCase(getAllWorkers.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error
          })
          //----------------------------------------------------------
          //-------получение наиболее подходящих под поручнеие сотрудников

             
              .addCase(fetchRelevantWorkers.pending, (state, action) => {
              state.status = 'loading'
            })
            .addCase(fetchRelevantWorkers.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.error = null;
              
            
              state.relevant=action.payload
                    
            })
            .addCase(fetchRelevantWorkers.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error
            })

          //--------------------------------------------------------------
    }
  })


  export function getWorkersList(state) {
    return  state[DomainNames.workers].workers
  }
  export function getWorkersStatus(state) {
    return state[DomainNames.workers].status;
  }
  export function getWorkersListLength(state) {
    return state[DomainNames.workers].workers.length;
  }
  export function getFetchWorkersError(state){
    return state[DomainNames.workers].error;
  }
  export function getRelevantWorkers(state){
    return state[DomainNames.workers].relevant;
  }
  export function getAllProjectMembers(state, id){
  
    return  state[DomainNames.workers].workers.filter(worker => worker.projects.includes(id))
  } 

  // const selectWorkers = state => state.workers
  // const projectId = (state, id)  => id

  //  const projectMembers = createSelector([selectWorkers,projectId], (workers,id) => {
  //   return  workers.filter(worker => worker.projects.includes(id))
  // })

  // export function getAllProjectMembers(state, id){
  //  return  projectMembers(state, id)
  // }
  

  export default workresSlice.reducer 
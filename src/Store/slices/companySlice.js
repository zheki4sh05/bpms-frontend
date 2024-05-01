import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';

const initialState = {
    userCompany:{
        name:"",
        desc:"",
        currentRole:"",
    },
    updated:null,
    error:null,
    status:'idle'
}
//получение подробных данных компании
export const fetchCompany = createAsyncThunk(DomainNames.company.concat('/fetchCompany')  , async (initialCompany) => {
    const response = await axios.get(api.company.fetch,  initialCompany.data, getRequestConfig(initialCompany.token));
      return response.data
  })

//создание компании
export const createCompany= createAsyncThunk(DomainNames.company.concat('/createCompany')  , async (initialCompany) => {
    const response = await axios.post(api.company.create,  initialCompany.data, getRequestConfig(initialCompany.token));
      return response.data
  })
// обновление названия и описания компании
export const updateCompany= createAsyncThunk(DomainNames.company.concat('/updateCompany')  , async (initialCompany) => {
    const response = await axios.put(api.company.update,  initialCompany.data, getRequestConfig(initialCompany.token));
      return response.data
  })
//поиск компании, в которой состоит пользователь
export const userCompany= createAsyncThunk(DomainNames.company.concat('/userCompany')  , async (initialCompany) => {
  const response = await axios.get(api.company.userCompany,getRequestConfig(initialCompany.token));
  return response.data
})
//пригласить пользователя в компанию
export const inviteUserToCompany= createAsyncThunk(DomainNames.company.concat('/inviteUserToCompany')  , async (initialCompany) => {
  const response = await axios.get(api.company.invite,initialCompany.data,getRequestConfig(initialCompany.token));

  return response.data
})

const companySlice = createSlice({
    name: DomainNames.company,
    initialState,
    reducers: {
        saveCompany(state, action) {
          
            state.userCompany.name = action.payload.name
            state.userCompany.desc = action.payload.desc
            state.userCompany.currentRole = action.payload.currentRole
        },
        resetUpdated(state,action){
          state.updated=null;
        }
    },
    extraReducers(builder) {
        builder
            // -----запрос данных компании--------------------
          .addCase(fetchCompany.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.userCompany.name = action.payload.name;
            state.userCompany.desc = action.payload.desc;
            state.userCompany.currentRole = action.payload.role
          })
          .addCase(fetchCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error
          })
          //-----------------------------------------------
          // ---------создание компании--------------------
          .addCase(createCompany.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(createCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error = null
            
          })
          .addCase(createCompany.rejected, (state, action) => {
            state.status = 'failed';
            
            state.error = action.error
          })
            //----------------------------------------------------
            // ---------обновление названия и описания компании------
          .addCase(updateCompany.pending, (state, action) => {
            state.updated = 'loading'
          })
          .addCase(updateCompany.fulfilled, (state, action) => {
            state.updated = 'succeeded';

            state.userCompany.name = action.payload.name;
            state.userCompany.desc = action.payload.desc;

            state.error = null
          })
          .addCase(updateCompany.rejected, (state, action) => {
            state.updated = 'failed';
            state.error = action.error
          })
            //----------------------------------------------------
             // ---------если у пользователя уже есть компания------
             .addCase(userCompany.pending, (state, action) => {
              state.status = 'loading';
            })
             .addCase(userCompany.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.error = null;
              state.userCompany.name = action.payload.name;
              state.userCompany.desc = action.payload.desc;
              state.userCompany.currentRole = action.payload.role;
            })
            .addCase(userCompany.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error
            })
             //----------------------------------------------------
        }
  })
  export const { saveCompany,resetUpdated } = companySlice.actions
  export function getCompanyName(state) {
    return state[DomainNames.company].userCompany.name;
  }
  export function getCompanyDataStatus(state) {
    return state[DomainNames.company].status;
  }
  export default companySlice.reducer

  
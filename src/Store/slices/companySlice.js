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
    error:null,
    status:'idle'
}
//получение подробных данных компании
export const fetchCompany = createAsyncThunk(DomainNames.company.concat('/fetchCompany')  , async (initialCompany) => {
    const response = await axios.get(api.company.fetch,  initialCompany, getRequestConfig(initialCompany.token));
      return response.data
  })

//создание компании
export const createCompany= createAsyncThunk(DomainNames.company.concat('/createCompany')  , async (initialCompany) => {
    const response = await axios.post(api.company.create,  initialCompany, getRequestConfig(initialCompany.token));
      return response.data
  })
// обновление названия и описания компании
export const updateCompany= createAsyncThunk(DomainNames.company.concat('/updateCompany')  , async (initialCompany) => {
    const response = await axios.post(api.company.update,  initialCompany, getRequestConfig(initialCompany.token));
      return response.data
  })
//поиск компании, в которой состоит пользователь
export const userCompany= createAsyncThunk(DomainNames.company.concat('/userCompany')  , async (initialCompany) => {
  const response = await axios.get(api.company.userCompany,getRequestConfig(initialCompany.token));
  console.log(response.data)
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
        companyUpdate(state,action){
            const {name, desc, currentRole} = action.payload;
            state.userCompany.name = name
            state.userCompany.desc = desc
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
            state.error = action.error.message
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
            state.status = 'loading'
          })
          .addCase(updateCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.error = null
          })
          .addCase(updateCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
          })
            //----------------------------------------------------
             // ---------если у пользователя уже есть компания------

             .addCase(userCompany.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.error = null;
              state.userCompany.name = action.payload.name;
              state.userCompany.desc = action.payload.desc;
              state.userCompany.currentRole = action.payload.role;
            })
             //----------------------------------------------------
        }
  })
  export const { saveCompany, companyUpdate } = companySlice.actions
  export default companySlice.reducer

  
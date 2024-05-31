import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from './../../Util/paramsConfig';

const initialState = {
    userCompany:{
      name:"",
      desc:"",
      currentRole:"",
    },
    staff:{
      list:[],
      updated:null,
      status:'idle',
    },
    updated:null,
    error:null,
    status:'idle',
    created:'idle',
    searched:{
      user:{
      },
      status:'idle',
      invited:'idle'
    }
}

// const initialState = {
//   userCompany:{
//       name:"Новая компания",
//       desc:"Описание новой компании",
//       currentRole:"admin",
//   },
//   staff:{
//     list:[{
//       id:"1",
//       name:"Олег",
//       surname:"Петрович",
//       lastname:"Иванов",
//       age:24,
//       email:"example@maio.ru",
//       position:"Дизайнер",
//       role:"Отв. за проект",
//       social:{
//         inst:"hsiasa",
//         teleg:"@hyess",
//         site:"www.sdpcm.com"
//       }
//     }],
//     updated:null,
//     status:'idle',
//   },
//   updated:null,
//   error:null,
//   status:'succeeded',
//   searched:{
//     user:{
//       firstname:"petr",
//       lastname:"sergey",
//       surname:"sdmvms",
//       email:"test@mail.ru",
//       phone:"29375723",
//       birthDay:"15.04.2000"
//     },
//     status:'succeeded',
//     invited:'idle'
//   }
// }

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
  const response = await axios.post(api.company.invite,initialCompany.data,getRequestConfig(initialCompany.token));

  return response.data
})

export const findUser= createAsyncThunk(DomainNames.company.concat('/findUser')  , async (initialCompany) => {
  console.log(initialCompany)
  const response = await axios.get(api.company.findUser.concat(addParams(initialCompany.data)),getRequestConfig(initialCompany.token));

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
          state.updated='idle';
        },
        resetSearchStatus(state,action){
          state.searched.status='idle';
        },
        resetInviteStatus(state,action){
          state.searched.invited='idle';
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
            state.created = 'loading'
          })
          .addCase(createCompany.fulfilled, (state, action) => {
            state.created = 'succeeded';
            state.error = null
            
          })
          .addCase(createCompany.rejected, (state, action) => {
            state.created = 'failed';
            
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
             // ---------Поиск пользователя------
             .addCase(findUser.pending, (state, action) => {
              state.searched.status = 'loading';
            })
             .addCase(findUser.fulfilled, (state, action) => {
              console.log(action.payload)
              state.searched.status = 'succeeded';
              state.searched.user = action.payload
              state.error = null;
              
            })
            .addCase(findUser.rejected, (state, action) => {
              state.searched.status = 'failed';
              state.error = action.error
            })
            //----------------------------------------------------
              // ---------Приглашение пользователя------------
              .addCase(inviteUserToCompany.pending, (state, action) => {
                state.searched.invited = 'loading';
              })
               .addCase(inviteUserToCompany.fulfilled, (state, action) => {
                console.log(action.payload)
                state.searched.invited = 'succeeded';
               
                state.error = null;
                
              })
              .addCase(inviteUserToCompany.rejected, (state, action) => {
                state.searched.invited = 'failed';
                state.error = action.error
              })
              //----------------------------------------------------
        }
  })
  export const { saveCompany,resetUpdated,resetSearchStatus,resetInviteStatus } = companySlice.actions
  export function getCompanyName(state) {
    console.log(state[DomainNames.company].userCompany.name)
    return state[DomainNames.company].userCompany.name;
  }
  export function getCompanyDataStatus(state) {
    return state[DomainNames.company].status;
  }
  export function   getRoleInCompany(state) {
    return state[DomainNames.company].userCompany.currentRole;
  }

  
export function getStaff(state){
  return state[DomainNames.company].staff.list;
}
export function getStaffCount(state){
  return state[DomainNames.company].staff.list.length;
}
export function getSearchedStatus(state){
  return state[DomainNames.company].searched.status
}
export function getSearchedUser(state){
  return state[DomainNames.company].searched.user
}
export function getInviteError(state){
  return state[DomainNames.company].error
}
export function getInviteStatus(state){
  return state[DomainNames.company].searched.invited
}
export function getCreatedStatus(state){
  return state[DomainNames.company].created
}
  export default companySlice.reducer

 
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';

// {
//   id:32,
//   name:"Евгений",
//   lastname:"Шостак",
//   surname:null,
//   email:"evgeniy.shostak.04@mail.ru",
//   phone:null,
//   bDay:null,
//   jwtToken:""
// }

const initState={

  user:"",
  status:'idle',
  loadedMore:'idle',
  updated:'false',
  appLoaded:'idle',
  error:null
}

const initialState = {
    user: {
        
    },
    stages:[
      {
        id:1,
        name:"Надо сделать",
        order:1
      },
      {
        id:2,
        name:"В процессе",
        order:2
      },
      {
        id:3,
        name:"Готово",
        order:3
      }
    ],
    status:'idle',
    loadedMore:'idle',
    updated:'false',
    appLoaded:'idle',
    error:null
}

//Авторизация
export const fetchUser = createAsyncThunk(DomainNames.app.appUser.concat('/fetchUser')  , async (initialUser) => {
  const response = await axios.post(api.user.authenticate,  initialUser);
    return response.data
})

//Регистрация
export const addNewUser = createAsyncThunk(
    DomainNames.app.appUser.concat('/addNewUser'),
    async (initialUser) => {
   
      const response = await axios.post(api.user.register,  initialUser);
      return response.data
    }
  )

//Получение даннных пользователя
export const fetchUserData = createAsyncThunk(DomainNames.app.appUser.concat('/fetchUserData')  , async (initialUser) => {
  const response = await axios.get(api.user.data,  getRequestConfig(initialUser.token));
    return response.data
})

//Изменение данных пользователя
export const updateUserData = createAsyncThunk(DomainNames.app.appUser.concat('/updateUserData')  , async (initialUser) => {
  const response = await axios.post(api.user.update, initialUser.user ,getRequestConfig(initialUser.token));
    return response.data
})




const appUserSlice = createSlice({
    name: DomainNames.app.appUser,
    initialState,
    reducers: {
        userCreate(state, action) {
            const {name, lastname, email} = action.payload;
            state.user.name = name;
            state.user.lastname = lastname;
            state.user.email = email;
            state.status = 'succeeded';
            state.error = null
           
        },
        userUpdate(state,action){
            const { name, lastname, surname,email,phone,bDay } = action.payload
            const existingUser = state.user;
            existingUser.name = name
            existingUser.lastname = lastname
            existingUser.surname = surname
            existingUser.email = email
            existingUser.phone = phone
            existingUser.bDay = bDay
        },
        resetUserUpdatedStatus(state,action){
          state.updated = null;
        },
        updateLoadingAppData(state,action){
          if(state.appLoaded!==action.payload){
              state.appLoaded = action.payload
          }
        
        }
        
    },
    extraReducers(builder) {
      builder
      //---Регистрация пользователя-------------
        .addCase(addNewUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(addNewUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user.jwtToken = action.payload.token;
        })
        .addCase(addNewUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message
        })
        //----------------------------------------
        //---Авторизация пользователя-------------
        .addCase(fetchUser.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user.jwtToken = action.payload.token;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message
        })
         //----------------------------------------
          //---Получение даннных пользователя-------------
        .addCase(fetchUserData.pending, (state, action) => {
          state.loadedMore = 'loading'
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loadedMore = 'succeeded';
          state.user.id= action.payload.id 
          state.user.name = action.payload.firstname;
          state.user.lastname = action.payload.lastname;
          state.user.surname = action.payload.surname;
          state.user.bDay = action.payload.birth_day;
          state.user.email = action.payload.email;
          state.user.phone = action.payload.phone;
        
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loadedMore = 'failed';
          state.error = action.error.message
        })
         //---------------------------------------------
         //------Изменение данных пользователя----------
         .addCase(updateUserData.pending, (state, action) => {
          state.updated = 'loading'
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
          state.updated = 'succeeded';

          state.user.name = action.payload.firstname;
          state.user.lastname = action.payload.lastname;
          state.user.surname = action.payload.surname;
          state.user.bDay = action.payload.birth_day;
          state.user.email = action.payload.email;
          state.user.phone = action.payload.phone;

          

          state.error=null;
    
         })
        .addCase(updateUserData.rejected, (state, action) => {
          state.updated = 'failed';
          state.error = action.error
        })
           //---------------------------------------------
      }
  })


  export const { userCreate,  userUpdate,resetUserUpdatedStatus,updateLoadingAppData} = appUserSlice.actions
  export function getToken(state) {
  return state[DomainNames.app.appUser].user.jwtToken;
}

export const getTokenRef = createSelector(state=>state[DomainNames.app.appUser].user, (user)=>({user}))
export function getAuthStatus(state){
  return state[DomainNames.app.appUser].status
}
export function getUserDataStatus(state){
  return state[DomainNames.app.appUser].loadedMore;
}
export function getEmail(state){
  return state[DomainNames.app.appUser].user.email;
}
export function getId(state){
  return state[DomainNames.app.appUser].user.id;
}
export function getAppStatus(state){
  return state[DomainNames.app.appUser].appLoaded
}

export function getStages(state){
  return state[DomainNames.app.appUser].stages
}
  export default appUserSlice.reducer


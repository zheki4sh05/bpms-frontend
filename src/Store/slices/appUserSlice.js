import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
const initialState = {
    user: {
        name:"",
        lastname:"",
        surname:"",
        email:"",
        phone:"",
        bDay:"",
        jwtToken:"",
    },
    status:'idle',
    error:null
}

//Авторизация
export const fetchUser = createAsyncThunk(DomainNames.app.appUser.concat('/fetchUser')  , async (initialUser) => {
  const response = await axios.post(api.authenticate,  initialUser);
    return response.data
})

//Регистрация
export const addNewUser = createAsyncThunk(
    DomainNames.app.appUser.concat('/addNewUser'),
    async (initialUser) => {
   
      const response = await axios.post(api.register,  initialUser);
      return response.data
    }
  )

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
        
    },
    extraReducers(builder) {
      builder
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
      }
  })


  export const { userCreate,  userUpdate} = appUserSlice.actions
  export default appUserSlice.reducer


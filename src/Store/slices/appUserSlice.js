import { createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'

const initialState = [{
    name:"Евгений",
    lastname:"Шостак",
    surname:"Артурович",
    email:"evg@mail.ru",
    phone:"+37529327",
    bDay:"12.04.2004",
    jwtToken:"",

}]

const appUserSlice = createSlice({
    name: DomainNames.app.appUser,
    initialState,
    reducers: {
        userCreate(state, action) {

            state.pop();
            state.push(action.payload)
           
        },
        userUpdate(state,action){
            const { name, lastname, surname,email,phone,bDay } = action.payload
            const existingUser = state.find(user => user.name === name)
            existingUser.name = name
            existingUser.lastname = lastname
            existingUser.surname = surname
            existingUser.email = email
            existingUser.phone = phone
            existingUser.bDay = bDay
        }
    }
  })


  export const { userCreate,  } = appUserSlice.actions
  export default appUserSlice.reducer
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
        userUpdate(state, action) {
            state.pop();
            state.push(action.payload)
            console.log(state)
        }
    }
  })


  export const { userUpdate } = appUserSlice.actions
  export default appUserSlice.reducer
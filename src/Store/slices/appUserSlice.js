import { createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'

const initialState = [{
    name:"",
    lastname:"",
    email:"",
    jwtToken:""
}]

const appUserSlice = createSlice({
    name: DomainNames.app.appUser,
    initialState,
    reducers: {
        userLogIn(state, action) {
            state.pop();
            state.push(action.payload)
        }
    }
  })

  export const { userLogIn } = appUserSlice.actions
  export default appUserSlice.reducer
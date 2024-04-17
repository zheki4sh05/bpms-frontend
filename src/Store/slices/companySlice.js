import { createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'

const initialState = [{
    name:"",
    desc:"",
    currentRole:""
}]

const companySlice = createSlice({
    name: DomainNames.app.company,
    initialState,
    reducers: {
        companyCreate(state, action) {
            
            state.pop();
            state.push(action.payload)
            console.log(state)
        }
    }
  })


  export const { companyCreate } = companySlice.actions
  export default companySlice.reducer
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
            createCompanyRequest(payload)
        },
        companyUpdate(state,action){
            const {name, desc, currentRole} = action.payload;
            const company = state.find(item=>item.name===name)
            company.name = name;
            company.desc = desc
        }
    }
  })

async function createCompanyRequest(payload){

}

  export const { companyCreate, companyUpdate } = companySlice.actions
  export default companySlice.reducer
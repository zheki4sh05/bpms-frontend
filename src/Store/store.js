import {configureStore} from "@reduxjs/toolkit"
import appUserReducer from '../Store/slices/appUserSlice'
import companyReducer from '../Store/slices/companySlice'
import workersSlice from "./slices/workersSlice"
import projectSlice from "./slices/projectSlice"
export default configureStore({
    reducer:{
        appUser:appUserReducer,
        company:companyReducer,
        workers:workersSlice,
        projects:projectSlice
    },
   
})
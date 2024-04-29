import {configureStore} from "@reduxjs/toolkit"
import appUserReducer from '../Store/slices/appUserSlice'
import companyReducer from '../Store/slices/companySlice'
import workersSlice from "./slices/workersSlice"
export default configureStore({
    reducer:{
        appUser:appUserReducer,
        company:companyReducer,
        workers:workersSlice
    },
   
})
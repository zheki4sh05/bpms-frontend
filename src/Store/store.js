import {configureStore} from "@reduxjs/toolkit"
import appUserReducer from '../Store/slices/appUserSlice'
import companyReducer from '../Store/slices/companySlice'
export default configureStore({
    reducer:{
        appUser:appUserReducer,
        company:companyReducer,
    },
   
})
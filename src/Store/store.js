import {configureStore} from "@reduxjs/toolkit"
import appUserReducer from '../Store/slices/appUserSlice'

export default configureStore({
    reducer:{
        appUser:appUserReducer
    },
   
})
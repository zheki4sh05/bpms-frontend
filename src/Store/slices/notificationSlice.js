import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DomainNames from '../DomainNames'
import api from '../../API/APIPath'
import axios from 'axios';
import getRequestConfig from '../../API/requestConfig';
import addParams from '../../Util/paramsConfig';
const initialState = {
    notifications:[],
    status:'idle',
    accepted:'idle',
    error:null
}

//получение уведомлений
export const fetchNotification = createAsyncThunk(DomainNames.company.concat('/fetchNotif')  , async (initialData) => {
    const response = await axios.get(api.user.notif.concat(addParams(initialData.data)), getRequestConfig(initialData.token));
      return response.data
  })

 //принять приглашение  
 export const acceptInvitation = createAsyncThunk(DomainNames.company.concat('/accept_invitation')  , async (initialData) => {
  const response = await axios.post(api.company.acceptInivation.concat(addParams(initialData.data)),getRequestConfig(initialData.token));
    return response.data
})
//удаление уведолмения
export const rejInvitation = createAsyncThunk(DomainNames.company.concat('/rejInvitation')  , async (initialData) => {
  const response = await axios.delete(api.company.rejectInivation,  initialData.data, getRequestConfig(initialData.token));
    return response.data
})



const notificationSlice = createSlice({
    name: DomainNames.notif,
    initialState,
    reducers: {
        
        
    },
    extraReducers(builder) {
      builder
      //------запрос всех уведомлений-----------
        .addCase(fetchNotification.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchNotification.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.notifications = action.payload
        })
        .addCase(fetchNotification.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message
        })
        //------------------------------------------
        //------Принятие приглашения-----------
        .addCase(acceptInvitation.pending, (state, action) => {
          state.accepted = 'loading'
        })
        .addCase(acceptInvitation.fulfilled, (state, action) => {
          state.status = 'succeeded';
          // state.notifications.splice(action.payload)
        })
        .addCase(acceptInvitation.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error
        })
        //------------------------------------------
        //------Отклонение приглашения-----------
        .addCase(rejInvitation.pending, (state, action) => {
          state.accepted = 'loading'
        })
        .addCase(rejInvitation.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.notifications =  state.notifications.filter(item.id!==action.payload.id)
        })
        .addCase(rejInvitation.rejected, (state, action) => {
          state.status = 'failed';
          state.accepted = action.error.message
        })
        //------------------------------------------
       
      }
  })

export function getNotifCount(state){
    return state[DomainNames.notif].notifications.length;
}
export function getNotificationStatus(state){
    return state[DomainNames.notif].status;
}
export function getNotificationAcceptedStatus(state){
  return state[DomainNames.notif].accepted;
}
export function getNotifications(state){
    return state[DomainNames.notif].notifications;
}

export default notificationSlice.reducer


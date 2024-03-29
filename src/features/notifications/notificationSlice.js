import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { client } from "../../api/client";

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications',async (_, {getState}) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimeStamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(`/fakeApi/notifications?since=${latestTimeStamp}`)
    return response.data
})

const notificationSlice = createSlice({
    name:'notifications',
    initialState:[],
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchNotifications.fulfilled,(state,action) => {
            state.push(...action.payload)
            state.sort((a,b) => b.date.localeCompare(a.date))
        })
    }
})

export default notificationSlice.reducer
export const selectAllNotifications = state => state.notifications
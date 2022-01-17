import { createSlice } from "@reduxjs/toolkit";
import { checkAuthentication, loginUser, loginUserWithGoogle, updateProfile } from "./user-slice";

export interface Notification {
    id: string,
    userId: string,
    payload: string,
    hasSeen: boolean,
    path: string
};

interface NotificationState {
    notifications: Notification[],
    unseenNotifications: Notification[]
};

const initialState: NotificationState = {
    notifications: [],
    unseenNotifications: []
};

const notificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {
        pushNotification(state, action) {
            state.notifications.push(action.payload)
            state.unseenNotifications.push(action.payload)
        },
        markSeen(state, action) {
            state.notifications = state.notifications.map((noti) => {
                if (action.payload !== noti.id)
                    return noti;

                return { ...noti, hasSeen: true }
            })
            state.unseenNotifications = state.notifications.filter((noti) => !noti.hasSeen)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuthentication.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
            state.unseenNotifications = state.notifications.filter((noti) => !noti.hasSeen)
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
            state.unseenNotifications = state.notifications.filter((noti) => !noti.hasSeen)
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
            state.unseenNotifications = state.notifications.filter((noti) => !noti.hasSeen)
        });
        builder.addCase(loginUserWithGoogle.fulfilled, (state, action) => {
            state.notifications = action.payload.notifications
            state.unseenNotifications = state.notifications.filter((noti) => !noti.hasSeen)
        });
    }
})

export const { pushNotification, markSeen } = notificationSlice.actions;

export default notificationSlice.reducer;
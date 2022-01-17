import { combineReducers } from '@reduxjs/toolkit'
import routeReducer from './route-slice'
import classroomReducer from './classroom-slice'
import createClassModalReducer from './create-class-modal-sclice'
import joinClassModalReducer from './join-class-modal-slice'
import userReducer from './user-slice'
import alertReducer from './alert-slice'
import notificationSlice from './notification-slice'
import socketSlice from './socket-slice'

const rootReducer = combineReducers({
    routeReducer,
    classroomReducer,
    createClassModalReducer,
    alertReducer,
    userReducer,
    joinClassModalReducer,
    notificationSlice,
    socketSlice
})

export default rootReducer;
import { combineReducers } from '@reduxjs/toolkit'
import routeReducer from './route-slice'
import classroomReducer from './classroom-slice'
import createClassModalReducer from './create-class-modal-sclice'
import alertReducer from './alert-slice'

const rootReducer = combineReducers({
    routeReducer,
    classroomReducer,
    createClassModalReducer,
    alertReducer
})

export default rootReducer;
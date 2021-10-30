import { combineReducers } from '@reduxjs/toolkit'
import routeReducer from './route-slice'
import classroomReducer from './classroom-slice'

const rootReducer = combineReducers({
    routeReducer,
    classroomReducer
})

export default rootReducer;
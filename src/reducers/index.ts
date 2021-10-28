import { combineReducers } from '@reduxjs/toolkit'
import routeReducer from './route-slice'

const rootReducer = combineReducers({
    routeReducer
})

export default rootReducer;
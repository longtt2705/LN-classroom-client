import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as classroomApi from '../services/classroom';
import { ERROR_MESSAGE, NO_MESSAGE } from "../shared/messages";
import { createAlert } from "./alert-slice";

export interface Classroom {
    _id?: string,
    name: string,
    ownerId: string,
    schoolYear: string,
    teachersId?: string[],
    studentsId?: string[],
    description?: string,
    createdAt?: Date
};

interface ClassroomState {
    classrooms: Classroom[],
    searchResult: Classroom[],
    isLoading: boolean
}

const initialState: ClassroomState = {
    classrooms: [],
    searchResult: [],
    isLoading: false
};

export const getAllClassroom = createAsyncThunk(
    'classrooms/getAllClassroom',
    async (_, thunkApi) => {
        try {
            const response = await classroomApi.getAllClassroom()
            return response.data
        } catch (err) {
            console.error(err)
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const createClassroom = createAsyncThunk(
    'classrooms/createClassroom',
    async (info: Classroom | any, thunkApi) => {
        try {
            const response = await classroomApi.createClassroom({
                name: info.name,
                schoolYear: info.schoolYear,
                ownerId: info.ownerId,
                description: info.description,
            })
            thunkApi.dispatch(createAlert({
                message: `Created class ${info.name} successfully!`,
                severity: 'success'
            }))
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const statusCode = err.response?.status || NO_MESSAGE
                const statusText = err.response?.statusText || NO_MESSAGE
                const message = `Error: ${statusCode} ${statusText}` || ERROR_MESSAGE
                thunkApi.dispatch(createAlert({
                    message,
                    severity: 'error'
                }))
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)

const classroomSlice = createSlice({
    name: 'Classroom',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllClassroom.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getAllClassroom.fulfilled, (state, action) => {
            state.classrooms = action.payload
            state.isLoading = false
        });
        builder.addCase(getAllClassroom.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(createClassroom.fulfilled, (state, action) => {
            state.classrooms.push(action.payload)
        });
    }
})

export default classroomSlice.reducer;
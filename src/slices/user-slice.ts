import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as userApi from '../services/user';
import { ERROR_MESSAGE } from "../shared/messages";
import { createAlert } from "./alert-slice";

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password?: string,
    isActive?: boolean
};

const initialState: User | null = null


export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (info: User, thunkApi) => {
        try {
            const response = await userApi.registerUser({
                firstName: info.firstName,
                lastName: info.lastName,
                email: info.email,
                password: info.password,
                isActive: false,
                username: info.username
            })
            thunkApi.dispatch(createAlert({
                message: `Registered ${info.username} successfully!`,
                severity: 'success'
            }))
            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = `Error: ${err.message}` || ERROR_MESSAGE
                thunkApi.dispatch(createAlert({
                    message,
                    severity: 'error'
                }))
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: 'Classroom',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state = action.payload
        });
    }
})

export default userSlice.reducer;
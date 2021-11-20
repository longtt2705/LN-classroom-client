import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as userApi from '../services/user';
import * as authApi from '../services/auth';
import { ERROR_MESSAGE, LOGIN_FAILED } from "../shared/messages";
import { createAlert } from "./alert-slice";

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password?: string,
    isActive?: boolean,
    provider?: string,
    studentId?: string,
};

interface InitialState {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
}


export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (info: User | any, thunkApi) => {
        try {
            const response = await authApi.registerUser({
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

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (info: { username: string, password: string, rememberMe?: string } | any, thunkApi) => {
        try {
            const { username, password, rememberMe } = info
            const response = await authApi.loginUser({
                username, password, rememberMe
            })

            return response.data
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = LOGIN_FAILED || ERROR_MESSAGE
                thunkApi.dispatch(createAlert({
                    message,
                    severity: 'error'
                }))
            }
            return thunkApi.rejectWithValue(err)
        }
    }
)



export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async (params: userApi.UpdateProfileParams | any, thunkApi) => {
        try {
            const response = await userApi.updateProfile(params)
            thunkApi.dispatch(createAlert({
                message: "Update profile successfully!",
                severity: 'success'
            }))
            return response.data
        } catch (err) {
            thunkApi.dispatch(createAlert({
                message: "Error when update profile!",
                severity: 'error'
            }))
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const changePassword = createAsyncThunk(
    'users/changePassword',
    async (payload: { oldPassword: string, newPassword: string } | any, thunkApi) => {
        try {
            const response = await userApi.changePassword(payload)
            thunkApi.dispatch(createAlert({
                message: "Change password successfully!",
                severity: 'success'
            }))
            return response.data
        } catch (err) {
            thunkApi.dispatch(createAlert({
                message: "Error when changing password!",
                severity: 'error'
            }))
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const checkAuthentication = createAsyncThunk(
    'users/checkAuthentication',
    async (_, thunkApi) => {
        try {
            const response = await authApi.checkAuthentication()
            return response.data
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        });
        builder.addCase(checkAuthentication.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(checkAuthentication.fulfilled, (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false

        });
        builder.addCase(checkAuthentication.rejected, (state) => {
            state.isLoading = false
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.user = action.payload
        });
    }
})

export default userSlice.reducer;
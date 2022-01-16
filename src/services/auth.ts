import { User } from '../slices/user-slice'
import api from './api'

const BASE_URL = 'auth/'

export const loginUser = (payload: { username: string, password: string, rememberMe?: string }) => {
    return api.post(BASE_URL + "login", payload)
}

export const loginUserWithGoogle = (googleData: any) => {
    return api.post(BASE_URL + "google", {
        token: googleData.tokenId
    })
}

export const checkAuthentication = () => {
    return api.get(BASE_URL)
}

export const registerUser = (user: User) => {
    return api.post(BASE_URL + "register", user)
}

export const logout = () => {
    return api.post(BASE_URL + "logout")
}

export const sendVerificationEmail = (email: string) => {
    return api.post(BASE_URL + "verification", { email })
}

export const forgotPassword = (email: string) => {
    return api.post(BASE_URL + "forgot-password", { email })
}

export const activateAccount = (token: string) => {
    return api.post(BASE_URL + `activate?token=${token}`)
}

export const resetPassword = (token: string, newPassword: string) => {
    return api.post(BASE_URL + `reset-password?token=${token}`, { newPassword })
}
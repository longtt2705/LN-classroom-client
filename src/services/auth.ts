import api from './api'

const BASE_URL = 'auth/'

export const loginUser = (payload: { username: string, password: string, rememberMe?: string }) => {
    return api.post(BASE_URL + "login", payload)
}

export const loginUserWithGoogle = () => {
    return api.get(BASE_URL + "google")
}

export const checkAuthentication = () => {
    return api.get(BASE_URL)
}
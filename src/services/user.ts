import { User } from '../slices/user-slice'
import api from './api'

const BASE_URL = 'users/'
export interface UpdateProfileParams {
    firstName: string,
    lastName: string,
    studentId: string
}

export const updateProfile = (payload: UpdateProfileParams) => {
    return api.post(BASE_URL + "update", payload)
}

export const changePassword = (payload: { oldPassword: string, newPassword: string }) => {
    return api.post(BASE_URL + "change-password", payload)
}

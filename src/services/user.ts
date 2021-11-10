import { User } from '../slices/user-slice'
import * as api from './api'

const BASE_URL = 'users/'

export const registerUser = (user: User) => {
    return api.post(BASE_URL, user)
}

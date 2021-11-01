import axios from 'axios'

const header = {
    Authorization: 'Bearer'
}

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/api/`

export const get = (url: string) => axios.get(BASE_URL + url)
export const post = (url: string, params: any) => axios.post(BASE_URL + url, params)
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

// api create
const allApi = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
})

// api user
const register = (data, config) => allApi.post('/register', data, config)
const login = (data) => allApi.post(`/login?${data}`)
const logout = () => allApi.post(`/logout`)

export const api = {
  register,
  login,
  logout,
}

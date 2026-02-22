import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let lastToastTime = 0
const TOAST_DEBOUNCE_MS = 3000

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    if (error.response?.status !== 401) {
      const now = Date.now()
      if (now - lastToastTime > TOAST_DEBOUNCE_MS) {
        lastToastTime = now
        const message = error.response?.data?.message || error.response?.data?.error || error.message
        toast.error(message || 'Something went wrong')
      }
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

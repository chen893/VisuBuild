import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance

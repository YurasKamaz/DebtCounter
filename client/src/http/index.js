import axios from "axios";
import authService from "../services/authService";

export const API_URL = "http://localhost:5000/api"

const errorCatch = (error) => {
    const message = error?.response?.data?.message
    return message
        ? typeof error.response.data.message == 'object'
            ? message[0]
            : message
        : error.mesage
}

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async error => {
        const originalRequest = error.config
        if (
            (error.response.status == 401) &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await authService.refreshTokens()
                return $api.request(originalRequest)
            } catch (error) {
                if(errorCatch(error) == 'Пользователь не авторизован') {
                    localStorage.removeItem('token')
                }
            }
        }
        throw error
    }
);

export default $api
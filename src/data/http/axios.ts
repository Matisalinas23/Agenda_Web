import axios from "axios";

const BASE_URL = import.meta.env.VITE_LOCAL_API_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const res = await api.post("/auth/refresh")
                const newToken = res.data

                localStorage.setItem("token", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            } catch (error) {
                localStorage.removeItem("token")
                alert("La sesión ha expirado. Por favor, inicie sesión nuevamente.")
                window.location.href = "/login"
                return Promise.reject(error)
            }
        }

        return Promise.reject(error);
    }
)

export default api
import axios from "axios";

const BASE_URL = import.meta.env.VITE_LOCAL_API_URL

const api = axios.create({
    baseURL: BASE_URL,
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

let isLoggingOut = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !isLoggingOut) {
            isLoggingOut = true;
            localStorage.removeItem("token");
            alert("La sesión ha expirado. Por favor, inicie sesión nuevamente.");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
)

export default api
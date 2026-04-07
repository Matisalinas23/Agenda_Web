import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

const BASE_URL = import.meta.env.VITE_LOCAL_API_URL

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 60000,
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

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                api.post("/auth/refresh", {}, { _retry: true } as any)
                    .then(({ data }) => {
                        const newToken = data;
                        localStorage.setItem("token", newToken);
                        
                        // Sincronizar el store de Zustand
                        useAuthStore.getState().login(newToken);

                        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        processQueue(null, newToken);
                        resolve(api(originalRequest));
                    })
                    .catch((err) => {
                        console.error("Error en el refresco de token:", err);
                        if (err.response) {
                            console.error("Datos del error de refresco:", err.response.data);
                            console.error("Status del error de refresco:", err.response.status);
                        }
                        processQueue(err, null);
                        localStorage.removeItem("token");
                        alert("La sesión ha expirado. Por favor, inicie sesión nuevamente.");
                        window.location.href = "/login";
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default api
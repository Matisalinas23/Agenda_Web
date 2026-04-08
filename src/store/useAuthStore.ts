import { create } from "zustand"
import type { IPayloadAuth } from "../interfaces/auth.interface"

interface IUseAuthStore {
    isToken: boolean,
    token: string,
    payload: IPayloadAuth | null,
    login: (token: string) => void,
    logout: () => void,
    setPayload: (payload: IPayloadAuth) => void,
}

const useAuthStore = create<IUseAuthStore>((set) => {
    // Capturar token del hash de forma síncrona
    let initialToken = localStorage.getItem("token") || "";
    const hash = window.location.hash;

    if (hash && hash.includes("token=")) {
        // El hash puede venir como #token=... o #/token=... dependiendo del router
        const tokenMatch = hash.match(/token=([^&]+)/);
        const tokenFromHash = tokenMatch ? tokenMatch[1] : null;

        if (tokenFromHash) {
            localStorage.setItem("token", tokenFromHash);
            initialToken = tokenFromHash;
            // Limpiar la URL después de capturar
            window.history.replaceState(null, "", window.location.pathname);
        }
    }

    return {
        token: initialToken,
        isToken: !!initialToken,
        payload: null,
        login: (newToken: string) => {
            set({ token: newToken, isToken: true })
        },
        logout: () => {
            set({ token: null, isToken: false })
        },
        setPayload: (payload: IPayloadAuth) => {
            set({ payload })
        }
    }
})

export default useAuthStore
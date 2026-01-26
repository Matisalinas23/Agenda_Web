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
    const token = localStorage.getItem("token")

    return {
        token,
        isToken: !!token,
        payload: null,
        login: () => {
            set({ token, isToken: true })
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
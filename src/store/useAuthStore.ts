import { create } from "zustand"

interface IUseAuthStore {
    isToken: boolean,
    token: string,
    login: (token: string) => void,
    logout: () => void, 
}

const useAuthStore = create<IUseAuthStore>((set) => {
    const token = localStorage.getItem("token")

    return {
        token,
        isToken: !!token,
        login: () => {
            set({ token, isToken: true })
        },
        logout: () => {
            set({ token: null, isToken: false })
        },
    }
})

export default useAuthStore
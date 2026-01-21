import type { ILoginUser, IRegisterUser, IUser } from "../../interfaces/user.interface" 
import api from "./axios"

const authUrl = import.meta.env.VITE_LOCAL_API_URL + "/auth"

export const registerHttp = async (registerValues: IRegisterUser): Promise<IUser> => {
    try {
        const res = await api.post(`${authUrl}/register`, registerValues)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

export const loginHttp = async (loginValues: ILoginUser): Promise<{ token: string, user: IUser }> => {
    try {
        const res = await api.post(`${authUrl}/login`, loginValues)
        const { token, user } = res.data
        return { token, user }
    } catch (error) {
        console.error(error.message)
    }
}

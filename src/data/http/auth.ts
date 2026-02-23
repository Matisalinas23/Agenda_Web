import axios from "axios"
import type { IPayloadAuth } from "../../interfaces/auth.interface"
import type { ILoginUser, IRegisterUser, IUser } from "../../interfaces/user.interface" 
import api from "./axios"

const authUrl = import.meta.env.VITE_LOCAL_API_URL + "/auth"

export interface IRegister {
    user: IUser
    verificationToken: string
}
export const registerHttp = async (registerValues: IRegisterUser): Promise<IRegister> => {
    try {
        const res = await api.post(`${authUrl}/register`, registerValues)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const loginHttp = async (loginValues: ILoginUser): Promise<string> => {
    try {
        const res = await axios.post(`${authUrl}/login`, loginValues)
        return res.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const authMeHttp = async (): Promise<IPayloadAuth> => {
    try {
        const res = await api.get(`${authUrl}/me`)
        return res.data
    } catch (error) {
        console.error(error)
    }
}

import type { ILoginUser, IUser } from "../../interfaces/user.interface" 
import api from "./axios"

export const loginHttp = async (loginValues: ILoginUser): Promise<{ token: string, user: IUser }> => {
    try {
        const res = await api.post("http://localhost:3000/auth/login", loginValues)
        const { token, user } = res.data
        return { token, user }
    } catch (error) {
        console.error(error.message)
    }
}

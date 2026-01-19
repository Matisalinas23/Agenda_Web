import type { ILoginUser } from "../../interfaces/user.interface" 
import api from "./axios"

export const loginHttp = async (loginValues: ILoginUser): Promise<boolean> => {
    try {
        const token = await api.post("http://localhost:3000/auth/login", loginValues)
        .then(res => res.data.token)

        localStorage.setItem("token", token)

        return true
    } catch (error) {
        console.error(error.message)
        return false
    }
}

import { loginHttp } from "../data/http/auth"
import type { ILoginUser } from "../interfaces/user.interface"
import useAuthStore from "../store/useAuthStore"

export const useAuth = () => {
    const { login, logout } = useAuthStore(state => state)

    const loginUser = async (loginValues: ILoginUser): Promise<boolean> => {
        const { token } = await loginHttp(loginValues)
    
        if (!token) return false
    
        localStorage.setItem("token", token)
        login(token)
        return true
    }
    
    const logoutUser = () => {
        localStorage.removeItem("token")
        logout()
    }

    return {
        loginUser,
        logoutUser,
    }
}
import { authMeHttp, loginHttp, registerHttp } from "../data/http/auth"
import type { ILoginUser, IRegisterUser } from "../interfaces/user.interface"
import useAuthStore from "../store/useAuthStore"

export const useAuth = () => {
    const { login, logout, setPayload } = useAuthStore(state => state)

    const registerUser = async (registerValues: IRegisterUser): Promise<boolean> => {
        const user = await registerHttp(registerValues)

        if (!user) return false

        return true
    }

    const loginUser = async (loginValues: ILoginUser): Promise<boolean> => {
        const token = await loginHttp(loginValues)
    
        if (!token) return false
    
        localStorage.setItem("token", token)
        login(token)
        
        return true
    }
    
    const logoutUser = () => {
        localStorage.removeItem("token")
        logout()
    }

    const authMe = async (): Promise<void> => {
        const payload = await authMeHttp()

        if (!payload) return

        setPayload(payload)
    }

    return {
        registerUser,
        loginUser,
        logoutUser,
        authMe,
    }
}
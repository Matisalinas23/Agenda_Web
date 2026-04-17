import { jwtDecode } from "jwt-decode"
import { authMeHttp, getGoogleAuthUrlHttp, loginHttp, registerHttp } from "../data/http/auth"
import type { ILoginUser, IRegisterUser, IUser } from "../interfaces/user.interface"
import useAuthStore from "../store/useAuthStore"
import type { IPayloadAuth } from "../interfaces/auth.interface"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const { login, logout, setPayload } = useAuthStore(state => state)
    const navigate = useNavigate()

    const registerUser = async (registerValues: IRegisterUser): Promise<IUser> => {
        if (registerValues.password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres")
            return
        }

        const data = await registerHttp(registerValues)
        return data
    }

    const loginUser = async (loginValues: ILoginUser) => {
        try {
            const token = await loginHttp(loginValues)
            localStorage.setItem("token", token)
            login(token)
            alert("Inicio de sesión exitoso")
            navigate("/")
        } catch (error: any) {
            const { status } = error.response
            if (status === 403) {
                alert("El usuario no ha sido verificado aun, por favor revisa tu correo para verificar tu cuenta.")
                navigate("/register/verification")
                return
            }

            if (status === 401) {
                alert("Credenciales invalidas, por favor intenta de nuevo.")
                return
            }
        }
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

    const getDecodedId = (): number | undefined => {
        const token = localStorage.getItem("token")
        if (!token) return

        const decoded = jwtDecode<IPayloadAuth>(token)
        return decoded.userId
    }

    const loginWithGoogle = async () => {
        try {
            const { url } = await getGoogleAuthUrlHttp()
            window.location.href = url
        } catch (error) {
            alert("No se pudo iniciar el inicio de sesión con Google")
        }
    }

    return {
        registerUser,
        loginUser,
        logoutUser,
        authMe,
        getDecodedId,
        loginWithGoogle,
    }
}
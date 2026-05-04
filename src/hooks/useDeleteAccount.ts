import { reactivateAccountHttp, requestAccountDeletionHttp } from '../data/http/auth'
import useAuthStore from '../store/useAuthStore'

export const useDeleteAccount = () => {
  const { logout, payload } = useAuthStore()

  const requestDeletion = async (password?: string) => {
    if (!payload?.id) throw new Error('User ID not found')
    const result = await requestAccountDeletionHttp(password)
    logout() // El backend ya invalida las sesiones, pero limpiamos el local state
    return result
  }

  const reactivateAccount = async (token: string) => {
    const result = await reactivateAccountHttp(token)
    return result
  }

  return {
    requestDeletion,
    reactivateAccount,
  }
}


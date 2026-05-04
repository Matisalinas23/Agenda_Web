import api from "./axios"

export const sendEmailDesactivateAccountHttp = async (userId: string) => {
    try {
        const response = await api.post('/users/send-email-desactivate-account', { userId })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const desactivateAccountHttp = async (userId: string) => {
  try {
    const response = await api.patch('/users/desactivate-account', { userId })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

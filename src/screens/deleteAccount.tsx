import { useState } from "react"
import { useDeleteAccount } from "../hooks/useDeleteAccount"

export default function DeleteAccount() {
  const [deleteAccountInput, setDeleteAccountInput] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const textToConfirm = 'QUIERO ELIMINAR MI CUENTA'

  const { requestDeletion } = useDeleteAccount()

  const handleDeleteAccount = async () => {
    if (deleteAccountInput.toLowerCase() !== textToConfirm.toLowerCase()) {
      alert('Texto de confirmación incorrecto')
      return
    }

    try {
      setIsLoading(true)
      const result = await requestDeletion(password)
      alert(result.message || 'Proceso de eliminación iniciado. Revisa tu correo.')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al solicitar la eliminación'
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4 max-w-2xl mx-auto">
      <header className="text-center">
        <h3 className="text-primary text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1">Ajustes de Seguridad</h3>
        <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Eliminar Cuenta</h2>
      </header>

      <section className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-6 rounded-2xl">
          <p className="text-sm text-center text-red-600 dark:text-red-400 font-medium">
            ¡Atención! Esta acción inhabilitará tu acceso inmediatamente. Tu cuenta y todos sus datos serán eliminados permanentemente en 5 días.
          </p>
        </section>

        <section className="flex flex-col w-full gap-8 bg-white dark:bg-secondary-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className="text-sm w-full bg-neutral-100 dark:bg-background-dark px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Escribe {<span className="text-red-600">"{textToConfirm}"</span>} para confirmar</p>
            <input
              type="text"
              value={deleteAccountInput}
              onChange={(e) => setDeleteAccountInput(e.target.value)}
              placeholder="Escribe aquí"
              className="text-sm w-full bg-neutral-100 dark:bg-background-dark px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
            />
          </div>

          <button
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-black tracking-tight shadow-sm transition-all flex items-center justify-center gap-2
              ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white cursor-pointer active:scale-95'}`}
            onClick={handleDeleteAccount}
          >
            {isLoading ? 'Procesando...' : 'Confirmar Eliminación Permanente'}
          </button>
        </section>
    </div>
  )
}

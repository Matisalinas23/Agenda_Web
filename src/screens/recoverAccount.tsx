import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDeleteAccount } from "../hooks/useDeleteAccount";

export default function RecoverAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { reactivateAccount } = useDeleteAccount();

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const hasRequested = useRef(false);
  useEffect(() => {
    if (token && !hasRequested.current) {
      hasRequested.current = true;
      handleReactivate();
    }
  }, [token]);

  const handleReactivate = async () => {
    try {
      setStatus('loading');
      const result = await reactivateAccount(token!);
      setStatus('success');
      setMessage(result.message);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'El token es inválido o ha expirado.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 py-8 px-4">
      <header className="text-center">
        <h3 className="text-primary text-[0.7rem] font-black tracking-[0.3em] uppercase mb-2">Seguridad de Cuenta</h3>
        <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Rehabilitación</h2>
      </header>

      <section className="w-full max-w-md bg-white dark:bg-secondary-dark p-10 rounded-[2rem] shadow-md border border-gray-100 dark:border-gray-800 text-center">
        
        {!token && status === 'idle' && (
          <>
            <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-600 mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">mail</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Token Requerido</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Para rehabilitar tu cuenta, debes hacer clic en el enlace que enviamos a tu correo electrónico.
            </p>
            <Link to="/login" className="text-primary font-bold hover:underline">Volver al inicio de sesión</Link>
          </>
        )}

        {status === 'loading' && (
          <div className="flex flex-col items-center py-10">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-gray-600 dark:text-gray-300">Procesando solicitud...</p>
          </div>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold mb-4">¡Cuenta Rehabilitada!</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">{message}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg cursor-pointer hover:shadow-primary/30 transition-all active:scale-95"
            >
              Iniciar Sesión
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 mx-auto mb-6">
              <span className="material-symbols-outlined text-4xl">error</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Error de Activación</h3>
            <p className="text-red-500 dark:text-red-400 font-medium mb-8">{message}</p>
            <Link to="/login" className="text-primary font-bold hover:underline">Ir al soporte o reintentar</Link>
          </>
        )}
      </section>
    </div>
  );
}


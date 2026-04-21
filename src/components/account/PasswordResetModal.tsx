import { useState } from "react";
import type { IPayloadAuth } from "../../interfaces/auth.interface";

interface PasswordResetModalProps {
    payload: IPayloadAuth;
    onClose: () => void;
}

export default function PasswordResetModal({ payload, onClose }: PasswordResetModalProps) {
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const handlePasswordResetRequest = async () => {
        setIsSendingEmail(true);
        try {
            const response = await fetch('http://localhost:3000/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: payload?.email })
            });

            if (response.ok) {
                alert("Se ha enviado un correo exitosamente con las instrucciones para restablecer tu contraseña.");
                onClose();
            } else {
                const error = await response.json();
                alert("Hubo un error: " + (error.message || "No se pudo enviar el correo."));
            }
        } catch (error) {
            alert("Error de conexión al servidor.");
        } finally {
            setIsSendingEmail(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-secondary-dark rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-primary/10 scale-100 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined !text-5xl">lock_reset</span>
                </div>
                <h3 className="text-xl font-black text-center text-gray-800 dark:text-white mb-2">Cambiar Contraseña</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
                    Se enviará un correo a <span className="font-bold text-gray-700 dark:text-white">{payload.email}</span> con un enlace seguro para restablecer tu contraseña. ¿Deseas continuar?
                </p>
                <div className="flex gap-4">
                    <button 
                        onClick={onClose}
                        disabled={isSendingEmail}
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-background-dark text-gray-600 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-800 transition-all cursor-pointer disabled:opacity-50">
                        Cancelar
                    </button>
                    <button 
                        onClick={handlePasswordResetRequest}
                        disabled={isSendingEmail}
                        className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 shadow-md">
                        {isSendingEmail ? (
                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                        ) : (
                            "Sí, enviar"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

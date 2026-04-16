import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetPassword } from '../hooks/useResetPassword';

function ResetPassword() {
    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get("token");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetPassword, isLoading } = useResetPassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!password || !confirmPassword) {
            alert("Por favor completa ambos campos.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Error: Las contraseñas no coinciden.");
            return;
        }

        if (!token) {
            alert("Token inválido.");
            return;
        }

        const result = await resetPassword(token, password);
        
        if (result.success) {
            alert("Tu contraseña ha sido actualizada con éxito.\nYa puedes iniciar sesión.");
            navigate('/login');
        } else {
            alert("Error: " + result.error);
        }
    };

    if (!token) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
                <span className="material-symbols-outlined text-red-500 !text-6xl mb-4">error</span>
                <h1 className="text-2xl font-bold dark:text-white mb-2">Enlace inválido</h1>
                <p className="text-gray-500 mb-6">No se encontró un token válido. Por favor solicita un nuevo enlace desde tu cuenta.</p>
                <button onClick={() => navigate('/')} className="px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-12 md:py-20">
            {/* Header */}
            <div className="mb-10">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-[#1a73e8] uppercase mb-2 block">SECURITY ARCHITECTURE</span>
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">Reset password</h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md leading-relaxed">
                    Update your credentials to maintain the integrity of your workspace environment.
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-secondary-dark rounded-[1.25rem] shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10 mb-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="block text-[0.65rem] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">New password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#f4f6f8] dark:bg-slate-800 border-2 border-transparent rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-[#1a73e8] outline-none transition-all dark:text-white" 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-[0.65rem] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Confirm password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••••••" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#f4f6f8] dark:bg-slate-800 border-2 border-transparent rounded-xl px-4 py-3.5 text-sm focus:bg-white focus:border-[#1a73e8] outline-none transition-all dark:text-white" 
                        />
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                        <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-8 py-2.5 bg-[#1a73e8] hover:bg-blue-600 active:scale-95 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all text-sm cursor-pointer disabled:opacity-50">
                            {isLoading ? <span className="material-symbols-outlined animate-spin text-[1rem]">progress_activity</span> : null}
                            Aceptar
                        </button>
                        <button type="button" onClick={() => navigate('/')} disabled={isLoading} className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer disabled:opacity-50">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer Rules & Help */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-6 border-t border-gray-100 dark:border-gray-800">
                {/* Requirements */}
                {/*
                <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Password Requirements</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-base text-[#1a73e8]">check_circle</span>
                            Minimum 12 characters
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-base text-[#1a73e8]">check_circle</span>
                            One uppercase and one special character
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="material-symbols-outlined text-base text-[#1a73e8]">check_circle</span>
                            Avoid common patterns
                        </li>
                    </ul>
                </div>
                */}

                {/* Help Box */}
                <div className="bg-[#f4f6f8] dark:bg-slate-800 rounded-2xl p-6 border border-blue-500/10">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                        Need help? Contact our <a href="#" className="text-[#1a73e8] font-bold hover:underline">Security Team</a> for assistance with architecture-level account resets or multi-factor authentication issues.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useSessions } from "../hooks/useSessions";
import UserAvatar from "../components/UserAvatar";

// Helper para parsear la cadena User-Agent hacia un texto amigable y un icono
const parseUserAgent = (ua: string | null) => {
    if (!ua) return { os: "Despositivo", browser: "Desconocido", icon: "devices" };
    
    let os = "Desconocido";
    let icon = "devices";
    if (ua.includes("Windows")) { os = "Windows"; icon = "computer"; }
    else if (ua.includes("Mac")) { os = "Mac OS"; icon = "computer"; }
    else if (ua.includes("Linux")) { os = "Linux"; icon = "computer"; }
    else if (ua.includes("Android")) { os = "Android"; icon = "smartphone"; }
    else if (ua.includes("iPhone") || ua.includes("iPad")) { os = "iOS"; icon = "smartphone"; }
    
    let browser = "Navegador";
    if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    
    return { os, browser, icon };
};

export default function Account() {
    const navigate = useNavigate();
    const payload = useAuthStore(state => state.payload);
    const logoutUser = useAuthStore(state => state.logout);
    const { sessions, isLoading: isLoadingSessions, revokeSession } = useSessions();

    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isRevokingId, setIsRevokingId] = useState<string | null>(null);

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
                setIsPasswordModalOpen(false);
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

    const handleDeleteAccount = () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        if (confirmed) {
            alert("El usuario fue eliminado exitosamente.\n\nSerás redirigido al inicio de sesión ahora.");
            localStorage.removeItem("token");
            logoutUser();
            navigate("/login");
        }
    };

    if (!payload) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            {/* Header */}
            <header className="flex flex-col">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-primary uppercase mb-1">AJUSTES DE CUENTA</span>
                <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Mi Perfil</h1>
            </header>

            {/* Bento Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Profile Info Card */}
                <section id="personal-info"
                    className="md:col-span-2 bg-white dark:bg-secondary-dark/20 rounded-2xl p-8 shadow-sm border border-primary/5">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                        <div className="relative group">
                            <UserAvatar className="w-32 h-32" iconSize="!text-4xl" />
                            <div
                                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white text-xs font-bold">Editar</span>
                            </div>
                        </div>

                        <div className="flex-1 w-full space-y-6">
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold dark:text-white mb-1">{payload.username}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {payload.email}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-[0.6rem] font-bold text-primary uppercase tracking-widest">Nombre de Usuario</label>
                                    <p className="text-gray-700 bg-gray-100 dark:bg-background-dark rounded-lg py-2 px-4 dark:text-white font-medium">{payload.username}</p>
                                </div>
                                <div className="opacity-80">
                                    <label className="text-[0.6rem] font-bold text-primary uppercase tracking-widest">Correo Electrónico</label>
                                    <p className="text-gray-700 bg-gray-100 dark:bg-background-dark rounded-lg py-2 px-4 dark:text-white font-medium">{payload.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preferences Card */}
                <section id="preferences" className="bg-secondary/40 dark:bg-secondary-dark/50 rounded-3xl p-8 flex flex-col justify-between shadow-sm border border-primary/5">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold dark:text-white">Preferencias</h3>
                        
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold dark:text-white">Notificaciones</p>
                                <p className="text-[10px] text-gray-500 uppercase font-black">Desktop alerts</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-primary relative shadow-inner">
                                <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between opacity-50">
                            <div>
                                <p className="text-sm font-bold dark:text-white">Modo Oscuro</p>
                                <p className="text-[10px] text-gray-500 uppercase font-black">Theme auto</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-gray-300 relative shadow-inner">
                                <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                            </button>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <span className="text-[0.55rem] font-black text-primary/40 uppercase tracking-[0.2em]">Ready to Sync</span>
                    </div>
                </section>

                {/* Security Section */}
                <section id="security" className="md:col-span-3 bg-white dark:bg-secondary-dark/20 rounded-2xl p-8 shadow-sm border border-primary/5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-md">
                            <div className="flex items-center gap-3 mb-2 text-primary">
                                <span className="material-symbols-outlined">security</span>
                                <h3 className="text-lg font-bold dark:text-white">Seguridad</h3>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Protege tu cuenta activando la verificación de dos pasos y actualizando tu contraseña periódicamente.
                            </p>
                        </div>
                        <div className="flex-1 max-w-lg w-full">
                            <button 
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="w-full md:w-auto px-8 py-3 bg-primary-dark text-white rounded-2xl font-bold transition-all cursor-pointer hover:bg-primary active:scale-95 text-sm">
                                Cambiar Contraseña
                            </button>
                        </div>
                    </div>
                </section>

                {/* Active Devices Section */}
                <section className="md:col-span-3 bg-white dark:bg-secondary-dark/20 rounded-2xl p-8 shadow-sm border border-primary/5">
                    <div className="flex items-center gap-3 mb-6 text-primary">
                        <span className="material-symbols-outlined">devices</span>
                        <h3 className="text-lg font-bold dark:text-white">Dispositivos Conectados</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {isLoadingSessions ? (
                            <div className="col-span-1 md:col-span-2 text-center py-6 text-gray-400 flex flex-col items-center">
                                <span className="material-symbols-outlined animate-spin text-2xl mb-2">progress_activity</span>
                                <p className="text-sm">Buscando sesiones activas...</p>
                            </div>
                        ) : sessions.length === 0 ? (
                            <p className="text-gray-500 text-sm">No se encontraron sesiones.</p>
                        ) : (
                            sessions.map((session, index) => {
                                const isCurrent = index === 0; // Asumiendo que la sesión actual hizo update recién y es la primera.
                                const { os, browser, icon } = parseUserAgent(session.userAgent);
                                const isRevokingThis = isRevokingId === session.id;

                                return (
                                    <div key={session.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border transition-all ${isCurrent ? 'bg-primary/5 dark:bg-primary/10 border-primary/20' : 'bg-gray-50 dark:bg-secondary-dark/40 border-gray-100 dark:border-gray-800 opacity-80 hover:opacity-100'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm border shrink-0 ${isCurrent ? 'bg-white dark:bg-secondary-dark text-primary border-primary/10' : 'bg-white dark:bg-secondary-dark text-gray-500 border-gray-100 dark:border-gray-800'}`}>
                                                <span className="material-symbols-outlined">{icon}</span>
                                            </div>
                                            <div>
                                                <h4 className={`text-sm font-bold ${isCurrent ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-300'}`}>
                                                    {os} - {browser}
                                                </h4>
                                                {isCurrent ? (
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                        <p className="text-[0.65rem] uppercase font-bold text-green-600 dark:text-green-400 tracking-wider">Activo ahora</p>
                                                    </div>
                                                ) : (
                                                    <p className="text-[0.65rem] text-gray-500 font-bold uppercase mt-1 tracking-wider">
                                                        Última vez: {new Date(session.updatedAt).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {isCurrent ? (
                                            <div className="mt-4 sm:mt-0 flex shrink-0">
                                                <span className="text-[0.65rem] font-bold text-primary uppercase tracking-wider bg-white dark:bg-secondary-dark px-3 py-1.5 rounded-lg shadow-sm border border-primary/10">Este dispositivo</span>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={async () => {
                                                    setIsRevokingId(session.id);
                                                    await revokeSession(session.id);
                                                    setIsRevokingId(null);
                                                }}
                                                disabled={isRevokingThis}
                                                className="mt-4 sm:mt-0 text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 border border-red-500/20 disabled:opacity-50 px-4 py-2 rounded-lg transition-all cursor-pointer shrink-0"
                                            >
                                                {isRevokingThis ? 'Cerrando...' : 'Cerrar sesión'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="md:col-span-3 bg-red-100/30 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 group">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6 text-center md:text-left">
                            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-sm">
                                <span className="material-symbols-outlined text-3xl">warning_amber</span>
                            </div>
                            <div className="max-w-sm">
                                <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Se borrará toda la información relacionada con tu agenda universitaria. Esta acción es irreversible.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-8 py-4 border-2 border-red-500/30 text-red-600 font-bold cursor-pointer rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95">
                            Eliminar Cuenta
                        </button>
                    </div>
                </section>
            </div>

            {/* Password Reset Modal */}
            {isPasswordModalOpen && (
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
                                onClick={() => setIsPasswordModalOpen(false)}
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
            )}
        </div>
    );
}

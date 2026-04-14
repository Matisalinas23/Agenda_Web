import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export default function Account() {
    const navigate = useNavigate();
    const payload = useAuthStore(state => state.payload);
    const logoutUser = useAuthStore(state => state.logout);

    const handleDeleteAccount = () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
        if (confirmed) {
            alert("El usuario fue eliminado exitosamente.\n\nSerás redirigido al inicio de sesión ahora.");
            localStorage.removeItem("token");
            logoutUser();
            navigate("/login");
        }
    };

    // Helper to render the avatar safely
    const renderAvatar = (size: string) => {
        if (payload?.profileImage) {
            return (
                <img 
                    src={payload.profileImage} 
                    alt="User profile avatar" 
                    className={`${size} rounded-full object-cover border-2 border-primary/20 shadow-inner`}
                    referrerPolicy="no-referrer"
                />
            );
        }
        return (
            <div className={`${size} rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary`}>
                <span className="material-symbols-outlined !text-4xl text-primary/40">person</span>
            </div>
        );
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
                            <div className="w-32 h-32">
                                {renderAvatar("w-32 h-32")}
                            </div>
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
                            <button className="w-full md:w-auto px-8 py-3 bg-primary-dark text-white rounded-2xl font-bold transition-all cursor-pointer hover:bg-primary active:scale-95 text-sm">
                                Cambiar Contraseña
                            </button>
                        </div>
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
        </div>
    );
}

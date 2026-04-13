import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import AccountIcon from "../components/Icons/AccountIcon";
import { NotificationsIcon } from "../components/Icons/NotificationsIcon";
import { LogOutIcon } from "../components/Icons/LogOutIcon";

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

    const handleGoBack = () => {
        navigate("/");
    };

    const navItems = [
        { id: "personal-info", label: "Información Personal", icon: <AccountIcon /> },
        { id: "security", label: "Seguridad", icon: <LogOutIcon /> },
        { id: "preferences", label: "Preferencias y Datos", icon: <NotificationsIcon /> },
    ];

    return (
        <div className="p-6 md:p-12 max-w-6xl mx-auto flex flex-col gap-6 scroll-smooth">
            {/* Header / Back Button */}
            <header className="flex items-center gap-4">
                <button
                    onClick={handleGoBack}
                    className="group text-primary hover:text-primary-dark font-medium flex items-center gap-2 transition-all underline-offset-4 hover:underline"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a la Agenda
                </button>
            </header>

            <h1 className="text-4xl font-bold text-accent dark:text-accent-dark mb-2">Configuración</h1>

            <div className="flex flex-col md:flex-row gap-10">
                {/* STICKY SIDEBAR */}
                <aside className="md:w-1/3 lg:w-1/4">
                    <div className="sticky top-10 flex flex-col gap-8">
                        {/* Profile Brief */}
                        <div className="bg-secondary dark:bg-secondary-dark p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center gap-4">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center overflow-hidden border-2 border-primary">
                                {payload?.profileImage ? (
                                    <img src={payload.profileImage} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <AccountIcon />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-[180px]">
                                    {payload?.username || "Usuario"}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                                    {payload?.email}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="bg-secondary p-4 dark:bg-secondary-dark rounded-2xl flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-all font-medium border border-transparent hover:border-primary/20"
                                >
                                    <span className="w-5 h-5 opacity-70 transition-transform group-hover:scale-110">
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* MAIN UNIFIED CONTENT */}
                <main className="flex-1">
                    <div className="bg-secondary dark:bg-secondary-dark rounded-2xl shadow-xl overflow-hidden border border-accent/5">

                        {/* Section: Personal Information */}
                        <section id="personal-info" className="p-8 border-b border-accent/10 scroll-mt-10">
                            <h2 className="text-2xl font-bold text-accent dark:text-accent-dark mb-6 flex items-center gap-3">
                                <div className="w-7 h-7">
                                    <AccountIcon />
                                </div> 
                                Información Personal
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nombre de Usuario</label>
                                    <p className="text-lg text-gray-800 dark:text-white font-medium">{payload?.username || "No disponible"}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Correo Electrónico</label>
                                    <p className="text-lg text-gray-800 dark:text-white font-medium">{payload?.email || "No disponible"}</p>
                                </div>
                            </div>
                        </section>

                        {/* Section: Security */}
                        <section id="security" className="p-8 border-b border-accent/10 scroll-mt-10 bg-background/5 dark:bg-background-dark/5">
                            <h2 className="text-2xl font-bold text-accent dark:text-accent-dark mb-6 flex items-center gap-3">
                                <div className="w-7 h-7">
                                    <LogOutIcon />
                                </div>
                                Seguridad
                            </h2>
                            <div className="flex flex-col gap-6">
                                <div className="p-4 bg-white/50 dark:bg-black/20 rounded-xl border border-accent/5">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Administra tu contraseña y la seguridad de tu acceso.</p>
                                    <button
                                        onClick={() => alert("Función en desarrollo...")}
                                        className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl cursor-pointer hover:bg-primary-dark transition-all shadow-md active:scale-95"
                                    >
                                        Cambiar Contraseña
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Section: Preferences & Data */}
                        <section id="preferences" className="p-8 scroll-mt-10">
                            <h2 className="text-2xl font-bold text-accent dark:text-accent-dark mb-6 flex items-center gap-3">
                                <div className="w-7 h-7">
                                    <NotificationsIcon />
                                </div>
                                Preferencias y Datos
                            </h2>

                            <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between p-5 bg-background/20 dark:bg-background-dark/20 rounded-2xl border border-accent/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 p-1.5 bg-green-500/10 rounded-lg text-green-600">
                                            <NotificationsIcon />
                                        </div>
                                        <div>
                                            <p className="font-bold dark:text-white">Notificaciones por Email</p>
                                            <p className="text-xs text-gray-500">Recibe recordatorios de tus tareas pendientes.</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Activo</span>
                                </div>

                                {/* Danger Zone */}
                                <div className="mt-4 p-8 bg-red-50 dark:bg-red-950/20 rounded-3xl border-2 border-dashed border-red-200 dark:border-red-900/30">
                                    <h3 className="text-xl font-bold text-red-600 mb-2">Zona de Peligro</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                                        Al eliminar tu cuenta se borrarán permanentemente todas tus notas y configuraciones.
                                        Esta acción no se puede revertir.
                                    </p>
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl cursor-pointer hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/20 active:scale-95"
                                    >
                                        Eliminar mi cuenta definitivamente
                                    </button>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
}

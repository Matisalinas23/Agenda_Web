import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import UserAvatar from "./UserAvatar";
import { useScrollSpy } from "../hooks/useScrollSpy";

export default function SidebarAccount() {
    const navigate = useNavigate();
    const payload = useAuthStore(state => state.payload);
    const logoutUser = useAuthStore(state => state.logout);

    const handleGoBack = () => {
        navigate("/");
    };

    const activeSection = useScrollSpy(["personal-info", "preferences", "security"], 80);

    const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        if (id === "personal-info") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
        
        const element = document.getElementById(id);
        if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    };

    const getLinkClass = (id: string) => {
        const isActive = activeSection === id;
        return isActive
            ? "flex items-center w-full cursor-pointer gap-3 px-4 py-3 bg-primary text-white font-bold rounded-xl shadow-md transition-all scale-100 active:scale-95"
            : "flex items-center w-full cursor-pointer gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all";
    };

    if (!payload) return null;

    return (
        <aside
            className="w-64 fixed left-0 top-[60px] bottom-0 overflow-y-auto bg-white dark:bg-secondary-dark/20 border-primary/10 flex flex-col p-6 z-30">
            
            <div className="mb-4">
                <button 
                    onClick={handleGoBack}
                    className="flex items-center gap-2 text-primary cursor-pointer hover:bg-primary/10 p-2 rounded-lg transition-colors font-bold mb-6 text-sm"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Volver a la Agenda
                </button>
            </div>

            <div className="mb-8 flex items-center gap-3 px-2">
                <UserAvatar className="w-12 h-12" iconSize="!text-4xl" />
                <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-800 dark:text-white truncate">{payload.username}</h3>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Premium Plan</p>
                </div>
            </div>

            <nav className="flex-grow flex flex-col space-y-2">
                <button className={getLinkClass("personal-info")}
                    onClick={(e) => scrollToSection(e, "personal-info")}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Perfil</span>
                </button>
                <button className={getLinkClass("preferences")}
                    onClick={(e) => scrollToSection(e, "preferences")}>
                    <span className="material-symbols-outlined">settings</span>
                    <span>Preferencias</span>
                </button>
                <button className={getLinkClass("security")}
                    onClick={(e) => scrollToSection(e, "security")}>
                    <span className="material-symbols-outlined">lock</span>
                    <span>Seguridad</span>
                </button>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={logoutUser}
                    className="w-full flex items-center cursor-pointer justify-center gap-2 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all"
                >
                    <span className="material-symbols-outlined">logout</span>
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}

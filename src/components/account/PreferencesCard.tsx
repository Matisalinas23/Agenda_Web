import { useState, useEffect } from "react";
import { toggleTheme } from "../../utils/theme";
import { ModalToggleNotifications } from "../modals/ToggleNotificationIcon";

export default function PreferencesCard() {
    const [isNotification, setIsNotifications] = useState<"true" | "false">("false");
    const [isModalNotifications, setIsModalNotifications] = useState<boolean>(false);
    const [isDark, setIsDark] = useState<boolean>(document.documentElement.classList.contains("dark"));

    useEffect(() => {
        const storedNotifications = localStorage.getItem("notifications") as "true" | "false";
        if (storedNotifications) {
            setIsNotifications(storedNotifications);
        }

        // Observer para cambios de tema externos
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    const handleThemeToggle = () => {
        toggleTheme();
        setIsDark(document.documentElement.classList.contains("dark"));
    };

    return (
        <section id="preferences" className="bg-secondary/40 dark:bg-secondary-dark/50 rounded-3xl p-8 flex flex-col justify-between shadow-sm border border-primary/5">
            <div className="space-y-6">
                <h3 className="text-lg font-bold dark:text-white">Preferencias</h3>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold dark:text-white">Notificaciones</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">
                            {isNotification === "true" ? "Activadas" : "Desactivadas"}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalNotifications(true)}
                        className={`w-12 h-6 rounded-full relative shadow-inner transition-colors cursor-pointer ${isNotification === "true" ? "bg-primary" : "bg-gray-300"}`}
                    >
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isNotification === "true" ? "translate-x-6" : "translate-x-0"}`}></div>
                    </button>
                </div>

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold dark:text-white">Modo Oscuro</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black">
                            {isDark ? "Dark Theme" : "Light Theme"}
                        </p>
                    </div>
                    <button
                        onClick={handleThemeToggle}
                        className={`w-12 h-6 rounded-full relative shadow-inner transition-colors cursor-pointer ${isDark ? "bg-primary" : "bg-gray-300"}`}
                    >
                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isDark ? "translate-x-6" : "translate-x-0"}`}></div>
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <span className="text-[0.55rem] font-black text-primary/40 uppercase tracking-[0.2em]">Ready to Sync</span>
            </div>

            {isModalNotifications && (
                <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
                    <ModalToggleNotifications
                        isNotifications={isNotification}
                        setIsModalNotifications={setIsModalNotifications}
                        setIsNotifications={setIsNotifications}
                    />
                </div>
            )}
        </section>
    );
}

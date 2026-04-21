import { toggleTheme } from "../../utils/theme";

export default function PreferencesCard() {
    return (
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
                    <button onClick={toggleTheme} className="w-12 h-6 rounded-full bg-gray-300 relative shadow-inner cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </button>
                </div>
            </div>
            
            <div className="mt-8">
                <span className="text-[0.55rem] font-black text-primary/40 uppercase tracking-[0.2em]">Ready to Sync</span>
            </div>
        </section>
    );
}

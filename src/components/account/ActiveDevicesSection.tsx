import { useState } from "react";
import { useSessions } from "../../hooks/useSessions";
import type { ISession } from "../../data/http/auth";

interface ActiveDevicesSectionProps {
    sessions: ISession[];
    isLoadingSessions: boolean;
}

// Helper para parsear la cadena User-Agent hacia un texto amigable y un icono
const parseUserAgent = (ua: string | null) => {
    if (!ua) return { os: "Dispositivo", browser: "Desconocido", icon: "devices" };
    
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

export default function ActiveDevicesSection({ sessions, isLoadingSessions }: ActiveDevicesSectionProps) {
    const { revokeSession } = useSessions();
    const [isRevokingId, setIsRevokingId] = useState<string | null>(null);

    const handleRevokeSession = async (sessionId: string) => {
        setIsRevokingId(sessionId);
        await revokeSession(sessionId);
        setIsRevokingId(null);
    };

    return (
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
                        const isCurrent = index === 0;
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
                                        onClick={() => handleRevokeSession(session.id)}
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
    );
}

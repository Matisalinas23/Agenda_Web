import { useState, useEffect, useCallback } from 'react';
import { getSessionsHttp, revokeSessionHttp, type ISession } from '../data/http/auth';

export const useSessions = () => {
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSessions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getSessionsHttp();
            setSessions(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error cargando las sesiones');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const revokeSession = async (sessionId: string) => {
        try {
            await revokeSessionHttp(sessionId);
            setSessions(prev => prev.filter(s => s.id !== sessionId));
            return { success: true };
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Error intentando cerrar la sesión';
            setError(msg);
            return { success: false, error: msg };
        }
    };

    return {
        sessions,
        isLoading,
        error,
        revokeSession,
        refreshSessions: fetchSessions
    };
};

import { useState } from 'react';
import { resetPasswordHttp } from '../data/http/auth';

export const useResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetPassword = async (token: string, newPassword: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await resetPasswordHttp(token, newPassword);
            setIsLoading(false);
            return { success: true, data };
        } catch (err: any) {
            setIsLoading(false);
            setError(err.response.data.message || 'Error desconocido');
            return { success: false, error: err.response.data.message };
        }
    };

    return {
        resetPassword,
        isLoading,
        error
    };
};

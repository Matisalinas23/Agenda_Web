import axios from "axios";

const API_URL = import.meta.env.VITE_LOCAL_API_URL;
const CRON_SECRET = import.meta.env.VITE_CRON_SECRET;

export const triggerLimitDateReminders = async (): Promise<void> => {
    try {
        console.log("Disparando servicio de recordatorios de fecha límite...");
        await axios.get(`${API_URL}/internal/limit-date-reminders`, {
            headers: {
                "x-api-key": CRON_SECRET
            }
        });
    } catch (error) {
        console.error("Error al ejecutar el servicio de recordatorios de fecha límite:", error);
    }
};

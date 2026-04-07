import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useNoteStore from "../store/useNoteStore";
import { triggerLimitDateReminders } from "../data/http/notifications";

export const useNotificationTrigger = () => {
    const { token } = useAuthStore(state => state);
    const { notes } = useNoteStore(state => state);

    useEffect(() => {
        const isNotificationsEnabled = localStorage.getItem("notifications") === "true";
        if (!token || !isNotificationsEnabled || notes.length === 0) return;

        // --- 1. Lógica de limpieza y carga ---
        const sentNotifications = JSON.parse(localStorage.getItem("sent_notifications") || "{}");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let hasNewReminder = false;
        const updatedSentNotifications = { ...sentNotifications };

        // Limpiar notas antiguas (> 1 día después de la fecha límite)
        Object.keys(sentNotifications).forEach(key => {
            const noteLimitDate = new Date(sentNotifications[key]);
            const oneDayAfterLimit = new Date(noteLimitDate);
            oneDayAfterLimit.setDate(oneDayAfterLimit.getDate() + 1);

            if (today > oneDayAfterLimit) {
                delete updatedSentNotifications[key];
            }
        });

        // --- 2. Verificar recordatorios de 1 y 3 días ---
        notes.forEach(note => {
            const noteLimitDate = new Date(note.limitDate);
            noteLimitDate.setHours(0, 0, 0, 0);

            const diffTime = noteLimitDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Recordatorios de 1 día (id-1) o 3 días (id-3)
            if (diffDays === 1 || diffDays === 3) {
                const key = `${note.id}-${diffDays}`;

                // Si no se envió O si la fecha cambió (edición), permitir nuevo envío
                if (!updatedSentNotifications[key] || updatedSentNotifications[key] !== note.limitDate) {
                    hasNewReminder = true;
                    updatedSentNotifications[key] = note.limitDate;
                }
            }
        });

        // --- 3. Trigger y Persistencia ---
        if (hasNewReminder) {
            triggerLimitDateReminders();
        }

        localStorage.setItem("sent_notifications", JSON.stringify(updatedSentNotifications));

    }, [token, notes]);
};

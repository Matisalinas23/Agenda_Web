import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = 0) => {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0]);

    useEffect(() => {
        const handleScroll = () => {
            // Si estamos muy cerca del inicio, el ganador siempre es Perfil
            if (window.scrollY < 50) {
                setActiveSection(sectionIds[0]);
                return;
            }

            // Especial para el final de la página: si llegamos al fondo, activar el último
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
            if (isBottom) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
                return;
            }

            let current = sectionIds[0];
            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset + 120) {
                        current = id;
                    }
                }
            }
            setActiveSection(current);
        };

        // Agregar un debounced listener u observer. 
        // Usamos listener simple para sincronización rápida y precisa.
        window.addEventListener('scroll', handleScroll);
        // Llamada inicial para establecer el primer estado
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return activeSection;
};

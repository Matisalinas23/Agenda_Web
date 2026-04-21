interface SecuritySectionProps {
    onOpenModal: () => void;
}

export default function SecuritySection({ onOpenModal }: SecuritySectionProps) {
    return (
        <section id="security" className="md:col-span-3 bg-white dark:bg-secondary-dark/20 rounded-2xl p-8 shadow-sm border border-primary/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="max-w-md">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                        <span className="material-symbols-outlined">security</span>
                        <h3 className="text-lg font-bold dark:text-white">Seguridad</h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Protege tu cuenta activando la verificación de dos pasos y actualizando tu contraseña periódicamente.
                    </p>
                </div>
                <div className="flex-1 max-w-lg w-full">
                    <button 
                        onClick={onOpenModal}
                        className="w-full md:w-auto px-8 py-3 bg-primary-dark text-white rounded-2xl font-bold transition-all cursor-pointer hover:bg-primary active:scale-95 text-sm">
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </section>
    );
}

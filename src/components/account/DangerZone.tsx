import { useNavigate } from "react-router-dom";

export default function DangerZone() {
    const navigate = useNavigate();

    const handleDeleteAccount = () => {
        navigate("/delete-account");
    };

    return (
        <section className="md:col-span-3 bg-red-100/30 dark:bg-red-900/10 rounded-2xl p-8 border border-red-200 dark:border-red-900/30 group">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">warning_amber</span>
                    </div>
                    <div className="max-w-sm">
                        <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Se borrará toda la información relacionada con tu agenda universitaria. Esta acción es irreversible.
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleDeleteAccount}
                    className="px-8 py-4 border-2 border-red-500/30 text-red-600 font-bold cursor-pointer rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95">
                    Eliminar Cuenta
                </button>
            </div>
        </section>
    );
}

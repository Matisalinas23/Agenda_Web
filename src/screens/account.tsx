import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { useSessions } from "../hooks/useSessions";
import ProfileInfoCard from "../components/account/ProfileInfoCard";
import PreferencesCard from "../components/account/PreferencesCard";
import SecuritySection from "../components/account/SecuritySection";
import ActiveDevicesSection from "../components/account/ActiveDevicesSection";
import DangerZone from "../components/account/DangerZone";
import PasswordResetModal from "../components/account/PasswordResetModal";

export default function Account() {
    const payload = useAuthStore(state => state.payload);
    const { sessions, isLoading: isLoadingSessions } = useSessions();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    if (!payload) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 py-4">
            {/* Header */}
            <header className="flex flex-col">
                <span className="text-[0.6rem] font-bold tracking-[0.2em] text-primary uppercase mb-1">AJUSTES DE CUENTA</span>
                <h1 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">Mi Perfil</h1>
            </header>

            {/* Bento Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Profile Info Card */}
                <ProfileInfoCard payload={payload} />

                {/* Preferences Card */}
                <PreferencesCard />

                {/* Security Section */}
                <SecuritySection onOpenModal={() => setIsPasswordModalOpen(true)} />

                {/* Active Devices Section */}
                <ActiveDevicesSection
                    sessions={sessions}
                    isLoadingSessions={isLoadingSessions}
                />

                {/* Danger Zone */}
                <DangerZone />
            </div>

            {/* Password Reset Modal */}
            {isPasswordModalOpen && (
                <PasswordResetModal
                    payload={payload}
                    onClose={() => setIsPasswordModalOpen(false)}
                />
            )}
        </div>
    );
}

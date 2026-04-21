import UserAvatar from "../UserAvatar";
import { IPayloadAuth } from "../../interfaces/auth.interface";

interface ProfileInfoCardProps {
    payload: IPayloadAuth;
}

export default function ProfileInfoCard({ payload }: ProfileInfoCardProps) {
    return (
        <section id="personal-info"
            className="md:col-span-2 bg-white dark:bg-secondary-dark/20 rounded-2xl p-8 shadow-sm border border-primary/5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="relative group">
                    <UserAvatar className="w-32 h-32" iconSize="!text-4xl" />
                    <div
                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-white text-xs font-bold">Editar</span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-6">
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold dark:text-white mb-1">{payload.username}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {payload.email}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="text-[0.6rem] font-bold text-primary uppercase tracking-widest">Nombre de Usuario</label>
                            <p className="text-gray-700 bg-gray-100 dark:bg-background-dark rounded-lg py-2 px-4 dark:text-white font-medium">{payload.username}</p>
                        </div>
                        <div className="opacity-80">
                            <label className="text-[0.6rem] font-bold text-primary uppercase tracking-widest">Correo Electrónico</label>
                            <p className="text-gray-700 bg-gray-100 dark:bg-background-dark rounded-lg py-2 px-4 dark:text-white font-medium">{payload.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

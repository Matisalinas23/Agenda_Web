import useAuthStore from "../store/useAuthStore";

interface UserAvatarProps {
    className?: string; // Para el tamaño del contenedor, ej: "w-32 h-32"
    iconSize?: string;  // Para el tamaño del icono de Google, ej: "!text-4xl"
}

export default function UserAvatar({ className = "w-10 h-10", iconSize = "!text-2xl" }: UserAvatarProps) {
    const payload = useAuthStore(state => state.payload);

    if (payload?.profileImage) {
        return (
            <img 
                src={payload.profileImage} 
                alt="User profile avatar" 
                className={`${className} rounded-full object-cover border-2 border-primary/20 shadow-inner`}
                referrerPolicy="no-referrer"
            />
        );
    }
    return (
        <div className={`${className} rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary`}>
            <span className={`material-symbols-outlined ${iconSize} text-primary/40`}>person</span>
        </div>
    );
}

import { ButtonAcceptSmall } from "../Buttons/ButtonAccept"
import { ButtonCancelSmall } from "../Buttons/ButtonCancel"

interface ModalToggleNotificationsProps {
    setIsModalNotifications: (value: boolean) => void
    isNotifications: "true" | "false"
    setIsNotifications: (value: "true" | "false") => void
}

export const ModalToggleNotifications = ({
    setIsModalNotifications,
    isNotifications,
    setIsNotifications
}: ModalToggleNotificationsProps) => {
    return (
        <div className=" bg-secondary max-w-100 h-fit rounded-2xl p-8 flex flex-col items-center justify-center gap-12">
            <p className="text-xl text-center">
                {isNotifications === "true"
                    ? "¿ Estas seguro que deseas desactivar las notificaciones ?"
                    : "¿ Estas seguro que deseas activar las notificaciones ?"
                }
            </p>
            <div className="w-full flex justify-between">
                <ButtonCancelSmall
                    onClick={() => {
                        setIsModalNotifications(false)
                    }}
                    text="No"
                />
                <ButtonAcceptSmall
                    onClick={() => {
                        const isNotis = isNotifications === "true" ? "false" : "true"
                        localStorage.setItem("notifications", isNotis)
                        setIsNotifications(isNotis)
                        setIsModalNotifications(false)
                    }}
                    type="button"
                    text="Si"
                />
            </div>
        </div>
    )
}
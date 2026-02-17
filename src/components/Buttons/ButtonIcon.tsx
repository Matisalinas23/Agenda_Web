export const ButtonIcon = ({ children, type, onClick, height, width, color }) => (
    <button
        type={type ?? "button"}
        className={"w-" + width + " h-" + height + " text-" + color + " cursor-pointer flex justify-center items-center"}
        onClick={onClick}
    >
        { children }
    </button>
)

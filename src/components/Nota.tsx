import type { INote } from "../screens/agenda/agenda";
import EditNote from "./modals/EditNote";
import useAgendaModals from "../hooks/useAgendaModals";

export default function Nota({ note }: { note: INote }) {
    const { modal, openEdit, closeModal } = useAgendaModals()

    return (
        <>
        <li className="w-full p-4 mb-4 rounded-2xl text-white flex justify-between" style={{ backgroundColor: note.color, color: note.textColor }}>
            <h2>{note.title}</h2>
            <p>{note.title}</p>
            <p>{note.limitDate}</p>
            <div className="w-2/10">
                <button className="w-1/2 h-full bg-white/33 cursor-pointer hover:bg-white/66" onClick={openEdit}>E</button>
                <button className="w-1/2 h-full bg-white/33 cursor-pointer hover:bg-red-500">X</button>
            </div>
        </li>
        
        {modal === "edit" &&
            <EditNote note={note} closeModal={closeModal} />
        }
        </>
    )
}

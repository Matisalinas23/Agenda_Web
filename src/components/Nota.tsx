import type { INote } from "../screens/agenda/agenda";
import EditNote from "./modals/EditNote";
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import { useState } from "react";
import "./Note.css"

export default function Nota({ note }: { note: INote }) {
    const { modal, openEdit, openDelete, closeModal, openView } = useAgendaModals()
    const { formatDate } = useDate()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
        <li className={`note ${isOpen ? "open" : ""}`} style={{ backgroundColor: note.color, color: note.textColor }}>
            <div className="w-full pb-4 flex justify-between">
                <h2>{note.assignature}</h2>
                <p>{note.title}</p>
                <p>{formatDate(note.limitDate)}</p>
                <div className="w-2/10">
                    <button className="w-1/3 h-full bg-white/33 cursor-pointer hover:bg-neutral-500" onClick={openView}>V</button>
                    <button className="w-1/3 h-full bg-white/33 cursor-pointer hover:bg-white/66" onClick={openEdit}>E</button>
                    <button className="w-1/3 h-full bg-white/33 cursor-pointer hover:bg-red-500" onClick={openDelete}>X</button>
                </div>
            </div>

            <div className="descriptionHidden">
                <p className="bg-neutral-700/10 rounded-xl px-3 py-1">{note.description}</p>
            </div>

            <button className="w-full pb-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>v</button>
        </li>
        
        { modal === "edit" && <EditNote note={note} closeModal={closeModal} /> }
        { modal === "delete" && <DeleteNote note={note} closeModal={closeModal} />}
        </>
    )
}

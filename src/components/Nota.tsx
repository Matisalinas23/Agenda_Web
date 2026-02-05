import type { INote } from "../interfaces/notes"; 
import EditNote from "./modals/EditNote";
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import "./css/Note.css"
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcons";

export default function Nota({ note }: { note: INote }) {
    const { modal, openEdit, openDelete, closeModal } = useAgendaModals()
    const { formatDate } = useDate()

    return (
        <>
        <li
            className="w-full note font-medium"
            style={{ backgroundColor: note.color, color: note.textColor }}
        >
            <div className="w-full flex gap-12">
                <div className="w-full flex gap-12">
                    <h2 className="min-w-44">{note.assignature}</h2>
                    <p>{note.title}</p>
                </div>

                <div className="flex items-center gap-12">
                    <p>{formatDate(note.limitDate)}</p>

                    <div className="flex gap-4">
                        <button className="w-6.5 h-6.5 rounded-lg cursor-pointer flex items-center justify-center" onClick={openEdit}>
                            <EditIcon />
                        </button>
                        <button className="w-6.5 h-6.5 cursor-pointer" onClick={openDelete}>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="descriptionHidden" style={{backgroundColor: note.color}}>
                <p className="rounded-xl px-2 bg-white/18 py-1">{note.description}</p>
            </div>
        </li>

        { modal === "edit" && <EditNote note={note} closeModal={closeModal} /> }
        { modal === "delete" && <DeleteNote note={note} closeModal={closeModal} /> }
        </>
    )
}

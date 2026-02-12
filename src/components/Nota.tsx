import type { INote } from "../interfaces/notes"; 
import EditNote from "./modals/EditNote";
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import "./css/Note.css"
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";

export default function Nota({ note }: { note: INote }) {
    const { modal, openEdit, openDelete, closeModal } = useAgendaModals()
    const { formatDate } = useDate()

    return (
        <>
        <li className="note w-full font-normal bg-white shadow-lg" >
            <div className="w-full flex gap-12">
                <div className="w-full border-r flex items-center gap-12">
                    <h2 className="min-w-44 px-2 font-normal rounded-lg h-fit flex items-center" style={{backgroundColor: note.color}}>{note.assignature}</h2>
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

            <div className="descriptionHidden shadow-lg">
                <p className="px-2 py-1">{note.description}</p>
            </div>
        </li>

        { modal === "edit" && <EditNote note={note} closeModal={closeModal} /> }
        { modal === "delete" && <DeleteNote note={note} closeModal={closeModal} /> }
        </>
    )
}

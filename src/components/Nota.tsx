import type { INote } from "../interfaces/notes"; 
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import "./css/Note.css"

type NoteProps = {
    note: INote
    setIsEditingNote: (el: boolean) => void
}

export default function Nota({ note, setIsEditingNote }: NoteProps) {
    const { formatDate } = useDate()
    const { modal, openDelete, closeModal } = useAgendaModals()

    return (
        <li className="note bg-white dark:bg-secondary-dark shadow-lg">
            <div className="w-full flex gap-12">
                <div className="w-full pr-8 flex items-center gap-8">
                    <h2 className="min-w-44 px-2 font-normal rounded-lg h-fit flex items-center" style={{ backgroundColor: note.color }}>
                        {note.assignature}
                    </h2>
                    <p className="w-full dark:text-white">{note.title}</p>
                </div>

                <div className="flex items-center gap-12">
                    <p className="dark:text-white">{formatDate(note.limitDate)}</p>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="w-6.5 h-6.5 text-primary cursor-pointer flex justify-center items-center"
                            onClick={() => setIsEditingNote(true)}
                            >
                            <EditIcon />
                        </button>
                        <button
                            type="button"
                            className="w-6.5 h-6.5 text-primary cursor-pointer flex justify-center items-center"
                            onClick={openDelete}
                            >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            </div>

            <div className="descriptionHidden shadow-lg">
                <p className="px-2 py-1">{note.description}</p>
            </div>

            {modal === "delete" && <DeleteNote note={note} closeModal={closeModal} />}
        </li>
    )
}

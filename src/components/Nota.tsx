import type { INote } from "../interfaces/notes"; 
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { ButtonIcon } from "./Buttons/ButtonIcon";
import "./css/Note.css"

type NoteProps = {
    note: INote
    setIsEditingNote: (el: boolean) => void
}

export default function Nota({ note, setIsEditingNote }: NoteProps) {
    const { formatDate } = useDate()
    const { modal, openDelete, closeModal } = useAgendaModals()

    return (
        <li className="note bg-white shadow-lg">
            <div className="w-full flex gap-12">
                <div className="w-full pr-8 flex items-center gap-8">
                    <h2 className="min-w-44 px-2 font-normal rounded-lg h-fit flex items-center" style={{ backgroundColor: note.color }}>
                        {note.assignature}
                    </h2>
                    <p className="w-full">{note.title}</p>
                </div>

                <div className="flex items-center gap-12">
                    <p>{formatDate(note.limitDate)}</p>
                    <div className="flex gap-4">
                        <ButtonIcon type="button" width="6.5" height="6.5" color="primary" onClick={() => setIsEditingNote(true)}>
                            <EditIcon />
                        </ButtonIcon>
                        <ButtonIcon type="button" width="6.5" height="6.5" color="primary" onClick={openDelete}>
                            <DeleteIcon />
                        </ButtonIcon>
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

import type { ICreateNote, INote } from "../interfaces/notes"; 
import useAgendaModals from "../hooks/useAgendaModals";
import DeleteNote from "./modals/DeleteNote";
import useDate from "../hooks/useDate";
import "./css/Note.css"
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import type { Dispatch, FormEvent, SetStateAction } from "react";
import { AcceptIcon } from "./Icons/AcceptIcon";
import useForm from "../hooks/useForm";
import { useNotes } from "../hooks/useNotes";
import { ButtonIcon } from "./Buttons/ButtonIcon";

type NoteProps = {
    note: INote
    setNoteId: Dispatch<SetStateAction<number | null>>
    noteId: number | null
    initialValues: ICreateNote
}

export default function Nota({ note, setNoteId, noteId, initialValues }: NoteProps) {
    const { formatDate, año } = useDate()
    const { modal, openDelete, closeModal } = useAgendaModals()
    const { formValues, handleChange } = useForm<ICreateNote>(initialValues)
    const { updateNote } = useNotes()
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formValues.title === initialValues.title &&
            formValues.limitDate === initialValues.limitDate &&
            formValues.description === initialValues.description
        ){
            setNoteId(null)
            return
        }

        const isUpdated = await updateNote(note.id, formValues)

        if (!isUpdated) {
            alert("Hubo un error al editar la nota. Intentalo denuevo mas tarde.")
        }

        setNoteId(null)
    }

    return (
        <li>
            {/* Note component is actually an editing note component */}
            <form onSubmit={handleSubmit} className="note bg-white shadow-lg">
                <div className="w-full flex gap-12">
                    <div className="w-full pr-8 flex items-center gap-8">
                        <h2 className="min-w-44 px-2 font-normal rounded-lg h-fit flex items-center" style={{ backgroundColor: note.color }}>
                            {note.assignature}
                        </h2>

                        {noteId === note.id ?
                            <input type="text" name="title" value={formValues.title} onChange={handleChange} className="w-full bg-neutral-100 px-2 rounded-lg" />
                        :
                            <p className="w-full">{note.title}</p>
                        }
                    </div>
                    <div className="flex items-center gap-12">
                        {noteId === note.id ?
                            <input type="date" name="limitDate" value={formValues.limitDate} onChange={handleChange}
                                min={`${año}-01-01`} max={`${año}-12-31`} className="bg-neutral-100 px-1 rounded-lg"
                            />
                        :
                            <p>{formatDate(note.limitDate)}</p>
                        }

                        {noteId === note.id ?
                            <ButtonIcon type="submit" width="6.5" height="6.5" color="primary" onClick={()=>{}}>
                                <AcceptIcon />
                            </ButtonIcon>
                            :
                            <div className="flex gap-4">
                                <ButtonIcon type="button" width="6.5" height="6.5" color="primary" onClick={() => setNoteId(note.id)}>
                                    <EditIcon />
                                </ButtonIcon>
                                <ButtonIcon type="button" width="6.5" height="6.5" color="primary" onClick={openDelete}>
                                    <DeleteIcon />
                                </ButtonIcon>
                            </div>
                        }
                    </div>
                </div>
                <div className="descriptionHidden shadow-lg">
                    {noteId === note.id ?
                        <input type="text" name="description" value={formValues.description} onChange={handleChange} className="w-full bg-neutral-100 rounded-lg px-2"/>
                    :
                        <p className="px-2 py-1">{note.description}</p>
                    }
                </div>
            </form>

            { modal === "delete" && <DeleteNote note={note} closeModal={closeModal} /> }
        </li>
    )
}

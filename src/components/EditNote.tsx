import type { FormEvent } from "react"
import useForm from "../hooks/useForm"
import type { ICreateNote, INote } from "../interfaces/notes.interface"
import { useNotes } from "../hooks/useNotes"
import useDate from "../hooks/useDate"
import { AcceptIcon } from "./Icons/AcceptIcon"
import "./css/Note.css"

type EditNoteProps = {
    initialValues: ICreateNote
    setIsEditingNote: (el: boolean) => void
    note: INote
}

export default function EditNote({ initialValues, setIsEditingNote, note }: EditNoteProps) {
    const { formValues, handleChange } = useForm<ICreateNote>(initialValues)
    const { updateNote } = useNotes()
    const { año } = useDate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (formValues.title === initialValues.title &&
            formValues.limitDate === initialValues.limitDate &&
            formValues.description === initialValues.description
        ) {
            setIsEditingNote(false)
            return
        }

        const isUpdated = await updateNote(note.id, formValues)

        if (!isUpdated) {
            alert("Hubo un error al editar la nota. Intentalo denuevo mas tarde.")
        }

        setIsEditingNote(false)
    }

    return (
        <form onSubmit={handleSubmit} className="note bg-white dark:bg-secondary-dark shadow-lg">
            <div className="w-full flex gap-12">
                <div className="w-full pr-8 flex items-center gap-8">
                    <h2 className="min-w-44 px-2 font-normal rounded-lg h-fit flex items-center" style={{ backgroundColor: note.color }}>{formValues.assignature}</h2>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        placeholder="Título de la nota"
                        onChange={handleChange}
                        className="w-full bg-neutral-100 dark:bg-white/10 dark:text-white px-1 rounded-lg"
                    />
                </div>
                <div className="flex items-center gap-12">
                    <input
                        type="date"
                        name="limitDate"
                        value={formValues.limitDate}
                        onChange={handleChange}
                        min={`${año}-01-01`}
                        max={`${año}-12-31`}
                        className="bg-neutral-100 px-1 dark:bg-white/10 dark:text-white rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-6.5 h-6.5 text-primary cursor-pointer flex justify-center items-center"
                    >
                        <AcceptIcon />
                    </button>
                </div>
                <div className="descriptionHidden shadow-lg">
                    <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        className="w-full bg-neutral-100 dark:bg-white/10 rounded-lg px-2"
                    />
                </div>
            </div>
        </form>
    )
}

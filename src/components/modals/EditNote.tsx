import { useNotes } from "../../hooks/useNotes"
import type { IFormValues, INote } from "../../screens/agenda/agenda"
import AñadirEditarNota from "../AñadirEditarNota"

export default function EditNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { updateNote } = useNotes()

    const handleEditNote = async (formValues: IFormValues) => {
        const updatedNote: IFormValues = {
            title: formValues.title,
            assignature: formValues.assignature,
            color: formValues.color,
            description: formValues.description,
            limitDate: new Date(formValues.limitDate)
        }

        console.log(updatedNote)

        const isUpdated = await updateNote(note.id, updatedNote)

        if (!isUpdated) return

        closeModal()
    }

    return (
        <div className="w-full h-full fixed inset-0 z-10 bg-black/50 flex flex-col items-center justify-center gap-12">
            <AñadirEditarNota initialValues={note} onSubmit={handleEditNote} closeModal={closeModal} />
        </div>
    )
}

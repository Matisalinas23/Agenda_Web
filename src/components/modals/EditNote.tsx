import type { IFormValues, INote } from "../../screens/agenda/agenda"
import useNoteStore from "../../store/useNoteStore"
import AñadirEditarNota from "../AñadirEditarNota"

export default function EditNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { editNote } = useNoteStore(state => state)
    const handleEditNote = (formValues: IFormValues) => {
        const updatedNote: INote = {
            id: note.id,
            title: formValues.title,
            assignature: formValues.assignature,
            description: formValues.description,
            limitDate: formValues.limitDate,
            color: formValues.color,
            textColor: note.textColor,
            completed: note.completed
        }
        editNote(updatedNote)
        console.log("updated note", updatedNote)
        closeModal()
    }

    return (
        <div className="w-full h-full fixed inset-0 z-10 bg-black/50 flex flex-col items-center justify-center gap-12">
            <AñadirEditarNota initialValues={note} onSubmit={handleEditNote} closeModal={closeModal} />
        </div>
    )
}

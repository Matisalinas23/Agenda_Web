import { useNotes } from "../../hooks/useNotes"
import type { ICreateNote, INote } from "../../interfaces/notes"

export default function EditNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { updateNote } = useNotes()

    const handleEditNote = async (formValues: ICreateNote) => {
        const isUpdated = await updateNote(note.id, formValues)

        if (!isUpdated) return

        closeModal()
    }

    return (
        <div className="w-full h-full fixed inset-0 z-10 bg-black/50 flex flex-col items-center justify-center gap-12">
            
        </div>
    )
}

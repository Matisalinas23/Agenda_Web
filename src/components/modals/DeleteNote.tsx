import useDate from "../../hooks/useDate";
import { useNotes } from "../../hooks/useNotes";
import type { INote } from "../../interfaces/notes"; 

export default function DeleteNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { removeNote } = useNotes()
    const { formatDate } = useDate()

    const handleDeleteNote = () => {
        removeNote(note.id)
        closeModal()
    }

    return (
        <div className="w-full h-full fixed inset-0 z-30 bg-black/50 flex items-center justify-center">
            <div className="p-8 bg-neutral-100 shadow-lg rounded-3xl flex flex-col justify-center items-center gap-10">
                <div className="text-center">
                    <p>Estas seguro que quieres eliminar de forma PERMANENTE la anotación:</p>
                    <div className="text-lg font-medium mt-2 flex gap-3 justify-center">
                        <h3>{note.assignature}</h3>
                        <h3>{note.title}</h3>
                        <h3>{formatDate(note.limitDate)}</h3>
                    </div>
                </div>

                <div className="w-full flex justify-between">
                    <button className="bg-primary text-white font-medium px-2 rounded-full cursor-pointer duration-200 hover:bg-blue-400" onClick={closeModal}>
                        CANCELAR
                    </button>
                    <button
                        className="w-24 py-1 bg-red-500 text-white font-medium cursor-pointer rounded-full duration-200 hover:bg-red-400"
                        onClick={handleDeleteNote}
                    >
                        ELIMINAR
                    </button>
                </div>
            </div>
        </div>
    )
}

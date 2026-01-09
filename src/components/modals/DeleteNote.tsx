import type { INote } from "../../screens/agenda/agenda";
import useNoteStore from "../../store/useNoteStore";

export default function DeleteNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { deleteNote } = useNoteStore(state => state) 

    const handleDeleteNote = () => {
        deleteNote(note.id)
        closeModal()
    }

    return (
        <div className="w-full h-full fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
            <div className="p-8 bg-neutral-700 rounded-xl text-white flex flex-col justify-center items-center gap-10">
                <p className="text-center">
                    Estas seguro que quieres eliminar de forma PERMANENTE la anotación:
                    <div className="text-lg font-medium mt-2 flex gap-3 justify-center">
                        <h3>{note.assignature}</h3>
                        <h3>{note.title}</h3>
                        <h3>{note.limitDate}</h3>
                    </div>
                </p>

                <div className="w-full flex justify-between">
                    <button className="w-28 py-1 rounded-lg text-sm bg-neutral-800 text-white cursor-pointer" onClick={closeModal}>CANCELAR</button>
                    <button className="w-28 py-1 rounded-lg text-sm bg-red-700 cursor-pointer" onClick={handleDeleteNote}>ELIMINAR</button>
                </div>
            </div>
        </div>
    )
}

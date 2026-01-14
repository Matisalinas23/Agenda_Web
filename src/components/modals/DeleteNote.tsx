import useDate from "../../hooks/useDate";
import type { INote } from "../../screens/agenda/agenda";
import useNoteStore from "../../store/useNoteStore";
import { ButtonCancelSmall } from "../ButtonCancel";

export default function DeleteNote({ note, closeModal }: { note: INote, closeModal: () => void }) {
    const { deleteNote } = useNoteStore(state => state)
    const { formatDate } = useDate()

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
                        <h3>{formatDate(note.limitDate)}</h3>
                    </div>
                </p>

                <div className="w-full flex justify-between">
                    <ButtonCancelSmall onClick={closeModal} />
                    <button
                        className="w-24 py-1 bg-red-700 font-medium cursor-pointer rounded-xl duration-200 hover:bg-red-500"
                        onClick={handleDeleteNote}
                    >
                        ELIMINAR
                    </button>
                </div>
            </div>
        </div>
    )
}

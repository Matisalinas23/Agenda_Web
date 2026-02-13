import type { INote } from "../interfaces/notes";
import FilterNotes from "./OrderNotes";
import Nota from "./Nota";
import { useState } from "react";
import useDate from "../hooks/useDate";

export default function NotesList({ notes }: { notes: INote[] }) {
    const [noteId, setNoteId] = useState<number | null>(null);
    const { toInputDate } = useDate();

    return (
        <div className="w-1/2 flex flex-col gap-4">
            <FilterNotes />
            {notes.length === 0
                ? <p>No hay notas</p>
                : <ul className="h-102 w-full overflow-y-auto px-4 flex flex-col gap-4">
                    {notes.map((note) => {
                        const initialValues = {
                            title: note.title,
                            assignature: note.assignature,
                            description: note.description,
                            color: note.color,
                            limitDate: toInputDate(note.limitDate),
                        }

                        return (
                            <Nota key={note.id} note={note} setNoteId={setNoteId} noteId={noteId} initialValues={initialValues} />
                        )
                    })}
                </ul>
            }
        </div>
    )
}

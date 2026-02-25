import type { ICreateNote, INote } from "../interfaces/notes.interface";
import FilterNotes from "./OrderNotes";
import Nota from "./Nota";
import { useState } from "react";
import useDate from "../hooks/useDate";
import EditNote from "./EditNote";

const NoteItem = ({ note }) => {
    const [isEditingNote, setIsEditingNote] = useState<boolean>(false);
    const { toInputDate } = useDate();

    const initialValues: ICreateNote = {
        title: note.title,
        assignature: note.assignature,
        description: note.description,
        color: note.color,
        limitDate: toInputDate(note.limitDate),
    }

    if (isEditingNote) return (
        <EditNote
            initialValues={initialValues}
            setIsEditingNote={setIsEditingNote}
            note={note}
        />
    )

    return (
        <Nota
            note={note}
            setIsEditingNote={setIsEditingNote}
        />
    );
}

export default function NotesList({ notes }: { notes: INote[] }) {
    if (notes.length === 0) return (
        <div className="w-1/2 flex flex-col gap-4">
            <p>No hay notas</p>
        </div>
    )

    return (
        <div className="w-1/2 flex flex-col gap-4">
            <FilterNotes />
            <ul className="h-102 w-full overflow-y-auto px-4 flex flex-col gap-4">
                {notes.map((note) => <NoteItem key={note.id} note={note} />)}
            </ul>
        </div>
    )
}

import type { INote } from "../interfaces/notes";
import FilterNotes from "./OrderNotes";
import Nota from "./Nota";

export default function NotesList({ notes }: { notes: INote[] }) {
    return (
        <div className="w-1/2 flex flex-col gap-4">
            <FilterNotes />
            {notes.length === 0
                ? <p>No hay notas</p>
                : <ul className="h-102 w-full overflow-y-auto px-4 flex flex-col gap-4">
                    {notes.map((note, index) => (
                        <Nota key={index + 1} note={note} />
                    ))}
                </ul>
            }
        </div>
    )
}

import type { INote } from "../screens/agenda/agenda";
import FilterNotes from "./OrderNotes";
import Nota from "./Nota";

export default function NotesList({ notes }: { notes: INote[] }) {
    return (
        <div className="w-1/2 flex flex-col gap-4">
            <FilterNotes />
            {notes.length === 0
                ? <p>No hay notas</p>
                : <ul className="h-100 w-full overflow-y-auto pr-4 flex flex-col gap-2">
                    {notes.map((note, index) => (
                        <Nota key={index + 1} note={note} />
                    ))}
            </ul>
            }
        </div>
    )
}

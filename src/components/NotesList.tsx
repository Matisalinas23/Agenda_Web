import type { INote } from "../screens/agenda/agenda";
import Nota from "./Nota";

export default function NotesList({ notes }: { notes: INote[] }) {
    return (
        <>
            {notes.length === 0
                ? <p>No hay notas</p>
                : <ul className="h-100 overflow-y-auto pr-4 w-1/2 flex flex-col gap-2">
                    {notes.map((note, index) => (
                        <Nota key={index + 1} note={note} />
                    ))}
            </ul>
            }
        </>
    )
}

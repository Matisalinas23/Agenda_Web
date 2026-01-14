import type { INote } from "../screens/agenda/agenda";
import Nota from "./Nota";

export default function NotesList({ notes }: { notes: INote[] }) {
    return (
        <>
            {notes.length === 0
                ? <p>No hay notas</p>
                : <ul className="w-1/2">
                    {notes.map((note, index) => (
                        <Nota key={index + 1} note={note} />
                    ))}
            </ul>
            }
        </>
    )
}

import type { INote } from "../screens/agenda/agenda";

export default function Nota({ nota }: { nota: INote }) {
    const handleEditNote = () => {

    }

    return (
        <li className="w-full p-4 mb-4 rounded-2xl text-white flex justify-between" style={{ backgroundColor: nota.color, color: nota.textColor }}>
            <h2>{nota.title}</h2>
            <p>{nota.title}</p>
            <p>{nota.limitDate}</p>
            <div className="w-2/10">
                <button className="w-1/2 h-full bg-white/33 cursor-pointer hover:bg-white/66" onClick={handleEditNote}>E</button>
                <button className="w-1/2 h-full bg-white/33 cursor-pointer hover:bg-red-500">X</button>
            </div>
        </li>
    )
}

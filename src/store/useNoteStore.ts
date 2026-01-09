import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { INote } from "../screens/agenda/agenda";

interface INoteStore {
    notes: INote[]
    setNotes: (notes: INote[]) => void
    addNote: (note: INote) => void
}

const useNoteStore = create<INoteStore>()(
    persist(
        (set) => ({
            notes: [],
            setNotes: (notes: INote[]) => set({ notes }),
            addNote: (note) => set((state) => ({ notes: [...state.notes, note] }))
        }),
        {
            name: "notes"
        }
    )
)

export default useNoteStore
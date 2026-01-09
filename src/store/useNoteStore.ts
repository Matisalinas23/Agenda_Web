import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { INote } from "../screens/agenda/agenda";

interface INoteStore {
    notes: INote[]
    setNotes: (notes: INote[]) => void
    addNote: (note: INote) => void
    editNote: (updatedNote: INote) => void
    deleteNote: (id: number) => void
}

const useNoteStore = create<INoteStore>()(
    persist(
        (set) => ({
            notes: [],
            setNotes: (notes: INote[]) => set({ notes }),
            addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
            editNote: (updatedNote) => set((state) => ({
                notes: state.notes.map((note) => note.id === updatedNote.id ? updatedNote : note)
            })),
            deleteNote: (id) => set((state) => ({
                notes: state.notes.filter((note) => note.id !== id )
            }))
        }),
        {
            name: "notes"
        }
    )
)

export default useNoteStore
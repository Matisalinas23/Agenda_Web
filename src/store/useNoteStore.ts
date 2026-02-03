import { create } from "zustand";
import type { INote } from "../screens/agenda/agenda";

interface INoteStore {
    notes: INote[]
    orderedNotes: INote[]
    setNotes: (notes: INote[]) => void
    addNote: (note: INote) => void
    editNote: (updatedNote: INote) => void
    deleteNote: (id: number) => void
    setOrderedNotesByAssignature: (orderedNotesByAssignature: INote[]) => void
    setOrderedNotesByDate: (orderedNotesByDate: INote[]) => void
}

const useNoteStore = create<INoteStore>((set) => ({
    notes: [],
    orderedNotes: [],
    setNotes: (notes: INote[]) => set({ notes }),
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    editNote: (updatedNote) => set((state) => ({
        notes: state.notes.map((note) => note.id === updatedNote.id ? updatedNote : note)
    })),
    deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id )
    })),
    setOrderedNotesByAssignature: (orderedNotesByAssignature) => (set({ orderedNotes: orderedNotesByAssignature })),
    setOrderedNotesByDate: (orderedNotesByDate) => (set({ orderedNotes: orderedNotesByDate })),
}))

export default useNoteStore
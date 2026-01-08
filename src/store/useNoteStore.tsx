import { create } from "zustand";
import type { INote } from "../screens/agenda/agenda";

interface INoteStore {
    notes: INote[]
    setNotes: (notes: INote[]) => void

}

const useNote = create<INoteStore>((set) => ({
    notes: [],
    setNotes: (notes: INote[]) => set({ notes })
}))

export default useNote
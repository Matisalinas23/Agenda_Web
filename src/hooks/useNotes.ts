import type { IFormValues, INote } from "../screens/agenda/agenda"
import useNoteStore from "../store/useNoteStore"
import { createNoteHttp, deleteNoteHttp, getAllNotesHttp, orderNotesByAssignatureHttp, updateNoteHttp } from "../data/http/notes"



export const useNotes = () => {
    const { setNotes, addNote, editNote, deleteNote, setOrderedNotesByAssignature } = useNoteStore(state => state)

    const getAllNotes = async (): Promise<boolean> => {
        const notes: INote[] = await getAllNotesHttp()

        if (!notes) return false

        setNotes(notes)
        
        return true
    }

    const createNote = async (formValues: IFormValues): Promise<boolean> => {
        const note: INote = await createNoteHttp(formValues)

        if (!note) return false

        addNote(note)
        
        return true
    }

    const updateNote = async (id: number, formValues: IFormValues): Promise<boolean> => {
        const updatedNote = await updateNoteHttp(id, formValues)

        if (!updatedNote) return false

        editNote(updatedNote)

        return true
    }

    const removeNote = async (id: number): Promise<boolean> => {
        const deletedNote = await deleteNoteHttp(id)

        if (!deletedNote) return false

        deleteNote(id)

        return true
    }

    const orderNotesByAssignature = async (): Promise<boolean> => {
        const orderedNotes = await orderNotesByAssignatureHttp()

        if (!orderedNotes) return false

        setOrderedNotesByAssignature(orderedNotes)

        return true
    }

    return {
        getAllNotes,
        createNote,
        updateNote,
        removeNote,
        orderNotesByAssignature,
    }
}
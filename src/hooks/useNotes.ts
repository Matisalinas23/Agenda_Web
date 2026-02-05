import useNoteStore from "../store/useNoteStore"
import { createNoteHttp, deleteNoteHttp, getAllNotesHttp, orderNotesByAssignatureHttp, orderNotesByDateHttp, updateNoteHttp } from "../data/http/notes"
import type { ICreateNote, INote } from "../interfaces/notes"



export const useNotes = () => {
    const {
        setNotes,
        addNote,
        editNote,
        deleteNote,
        setOrderedNotesByAssignature,
        setOrderedNotesByDate,
    } = useNoteStore(state => state)

    const getAllNotes = async (): Promise<boolean> => {
        const notes: INote[] = await getAllNotesHttp()

        if (!notes) return false

        setNotes(notes)
        
        return true
    }

    const createNote = async (formValues: ICreateNote): Promise<boolean> => {
        const note: INote = await createNoteHttp(formValues)

        if (!note) return false

        addNote(note)
        
        return true
    }

    const updateNote = async (id: number, formValues: ICreateNote): Promise<boolean> => {
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

    const orderNotesByDate = async (): Promise<boolean> => {
        const orderedNotes = await orderNotesByDateHttp()

        if (!orderedNotes) return false

        setOrderedNotesByDate(orderedNotes)

        return true
    }

    return {
        getAllNotes,
        createNote,
        updateNote,
        removeNote,
        orderNotesByAssignature,
        orderNotesByDate,
    }
}
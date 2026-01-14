import type { IFormValues, INote } from "../screens/agenda/agenda"
import useNoteStore from "../store/useNoteStore"
import { createNoteHttp, getAllNotesHttp, updateNoteHttp } from "../data/http/notes"



export const useNotes = () => {
    const { setNotes, addNote, editNote } = useNoteStore(state => state)

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

    const updatedNote = async (id: number, formValues: IFormValues): Promise<boolean> => {
        const updatedNote = await updateNoteHttp(id, formValues)

        if (!updatedNote) return false

        editNote(updatedNote)

        return true
    }

    return {
        getAllNotes,
        createNote,
        updatedNote,
    }
}
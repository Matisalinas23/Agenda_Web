import type { IFormValues, INote } from "../screens/agenda/agenda"
import useNoteStore from "../store/useNoteStore"
import { createNoteHttp, getAllNotesHttp } from "../data/http/notes"



export const useNotes = () => {
    const { setNotes, addNote } = useNoteStore(state => state)

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

    return {
        getAllNotes,
        createNote,
    }
}
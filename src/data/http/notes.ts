import type { IFormValues, INote } from "../../screens/agenda/agenda"
import api from "./axios"

const notesUrl = "/notes"

export const getAllNotesHttp = async (): Promise<INote[]> => {
    try {
        const res = await api.get(notesUrl)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createNoteHttp = async (formValues: IFormValues): Promise<INote> => {
    try {
        const res = await api.post(notesUrl, formValues)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateNoteHttp = async (id: number, updatedNote: IFormValues): Promise<INote> => {
    try {
        const res = await api.put(`${notesUrl}/${id}`, updatedNote)

        console.log(res.data)
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteNoteHttp = async (id: number): Promise<INote> => {
    try {
        const res = await api.delete(`/${id}`)
        return res.data.note
    } catch (error) {
        console.log(error)
    }
}

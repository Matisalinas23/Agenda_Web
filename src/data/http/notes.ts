import type { ICreateNote, INote } from "../../interfaces/notes"
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

export const createNoteHttp = async (formValues: ICreateNote, userId: number): Promise<INote> => {
    const { assignature, title, description, color, limitDate } = formValues
    const [year, month, day] = limitDate.split("-").map(Number)

    try {
        const res = await api.post(`${notesUrl}/${userId}`, {
            title,
            assignature,
            description,
            color,
            limitDate: new Date(year, month - 1, day)
        })
        return res.data
    } catch (error) {
        console.error("Error creating a note", error.response.data)
    }
}

export const updateNoteHttp = async (id: number, updatedNote: ICreateNote): Promise<INote> => {
    const { assignature, title, description, color, limitDate } = updatedNote
    const [year, month, day] = limitDate.split("-").map(Number)

    try {
        const res = await api.put(`${notesUrl}/${id}`, {
            assignature,
            title,
            description,
            color,
            limitDate: new Date(year, month - 1, day)
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteNoteHttp = async (id: number): Promise<INote> => {
    try {
        const res = await api.delete(`${notesUrl}/${id}`)
        return res.data.note
    } catch (error) {
        console.log(error)
    }
}

export const orderNotesByAssignatureHttp = async (): Promise<INote[]> => {
    try {
        const res = await api.get(`${notesUrl}/orderByAssignature`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const orderNotesByDateHttp = async (): Promise<INote[]> => {
    try {
        const res = await api.get(`${notesUrl}/orderByDate`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

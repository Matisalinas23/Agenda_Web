import type { INote } from "../../screens/agenda/agenda"

export interface IUser {
    id: number
    email: string
    username: string
    password: string
    createdAt: Date
    notes: INote[]
}
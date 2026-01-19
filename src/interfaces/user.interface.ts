import type { INote } from "../screens/agenda/agenda" 

export interface ILoginUser {
    email: string
    password: string
}

export interface IUser extends ILoginUser {
    id: number
    username: string
    createdAt: Date
    notes: INote[]
}

export interface IPayloadAuth {
    userId: number
    email: string
    username: string
    profileImage: string | null
    iat: number
    exp: number
}
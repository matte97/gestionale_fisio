export interface Therapie {
    id: number,
    user_id: number,
    name: string,
    color:string
}

export interface CreateTherapiePayload {
    name: string,
    color:string
}

export type UpdateTherapiesPayload = Partial<CreateTherapiePayload>
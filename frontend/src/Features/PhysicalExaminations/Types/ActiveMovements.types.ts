export interface ActiveMovements {
    id: number,
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type CreateActiveMovementsPayload = {
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type UpdateActiveMovementsPayload = Partial<CreateActiveMovementsPayload>;

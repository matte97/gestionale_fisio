export interface AccessoryPassiveMovements {
    id: number,
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type CreateAccessoryPassiveMovementsPayload = {
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type UpdateAccessoryPassiveMovementsPayload = Partial<CreateAccessoryPassiveMovementsPayload>;

export type PassivePhysiologicalMovements = {
    id: number,
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type CreatePassivePhysiologicalMovementsPayload = {
    physical_examination_id: number,
    movement: string,
    range_quality: string,
    pain: number
}

export type UpdatePassivePhysiologicalMovementsPayload = Partial<CreatePassivePhysiologicalMovementsPayload>;
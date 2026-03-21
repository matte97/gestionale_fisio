export interface Session {
  id: number;
  appointment_id: number;
  notes: string;
}

export type CreateSessionPayload = {
  notes: string;
};

export type UpdateSessionPayload = Partial<CreateSessionPayload>;

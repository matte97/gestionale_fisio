export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  token_type: "bearer";
};

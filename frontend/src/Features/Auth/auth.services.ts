import axiosClient from "../../Api/axiosClient";
import { LoginPayload, LoginResponse } from "./auth.types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await axiosClient.post<LoginResponse>("/login", payload);
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
}

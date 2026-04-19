import { useState } from "react";
import axiosClient from "../../../Api/axiosClient";
import { LoginForm } from "./LoginForm";

function Login() {
  const [error, setError] = useState<{ email?: string[]; password?: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await axiosClient.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      } else if (err.response?.data?.message) {
        setError({ email: [err.response.data.message] });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} error={error} isLoading={isLoading} />;
}

export default Login;

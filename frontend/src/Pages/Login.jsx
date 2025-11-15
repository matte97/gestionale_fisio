import { useState } from "react";
import axiosClient from "../Api/axiosClient";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post("/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.token);

            console.log("token")

            window.location.href = "/dashboard"
        } catch (err) {
            setError("Credenziali non valide")
        }
    };


    return (
        <>
            <div className="w-full min-h-screen bg-gradient-to-br from-zinc-700 to-indigo-600 flex justify-center items-center">
                <div className="w-96 flex flex-col bg-white p-6 rounded-lg shadow-md gap-4">
                    <h2 className="text-2xl font-bold text-center">
                        Accedi
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-md p-2"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-md p-2"
                        />

                        <button type="submit">
                            Accedi
                        </button>
                    </form>

                </div>

            </div>
        </>
    );
}

export default Login;
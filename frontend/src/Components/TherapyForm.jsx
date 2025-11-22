import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";

export default function TherapyForm({ therapy, mode, onSaved }) {

    const [form, setForm] = useState({
        name: therapy?.name || "",
        color: therapy?.color || "#000000",
    });

    useEffect(() => {
        setForm({
            name: therapy?.name || "",
            color: therapy?.color || "#000000",
        });
    }, [therapy]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "create") {
                await axiosClient.post("/therapies", form);
            } else {
                await axiosClient.put(`/therapies/${therapy.id}`, form);
            }

            onSaved();
        } catch (err) {
            console.error(err);
            alert("Errore nel salvataggio.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <h2 className="text-xl font-semibold">
                {mode === "create" ? "Nuova terapia" : "Modifica terapia"}
            </h2>

            <div>
                <label>Nome</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                />
            </div>

            <div>
                <label>Colore</label>
                <input
                    type="color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="w-16 h-10 p-1 border rounded-md cursor-pointer"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Salva
            </button>
        </form>
    );
}

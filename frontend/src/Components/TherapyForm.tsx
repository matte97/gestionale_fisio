import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";

type Therapy = {
    id?: number;
    name: string;
    color: string;
};

type Props = {
    therapy: Therapy | null;
    mode: "create" | "edit";
    onSaved: () => void;
};

export default function TherapyForm({ therapy, mode, onSaved }: Props) {

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-bold text-gray-800">
                    {mode === "create" ? "Nuova Terapia" : "Modifica Terapia"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Configura i parametri della prestazione per l'archivio.</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex flex-col w-full">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Denominazione</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Es. Tecarterapia"
                        className="w-full h-10 border border-gray-300 rounded-lg shadow-sm px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="block mb-1 text-sm font-medium text-gray-700">Etichetta Colore</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="color"
                            name="color"
                            value={form.color}
                            onChange={handleChange}
                            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer bg-white"
                        />
                        <span className="text-sm text-gray-500 font-mono">{form.color.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
                >
                    Salva Terapia
                </button>
            </div>
        </form>
    );
}

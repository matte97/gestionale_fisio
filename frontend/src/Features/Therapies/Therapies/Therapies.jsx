import { useEffect, useState } from "react";
import axiosClient from "../../Api/axiosClient";
import TherapyForm from "../../Components/TherapyForm";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Therapies() {
    const [therapies, setTherapies] = useState([]);
    const [selectedTherapy, setSelectedTherapy] = useState(null);
    const [mode, setMode] = useState("none"); // none | edit | create

    useEffect(() => {
        loadTherapies();
    }, []);

    const loadTherapies = async () => {
        try {
            const res = await axiosClient.get("/therapies");
            setTherapies(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelect = (therapy) => {
        setSelectedTherapy(therapy);
        setMode("edit");
    };

    const handleCreate = () => {
        setSelectedTherapy(null);
        setMode("create");
    };

    const handleSaved = () => {
        loadTherapies();
        setSelectedTherapy(null);
        setMode("none");
    };

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/therapies/${id}`);
            setTherapies(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full h-[85vh] flex gap-4 p-4">

            {/* 📌 COLONNA SINISTRA — TABELLA TERAPIE */}
            <div className="w-1/2 h-full bg-white rounded-lg shadow p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Elenco Terapie</h2>
                    <button
                        onClick={handleCreate}
                        className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        + Nuova
                    </button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="p-2">Nome</th>
                            <th className="p-2">Colore</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {therapies.map((t) => (
                            <tr
                                key={t.id}
                                className="border-b hover:bg-indigo-100 cursor-pointer"
                                onClick={() => handleSelect(t)}
                            >
                                <td className="p-2">{t.name}</td>
                                <td className="p-2">
                                    <div
                                        className="w-5 h-5 rounded-full border"
                                        style={{ backgroundColor: t.color }}
                                    ></div>
                                </td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(t.id);
                                        }}
                                        className="bg-red-500 text-white text-center w-16 flex justify-center items-center rounded-md p-2"
                                    >
                                        <FaRegTrashAlt className="text-md" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 📌 COLONNA DESTRA — FORM DINAMICO */}
            <div className="w-2/3 h-full bg-white rounded-lg shadow p-4 overflow-y-auto">

                {mode === "none" && (
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <span>Seleziona una terapia o premi “Nuova”.</span>
                    </div>
                )}

                {mode === "edit" && (
                    <TherapyForm
                        therapy={selectedTherapy}
                        mode="edit"
                        onSaved={handleSaved}
                    />
                )}

                {mode === "create" && (
                    <TherapyForm
                        therapy={null}
                        mode="create"
                        onSaved={handleSaved}
                    />
                )}

            </div>

        </div>
    );
}

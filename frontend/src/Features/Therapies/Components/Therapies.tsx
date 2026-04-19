import { useEffect, useState } from "react";
import axiosClient from "../../../Api/axiosClient";
import TherapyForm from "./TherapyForm";
import { FaRegTrashAlt } from "react-icons/fa";
import { Pagination } from "../../../Shared/Components/Pagination";

type Therapy = {
    id: number;
    name: string;
    color: string;
    [key: string]: any;
};

export function Therapies() {
    const [therapiesData, setTherapiesData] = useState<any>(null);
    const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);
    const [mode, setMode] = useState<"none" | "edit" | "create">("none");

    const loadTherapies = async (page: number = 1) => {
        try {
            const res = await axiosClient.get("/therapies", { params: { page } });
            console.log("DEBUG THERAPIES DATA:", res.data);
            setTherapiesData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadTherapies();
    }, []);

    const handleSelect = (therapy: Therapy) => {
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

    const handleDelete = async (id: number) => {
        try {
            await axiosClient.delete(`/therapies/${id}`);
            loadTherapies(); // Reload to refresh list and pagination
            if (selectedTherapy?.id === id) {
                setMode("none");
                setSelectedTherapy(null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in flex flex-col h-full overflow-hidden">

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex shrink-0 justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Elenco Terapie Erogabili</h2>
                    <p className="text-sm text-gray-500 mt-1">Gestisci la nomenclature visiva delle tue terapie in archivio.</p>
                </div>
            </div>

            <div className="flex w-full flex-1 gap-6 min-h-0">
                <div className="w-1/2 h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                        <h2 className="text-lg font-bold text-gray-800">Archivio Terapie</h2>
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-indigo-600 text-sm font-bold text-white shadow-sm hover:shadow-md rounded-lg hover:bg-indigo-700 transition"
                        >
                            + Nuova Terapia
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="text-xs text-gray-400 uppercase bg-white border-b border-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 font-semibold tracking-wider">Identificativo</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider text-center">Colore Visuale</th>
                                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Azioni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {therapiesData?.data.map((t: any) => (
                                    <tr
                                        key={t.id}
                                        className={`cursor-pointer transition-colors group ${selectedTherapy?.id === t.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                                        onClick={() => handleSelect(t)}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                                        <td className="px-6 py-4 flex justify-center">
                                            <div
                                                className="w-6 h-6 rounded-full shadow-sm border border-gray-200 ring-2 ring-white"
                                                style={{ backgroundColor: t.color }}
                                            ></div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(t.id);
                                                }}
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors inline-flex opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            >
                                                <FaRegTrashAlt className="text-base" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {(!therapiesData || therapiesData.data.length === 0) && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-12 text-center italic text-gray-400">
                                            Nessuna terapia censita a sistema.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination */}
                    {therapiesData?.meta && (
                        <div className="bg-white border-t border-gray-100">
                             <Pagination
                                currentPage={therapiesData.meta.current_page}
                                lastPage={therapiesData.meta.last_page}
                                total={therapiesData.meta.total}
                                from={therapiesData.meta.from}
                                to={therapiesData.meta.to}
                                onPageChange={(p) => loadTherapies(p)}
                            />
                        </div>
                    )}
                </div>

                <div className="w-1/2 h-full flex flex-col">
                    {mode === "none" && (
                        <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 italic">
                            <span>Seleziona una terapia dall'archivio o premi "+ Nuova Terapia".</span>
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
        </div>
    );
}

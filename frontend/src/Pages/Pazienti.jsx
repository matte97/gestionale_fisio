import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";

function Pazienti() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const getPazienti = async () => {
            try {
                const res = await axiosClient.get("/patients");
                setPatients(res.data.data);
                console.log(res.data);
            } catch (err) {
                console.error("Errore nel caricamento della dashboard: ", err);
            }
        };

        getPazienti();

    }, [])

    const handleDelete = async (id) => {
        try {
            await axiosClient.delete(`/patients/${id}`);
            setPatients(prev => prev.filter(p => p.id !== id));
        }catch(err){
            console.log(err);
        }
    }



    return (
        <>
            <div className="w-full h-full p-4 flex flex-row justify-center items-center">
                <div className="overflow-x-auto">
                    <table className="min-w-[700px] bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-3 text-left">Nome</th>
                                <th className="px-6 py-3 text-left">Cognome</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Cellulare</th>
                                <th className="px-6 py-3 text-left">Genere</th>
                                <th className="px-6 py-3 text-left"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {patients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-100 transition">
                                    <td className="px-6 py-4">{patient.first_name}</td>
                                    <td className="px-6 py-4">{patient.last_name}</td>
                                    <td className="px-6 py-4">{patient.email}</td>
                                    <td className="px-6 py-4">{patient.phone}</td>
                                    <td className="px-6 py-4">{patient.gender}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-between items-center gap-2">
                                            <button
                                        className="w-24 bg-blue-600 text-center text-white text-md rounded-md p-2"
                                        >
                                            Modifica
                                        </button>
                                        <button
                                        className="w-24 bg-red-600 text-center text-white text-md rounded-md p-2"
                                        onClick={() => handleDelete(patient.id)}
                                        >
                                            Elimina
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default Pazienti;
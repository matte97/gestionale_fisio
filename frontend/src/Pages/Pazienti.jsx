import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import ActionButton from "../Components/ActionButton";

function Pazienti() {

    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

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
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = (id) => {
        navigate(`/patients/${id}/edit`);
        console.log('premi');
    }

    const goToPatientHistory = (id) => {
        navigate(`/patients/${id}/patient_history`);
    }

    const goToEditPatientHistory = (id) => {
        navigate(`/patients/${id}/patient_history/edit`);
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
                                            <ActionButton
                                                label={"Modifica"}
                                                onClick={() => handleUpdate(patient.id)}
                                            />
                                            <ActionButton
                                                label={"Elimina"}
                                                onClick={() => handleDelete(patient.id)}
                                            />
                                            { patient.history == null ?
                                                <button
                                                    className="w-24 bg-green-500 text-center text-white text-md rounded-md p-2"
                                                    onClick={() => goToPatientHistory(patient.id)}
                                                >
                                                    Crea
                                                </button> :
                                                <button
                                                    className="w-24 bg-green-500 text-center text-white text-md rounded-md p-2"
                                                    onClick={() => goToEditPatientHistory(patient.id)}
                                                >
                                                    Modifica
                                                </button>
                                            }
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
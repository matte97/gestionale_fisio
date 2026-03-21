import { FiFileText } from "react-icons/fi";
import ActionButton from "../../../Shared/Components/ActionButton";
import { useNavigate } from "react-router-dom";
import { useDeletePatients } from "../hooks/useDeletePatient";
import { Patient } from "../patients.type";

type Props = {
  patients: Patient[];
};

function PatientTable({ patients }: Props) {
  const navigate = useNavigate();
  const { mutate: deletePatient } = useDeletePatients();

  const handleDelete = (id: number) => {
    deletePatient(id);
  };

  const goToPatientRecord = (id:number) => {
    navigate(`/pazienti/${id}/record`);
  } 

  return (
    <table className="w-full text-left text-sm text-gray-500 min-w-[800px]">
      <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100">
        <tr>
          <th className="px-6 py-4 font-semibold tracking-wider">Paziente</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Email</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Contatto</th>
          <th className="px-6 py-4 font-semibold tracking-wider">Genere</th>
          <th className="px-6 py-4 font-semibold tracking-wider text-right">Azioni</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <tr key={patient.patient_id} className="hover:bg-indigo-50/30 transition-colors group bg-white">
              <td className="px-6 py-4">
                <div className="font-bold text-gray-900">{patient.first_name} {patient.last_name}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {patient.email || <span className="text-gray-300 italic">Nessuna email</span>}
              </td>
              <td className="px-6 py-4">
                <span className="bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-md text-xs tracking-wide">
                  {patient.phone || "N/D"}
                </span>
              </td>
              <td className="px-6 py-4">
                {patient.gender === 'M' && <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold w-6 inline-block text-center">M</span>}
                {patient.gender === 'F' && <span className="bg-pink-50 text-pink-600 px-2 py-1 rounded-md text-xs font-bold w-6 inline-block text-center">F</span>}
                {patient.gender !== 'M' && patient.gender !== 'F' && <span className="text-gray-400 px-2 py-1">{patient.gender}</span>}
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <ActionButton
                    label="Modifica"
                    onClick={() => navigate(`${patient.patient_id}/dettaglio`)}
                  />
                  <ActionButton
                    label={<FiFileText className="text-xl" />}
                    onClick={() => goToPatientRecord(patient.patient_id)}
                  />
                  <ActionButton
                    label="Elimina"
                    onClick={() => handleDelete(patient.patient_id)}
                  />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-6 py-12 text-center text-gray-500 bg-white">
              Nessun paziente trovato corrispondente ai filtri.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PatientTable;

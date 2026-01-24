import { FiFileText } from "react-icons/fi";
import ActionButton from "./ActionButton";

function PatientTable({patients, goToPatientRecord}) {
  return (
    <>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
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
            <tr
              key={patient.patient_id}
              className="hover:bg-gray-100 transition"
            >
              <td className="px-6 py-1">{patient.first_name}</td>
              <td className="px-6 py-1">{patient.last_name}</td>
              <td className="px-6 py-1">{patient.email}</td>
              <td className="px-6 py-1">{patient.phone}</td>
              <td className="px-6 py-1">{patient.gender}</td>
              <td className="px-6 py-1">
                <div className="flex justify-between items-center gap-2">
                  <ActionButton
                    label={"Modifica"}
                    onClick={() => handleUpdate(patient.patient_id)}
                  />
                  <ActionButton
                    label={"Elimina"}
                    onClick={() => handleDelete(patient.patient_id)}
                  />
                  <ActionButton
                    label={<FiFileText className="text-2xl" />}
                    onClick={() => goToPatientRecord(patient.patient_id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PatientTable;

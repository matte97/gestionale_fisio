import { useEffect, useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import CardAnamnesis from "../../Components/CardAnamnesis";

function PatientRecord() {
  const { patientId } = useParams();
  const [anamnesis, setAnamnesis] = useState([]);
  useEffect(() => {
    const getAnamnesis = async () => {
      try {
        const res = await axiosClient.get(`/patients/${patientId}/anamnesis`);
        setAnamnesis(res.data.data);
      } catch (err) {}
    };

    getAnamnesis();
  }, []);

  const navigate = useNavigate();

  const [appointmentSession, setAppointmentSession] = useState([]);

  useEffect(() => {
    if (!patientId) return;

    const getSession = async () => {
      try {
        const res = await axiosClient.get("/appointments_sessions", {
          params: {
            patient_id: patientId,
          },
        });

        setAppointmentSession(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    getSession();
  }, [patientId]);

  console.log(appointmentSession);

  const goToPatientHistory = async () => {
    try {
      const res = await axiosClient.post("/anamnesis", {
        patient_id: patientId,
      });
      const anamnesisId = res.data.data.id;
      navigate(`/anamnesi/${anamnesisId}/prossima`);
    } catch (err) {
      console.error("ERRORE", err);
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-row gap-2 p-1">
        <div className="w-1/2 h-full flex flex-col rounded-lg shadow-lg">
          <h2 className="text-center text-lg">Schede anamnestiche</h2>
          <div className="grid grid-cols-3 gap-4 p-1">
            {anamnesis.map((r) => (
              <CardAnamnesis key={r.id} id={r.id} />
            ))}
            <CardAnamnesis key="new" isNew={true} click={goToPatientHistory} />
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col rounded-lg shadow-lg p-2">
          <h2 className="text-center text-lg">Sedute</h2>
          <div className="w-full h-full p-2">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                <tr>
                  <th>Appuntamento</th>
                  <th>Sessione</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointmentSession.map((session) => (
                  <tr
                    key={appointmentSession.id}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4">{session.id_appuntamento}</td>
                    <td className="px-6 py-4">{session.id_sessione}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientRecord;

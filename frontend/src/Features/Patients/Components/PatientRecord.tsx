import { useEffect, useState } from "react";
import axiosClient from "../../../Api/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import CardAnamnesis from "./CardAnamnesis";

type AnamnesisRecord = {
    id: number;
    [key: string]: any;
};

type SessionRecord = {
    id_appuntamento: number | string;
    id_sessione: number | string;
    [key: string]: any;
};

export function PatientRecord() {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();

  const [anamnesis, setAnamnesis] = useState<AnamnesisRecord[]>([]);
  const [appointmentSession, setAppointmentSession] = useState<SessionRecord[]>([]);

  useEffect(() => {
    const getAnamnesis = async () => {
      try {
        const res = await axiosClient.get(`/patients/${patientId}/anamnesis`);
        setAnamnesis(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if(patientId) getAnamnesis();
  }, [patientId]);

  useEffect(() => {
    const getSession = async () => {
      try {
        const res = await axiosClient.get("/appointments_sessions", {
          params: { patient_id: patientId },
        });
        setAppointmentSession(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    if(patientId) getSession();
  }, [patientId]);

  const goToPatientHistory = () => {
      navigate(`/anamnesi`);   
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* HEADER CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex shrink-0 flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-xl font-bold text-gray-800">Cartella Clinica Paziente #{patientId}</h2>
           <p className="text-sm text-gray-500 mt-1">Esamina lo storico clinico, le indagini mediche e le sessioni di trattamento completate.</p>
        </div>
      </div>

      <div className="flex w-full flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* CARD ANAMNESI */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
            <h2 className="text-lg font-bold text-gray-800">Schede Anamnestiche</h2>
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {anamnesis.map((r, idx) => (
                <CardAnamnesis key={`anamnesis-${r.id}-${idx}`} id={r.id} isNew={false} click={() => {}} />
              ))}
              <CardAnamnesis key="new" id={-1} isNew={true} click={goToPatientHistory} />
            </div>
          </div>
        </div>

        {/* SEDUTE STORICO */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 shrink-0">
             <h2 className="text-lg font-bold text-gray-800">Fatturato Trattamenti e Storico Sedute</h2>
          </div>
          
          <div className="w-full overflow-y-auto flex-1 bg-white">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-white border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider sticky top-0">
                <tr>
                  <th className="px-6 py-4 font-semibold">TKT Appuntamento (#)</th>
                  <th className="px-6 py-4 font-semibold">TKT Sessione Trattamento (#)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {appointmentSession.length > 0 ? (
                    appointmentSession.map((session, idx) => (
                      <tr
                        key={`session-${idx}`}
                        className="hover:bg-gray-50 transition-colors bg-white font-medium"
                      >
                        <td className="px-6 py-4 text-indigo-600">APP-{session.id_appuntamento}</td>
                        <td className="px-6 py-4 text-gray-900">SESS-{session.id_sessione}</td>
                      </tr>
                    ))
                ) : (
                    <tr>
                       <td colSpan={2} className="px-6 py-12 text-center italic text-gray-400">
                          Il paziente non ha ancora registrato sedute in archivio.
                       </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

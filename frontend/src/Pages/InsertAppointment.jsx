import { useEffect, useState } from "react";
import axiosClient from "../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";

function InsertAppointment() {
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState({
    patient_id: '',
    date: "",
    start_hour: "",
    end_hour: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const start_time = `${appointment.date} ${appointment.start_hour}:00`;
      const end_time = `${appointment.date} ${appointment.end_hour}:00`;
      
      await axiosClient.post("/appointments", {
        patient_id: appointment.patient_id,
        start_time,
        end_time,
        notes: appointment.notes,
        therapy_type: "standard",
        status: "scheduled",
      });

      navigate("/calendario");
    } catch (err) {
      console.log(err);
      setError("Errore durante la creazione dell'appuntamento");
    } finally {
      setLoading(false);
    }
  };

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const res = await axiosClient.get("/patients");
        setPatients(res.data.data);
      } catch (err) {
        console.log("Errore nel caricamento pazienti:", err);
      }
    };

    loadPatients();
  }, []);

  return (
    <div className="flex justify-center items-start p-4 w-full h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xl bg-white rounded-lg shadow h-full"
      >
        {/* HEADER STICKY */}
        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-center">
            Inserisci appuntamento
          </h2>

          {error && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
              {error}
            </div>
          )}
        </div>

        {/* AREA SCORREVOLE */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Paziente */}
          <InputField
            label="Paziente"
            name="patient_id"
            type="select"
            value={appointment.patient_id}
            onChange={handleChange}
            options={patients.map((p) => ({
              value: p.id,
              label: `${p.first_name} ${p.last_name}`
            }))}
          />

          {/* Data */}
          <InputField
            label="Data"
            name="date"
            type="date"
            value={appointment.date}
            onChange={handleChange}
          />

          {/* Ora inizio / Ora fine */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Ora inizio"
              name="start_hour"
              type="time"
              step="900"
              value={appointment.start_hour}
              onChange={handleChange}
            />
            <InputField
              label="Ora fine"
              name="end_hour"
              type="time"
              step="900"
              value={appointment.end_hour}
              min={appointment.start_hour}
              onChange={handleChange}
            />
          </div>

          {/* Note */}
          <InputField
            label="Note"
            name="notes"
            type="textarea"
            value={appointment.notes}
            onChange={handleChange}
          />

        </div>

        {/* FOOTER STICKY */}
        <div className="p-4 border-t bg-white sticky bottom-0 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-40 py-2 rounded-md bg-blue-600 text-white text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Salvando..." : "Inserisci"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InsertAppointment;

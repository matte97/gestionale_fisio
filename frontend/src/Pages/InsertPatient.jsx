import { useState } from "react";
import axiosClient from "../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";

function InsertPatient() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: "",
    occupation: "",
    sports_hobbies: "",
    marital_status: "",
    diagnosis: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosClient.post("/patients", patient);
      navigate("/pazienti");
    } catch (err) {
      console.log(err);
      setError("Errore durante l'inserimento del paziente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start p-4 w-full h-[85vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xl bg-white rounded-lg shadow h-full"
      >
        {/* HEADER STICKY */}
        <div className="p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-center">
            Inserisci nuovo paziente
          </h2>

          {error && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
              {error}
            </div>
          )}
        </div>

        {/* AREA SCORREVOLE */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Nome e Cognome */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Nome"
              name="first_name"
              value={patient.first_name}
              onChange={handleChange}
            />
            <InputField
              label="Cognome"
              name="last_name"
              value={patient.last_name}
              onChange={handleChange}
            />
          </div>

          {/* Indirizzo / Email */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Indirizzo"
              name="address"
              value={patient.address}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={patient.email}
              onChange={handleChange}
            />
          </div>

          {/* Data nascita / Telefono */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Data di nascita"
              name="birth_date"
              type="date"
              value={patient.birth_date}
              onChange={handleChange}
            />
            <InputField
              label="Telefono"
              name="phone"
              type="tel"
              value={patient.phone}
              onChange={handleChange}
            />
          </div>

          {/* Sesso / Occupazione */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Sesso"
              name="gender"
              type="select"
              value={patient.gender}
              onChange={handleChange}
              options={[
                { value: "M", label: "Maschio" },
                { value: "F", label: "Femmina" },
                { value: "other", label: "Altro" },
              ]}
            />
            <InputField
              label="Occupazione"
              name="occupation"
              value={patient.occupation}
              onChange={handleChange}
            />
          </div>

          {/* Sport / Stato civile */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Sport e Hobby"
              name="sports_hobbies"
              value={patient.sports_hobbies}
              onChange={handleChange}
            />
            <InputField
              label="Stato civile"
              name="marital_status"
              type="select"
              value={patient.marital_status}
              onChange={handleChange}
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Sposato/a" },
                { value: "divorced", label: "Divorziato/a" },
                { value: "widowed", label: "Vedovo/a" },
              ]}
            />
          </div>

          {/* Diagnosi */}
          <InputField
            label="Diagnosi"
            name="diagnosis"
            type="textarea"
            value={patient.diagnosis}
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

export default InsertPatient;

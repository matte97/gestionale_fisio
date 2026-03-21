import { useState } from "react";
import PatientTable from "./Components/PatientTable";
import { usePatientsList } from "./hooks/usePatientsList";
import { useNavigate } from "react-router-dom";

export function PatientListPage() {
  const navigate = useNavigate();
  // Stato per i filtri
  const [filters, setFilters] = useState({ first_name: "" });

  // Hook custom con TanStack Query
  const { data: patients, isLoading, error } = usePatientsList(filters);

  console.log(patients);

  // Gestione input filtri
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Rendering condizionale
  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in pb-10">
      
      {/* Title & Filters Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Elenco Pazienti</h2>
          <p className="text-sm text-gray-500 mt-1">Gestisci e cerca i profili dei tuoi pazienti in archivio.</p>
        </div>
        
        <div className="relative w-full md:w-72 mt-2 md:mt-0">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            name="first_name"
            value={filters.first_name}
            placeholder="Cerca nome paziente..."
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm flex-1"
          />
        </div>
      </div>

      {/* Tabella pazienti */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <PatientTable patients={patients || []} />
        </div>
      </div>
    </div>
  );
}

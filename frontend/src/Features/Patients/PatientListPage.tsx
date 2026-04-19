import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";
import PatientTable from "./Components/PatientTable";
import { usePatientsList } from "./hooks/usePatientsList";
import { Pagination } from "../../Shared/Components/Pagination";
import { PatientFilters } from "./patients.services";

export function PatientListPage() {
  const [page, setPage] = useState(1);
  
  // State for the actual filters used in the API call
  const [filters, setFilters] = useState<PatientFilters>({
    search: "",
    gender: "",
    birth_year: "",
    diagnosis: ""
  });

  // State for the input values in the UI (for immediate responsiveness)
  const [inputValues, setInputValues] = useState<PatientFilters>(filters);

  const { data: patientsData, isLoading, error } = usePatientsList(page, filters);

  // Debounced function to update the filters state
  const debouncedSetFilters = useMemo(
    () =>
      debounce((newFilters: PatientFilters) => {
        setFilters(newFilters);
        setPage(1);
      }, 500),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetFilters.cancel();
    };
  }, [debouncedSetFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 1. Update local input state immediately for UI responsiveness
    const newValues = {
      ...inputValues,
      [name]: value,
    };
    setInputValues(newValues);

    // 2. Update the actual filters used for API call
    if (e.target.tagName === "SELECT") {
      // For selects, update immediately
      setFilters(newValues);
      setPage(1);
    } else {
      // For text inputs, use debounce
      debouncedSetFilters(newValues);
    }
  };

  const handleClearFilters = () => {
    const emptyFilters = {
      search: "",
      gender: "",
      birth_year: "",
      diagnosis: ""
    };
    setInputValues(emptyFilters);
    setFilters(emptyFilters);
    setPage(1);
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-medium">Caricamento pazienti...</div>;
  if (error) return <div className="p-8 text-center text-red-500 font-medium">Errore: {error.message}</div>;

  const isFiltered = Object.values(filters).some(val => val !== "");

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-fade-in h-full overflow-hidden">

      {/* Title & Filters Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Elenco Pazienti</h2>
            <p className="text-sm text-gray-500 mt-1">Gestisci e cerca i profili dei tuoi pazienti in archivio.</p>
          </div>

          {isFiltered && (
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Pulisci filtri
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Global */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              value={inputValues.search}
              placeholder="Cerca nome, email, tel..."
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Diagnosis Filter */}
          <div className="relative">
            <input
              type="text"
              name="diagnosis"
              value={inputValues.diagnosis}
              placeholder="Filtra per diagnosi..."
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Gender Filter */}
          <select
            name="gender"
            value={inputValues.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
          >
            <option value="">Tutti i generi</option>
            <option value="M">Maschio</option>
            <option value="F">Femmina</option>
            <option value="Altro">Altro</option>
          </select>

          {/* Birth Year Filter */}
          <input
            type="number"
            name="birth_year"
            value={inputValues.birth_year}
            placeholder="Anno di nascita (es. 1985)"
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Tabella pazienti */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="overflow-y-auto flex-1">
          <PatientTable patients={patientsData?.data || []} />
        </div>

        {/* Pagination */}
        {patientsData && (
          <Pagination
            currentPage={patientsData.current_page}
            lastPage={patientsData.last_page}
            total={patientsData.total}
            from={patientsData.from}
            to={patientsData.to}
            onPageChange={(p) => setPage(p)}
          />
        )}
      </div>
    </div>
  );
}

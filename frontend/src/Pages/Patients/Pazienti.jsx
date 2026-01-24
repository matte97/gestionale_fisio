import { useEffect, useMemo, useState } from "react";
import axiosClient from "../../Api/axiosClient";
import { useNavigate } from "react-router-dom";
import { usePatients } from "./usePatients";
import PatientTable from "../../Components/PatientTable";
import Pagination from "../../Components/Pagination";

function Pazienti() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
  first_name: '',
  last_name: '',
});

const [page, setPage] = useState(1);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFilters(prev => ({
    ...prev,
    [name]: value,
  }));
};

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

const debouncedFilters = useDebounce(filters, 500);

useEffect(() => {
  setPage(1);
}, [debouncedFilters]);

const { data: patientsData, isLoading } =
  usePatients(debouncedFilters, page);
console.log(patientsData);
const patients = patientsData?.data ?? [];

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const goToPatientRecord = (id) => {
    navigate(`/patients/${id}/record`);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full h-full flex flex-col justify-around gap-4">
        <div className="w-full flex flex-col p-2 gap-2">
          <div>
            <h2>Filtri</h2>
          </div>
          <div className="w-full flex flex-1 flex-row gap-2">
            <input
              type="text"
              name="first_name"
              value={filters.first_name}
              placeholder="Cerca nome paziente"
              onChange={handleChange}
              className="border-2 rounded-lg"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <PatientTable
            patients = {patients}
            goToPatientRecord={goToPatientRecord}
          />
        </div>
        <Pagination
        currentPage={patientsData?.current_page ?? 1}
        lastPage={patientsData?.last_page ?? 1}
        nextPageUrl={patientsData?.next_page_url}
        prevPageUrl={patientsData?.prev_page_url}
        onPageChange={setPage}
      />
      </div>
    </>
  );
}

export default Pazienti;

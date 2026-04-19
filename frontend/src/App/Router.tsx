import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../Features/Auth/Components/Login";
import { Dashboard } from "../Features/Dashboard/Components/Dashboard";
import { Calendar } from "../Features/Calendar/Components/Calendar";
import { Therapies } from "../Features/Therapies/Components/Therapies";
import { PatientRecord } from "../Features/Patients/Components/PatientRecord";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { PatientListPage } from "../Features/Patients/Components/PatientListPage";
import { EditPatientPage } from "../Features/Patients/Components/EditPatientPage";
import { CreatePatientPage } from "../Features/Patients/Components/CreatePatientPage";
import { CreateAppointmentPage } from "../Features/Appointments/Components/CreateAppointmentPage";
import { EditAppointmentPage } from "../Features/Appointments/Components/EditAppointmentPage";
import { CreatePastHistoryPage } from "../Features/PastHistory/Components/CreatePastHistoryPage";
import { AnamnesisWizard } from "../Features/Anamnesis/Components/AnamnesiWizard";

type RouterProps = {
  token: string | null;
};

export function Router({ token }: RouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/"
          element={token ? <DashboardLayout /> : <Navigate to="/" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pazienti" element={<PatientListPage />} />
          <Route path="pazienti/:id/dettaglio" element={<EditPatientPage/>} />
          <Route path="patients/add" element={<CreatePatientPage />} />
          <Route path="appointments/add" element={<CreateAppointmentPage />} />
          <Route path="appointments/:id" element={<EditAppointmentPage />} />
          <Route path="calendario" element={<Calendar />} />
          <Route path="terapie" element={<Therapies />} />

          {/*Rotte scheda paziente*/}
          <Route
            path="/pazienti/:patientId/record"
            element={<PatientRecord />}
          />

          {/*Rotte scheda anamnestica*/}
          <Route
            path="/pazienti/:patientId/anamnesi"
            element={<AnamnesisWizard/>}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

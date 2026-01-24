import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import Pazienti from './Pages/Patients/Pazienti';
import EditPatient from './Pages/Patients/EditPatient';
import Calendar from './Pages/Calendar/Calendar';
import InsertPatient from './Pages/Patients/InsertPatient';
import InsertAppointment from './Pages/Appointments/InsertAppointment';
import Therapies from './Pages/Therapies/Therapies';
import InsertPatientHistory from './Pages/PatientHistory/InsertPatientHistory';
import EditPatientHistory from './Pages/PatientHistory/EditPatientHistory';
import InsertPastHistory from './Pages/PastHistory/InsertPastHistory';
import EditPastHistory from './Pages/PastHistory/EditPastHistory';
import ConditionAssessmentCreatePage from './Pages/ConditionAssessment/ConditionAssessmentCreatePage';
import ConditionAssessmentEditPage from './Pages/ConditionAssessment/ConditionAssessmentEditPage';
import PatientRecord from './Pages/Patients/PatientRecord';

function App() {
  const token = localStorage.getItem("token");

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
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="pazienti" element={<Pazienti/>} />
          <Route path="patients/:id/edit" element={<EditPatient/>} />
          <Route path="patients/add" element={<InsertPatient/>} />
          <Route path="appointments/add" element={<InsertAppointment/>} />
          <Route path="calendario" element={<Calendar/>} />
          <Route path="terapie" element={<Therapies/>} />

          {/*Rotte scheda paziente*/}
          <Route path="/patients/:patientId/record" element={<PatientRecord/>} />

          {/*Rotte scheda anamnestica*/}
          <Route path="/anamnesi/:idAnamnestica/prossima" element={<InsertPatientHistory/>} />          
          <Route path="/anamnesi/:idAnamnestica/remota" element={<InsertPastHistory/>} />
          <Route path="/anamnesi/:idAnamnestica/valutazione" element={<ConditionAssessmentCreatePage/>} />
          
          {/*Rotte scheda anamnestica edit */}
          <Route path="/anamnesi/:idAnamnestica/prossima/edit" element={<EditPatientHistory/>} />
          <Route path="/anamnesi/:idAnamnestica/remota/edit" element={<EditPastHistory/>} />
          <Route path="/anamnesi/:idAnamnestica/valutazione/edit" element={<ConditionAssessmentEditPage/>} />

        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;

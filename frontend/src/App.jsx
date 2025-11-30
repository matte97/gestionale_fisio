import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import Pazienti from './Pages/Pazienti';
import EditPatient from './Pages/EditPatient';
import Calendar from './Pages/Calendar';
import InsertPatient from './Pages/InsertPatient';
import InsertAppointment from './Pages/InsertAppointment';
import Therapies from './Pages/Therapies';
import InsertPatientHistory from './Pages/InsertPatientHistory';
import EditPatientHistory from './Pages/EditPatientHistory';

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
          <Route path="patients/:id/patient_history" element={<InsertPatientHistory/>} />
          <Route path="patients/:id/patient_history/edit" element={<EditPatientHistory/>} />
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;

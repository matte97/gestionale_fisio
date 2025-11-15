import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import DashboardLayout from './Layout/DashboardLayout';
import Pazienti from './Pages/Pazienti';

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
        </Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;

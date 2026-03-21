import { useEffect, useState } from "react";
import axiosClient from "../../../Api/axiosClient";
import { FaUserFriends, FaCalendarCheck, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";

type DashboardStats = {
  totalPatients?: number;
  todayAppointments?: number;
  monthlyRevenue?: number;
  [key: string]: any;
};

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await axiosClient.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Errore nel caricamento della dashboard: ", err);
      } finally {
        setLoading(false);
      }
    };
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Caricamento cruscotto operativo...</p>
      </div>
    );
  }

  // Fallback values if backend isn't ready
  const totalPatients = stats?.totalPatients || stats?.totale_pazienti || 0;
  const todayAppointments = stats?.todayAppointments || stats?.appuntamenti_oggi || 0;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-fade-in pb-10">
      
      {/* 1. KPI WIDGETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FaUserFriends className="text-2xl" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <FaArrowUp className="text-xs" /> 12%
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Pazienti Totali</h3>
          <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <FaCalendarCheck className="text-2xl" />
            </div>
            <span className="flex items-center gap-1 text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
              <FaArrowUp className="text-xs" /> 4 Nuovi
            </span>
          </div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Appuntamenti Oggi</h3>
          <p className="text-3xl font-bold text-gray-900">{todayAppointments}</p>
        </div>

      </div>

      {/* 2. RECENT ACTIVITY SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT BLOCK: Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800">Prossimi Appuntamenti</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">Vedi Calendario</button>
          </div>
          <div className="p-6 flex flex-col gap-4">
            {todayAppointments === 0 ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCalendarCheck className="text-2xl text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">Nessun appuntamento in programma per oggi.</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Elenco appuntamenti da recuperare tramite API...</p>
            )}
          </div>
        </div>

        {/* RIGHT BLOCK: Latest Patients */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800">Pazienti Recenti</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">Esplora Pazienti</button>
          </div>
          <div className="p-6 flex flex-col gap-4">
            <div className="text-center py-10 px-4">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUserFriends className="text-2xl text-gray-300" />
                </div>
              <p className="text-gray-500 font-medium">I dati dei pazienti recenti verranno mostrati qui.</p>
            </div>
          </div>
        </div>

      </div>

      {/* JSON DEBUGGER TO HELP THE USER */}
      {stats && Object.keys(stats).length > 0 && (
        <div className="mt-8 p-6 bg-gray-900 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
          <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
            👨‍💻 Backend Schema Debugger
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Questo riquadro è visibile solo perché abbiamo trovato dei dati non strutturati. Ecco il JSON esatto restituito dall'API <code className="bg-gray-800 text-yellow-200 px-1 py-0.5 rounded">/dashboard</code> in modo che tu possa allineare i campi:
          </p>
          <pre className="bg-gray-950 p-4 rounded-lg text-green-400 text-xs overflow-x-auto shadow-inner font-mono">
            {JSON.stringify(stats, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}

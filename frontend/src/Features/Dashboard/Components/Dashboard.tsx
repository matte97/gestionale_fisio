import { useEffect, useState } from "react";
import { FaUserFriends, FaCalendarCheck, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { getDashboardData } from "../Services/dashboard.services";

type DashboardStats = {
  total_patients?: number;
  today_appointments?: number;
  new_patients_this_month?: number;
  new_patients_last_month?: number;
  patients_this_month?: number;
};

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const res = await getDashboardData();
        setStats(res);
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

  // 🔢 DATI BASE
  const totalPatients = stats?.total_patients || 0;
  const todayAppointments = stats?.today_appointments || 0;

  const newPatients = stats?.new_patients_this_month || 0;
  const lastMonthPatients = stats?.new_patients_last_month || 0;
  const patientsThisMonth = stats?.patients_this_month || 0;

  // 📊 % NUOVI PAZIENTI
  const newPatientsPercentage = patientsThisMonth
    ? Math.round((newPatients / patientsThisMonth) * 100)
    : 0;

  // 📈 CRESCITA
  const growth = lastMonthPatients
    ? Math.round(((newPatients - lastMonthPatients) / lastMonthPatients) * 100)
    : 0;

  const isGrowthPositive = growth >= 0;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-fade-in h-full overflow-y-auto pr-2 custom-scrollbar">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PAZIENTI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <FaUserFriends className="text-2xl" />
            </div>

            <span className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-md ${isGrowthPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
              }`}>
              {isGrowthPositive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
              {Math.abs(growth)}%
            </span>
          </div>

          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
            Pazienti Totali
          </h3>

          <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>

          <p className="text-sm text-gray-500 mt-2">
            {newPatients} nuovi ({newPatientsPercentage}% del mese)
          </p>
        </div>

        {/* APPUNTAMENTI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <FaCalendarCheck className="text-2xl" />
            </div>

            <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
              {newPatients} nuovi pazienti
            </span>
          </div>

          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
            Appuntamenti Oggi
          </h3>

          <p className="text-3xl font-bold text-gray-900">{todayAppointments}</p>
        </div>

      </div>

      {/* SEZIONI SOTTO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* APPUNTAMENTI */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800">Prossimi Appuntamenti</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Vedi Calendario
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            {todayAppointments === 0 ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCalendarCheck className="text-2xl text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">
                  Nessun appuntamento in programma per oggi.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Elenco appuntamenti da recuperare tramite API...
              </p>
            )}
          </div>
        </div>

        {/* PAZIENTI RECENTI */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800">Pazienti Recenti</h2>
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Esplora Pazienti
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserFriends className="text-2xl text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">
                I dati dei pazienti recenti verranno mostrati qui.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../Api/axiosClient";
import {
  FaCalendarPlus,
  FaHome,
  FaRegCalendarAlt,
  FaUserPlus,
} from "react-icons/fa";
import { CiLogout, CiViewList } from "react-icons/ci";
import { IoListOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout");
    } catch (err) {
      console.log("Errore durante il logout: ", err);
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  const goToAddPatient = () => {
    navigate("/patients/add");
  };

  const goToAddAppointment = () => {
    navigate("/appointments/add");
  };

  const getSidenavLinkStyle = (path: string) => {
    const isActive = pathname.startsWith(path) && path !== "/" || (path === "/dashboard" && pathname === "/dashboard");
    return `w-full flex w-20 flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all font-medium mx-auto ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;
  };

  const getPageTitle = () => {
    if (pathname.includes("/dashboard")) return "Dashboard Overview";
    if (pathname.includes("/pazienti") || pathname.includes("/patients")) return "Gestione Pazienti";
    if (pathname.includes("/calendario") || pathname.includes("/appointments")) return "Calendario Appuntamenti";
    if (pathname.includes("/terapie")) return "Lista Terapie";
    if (pathname.includes("/anamnesi")) return "Tracking Anamnesi";
    return "Bentornato";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 font-sans">
      {/* SIDEBAR NARROW W-24 */}
      <aside className="w-24 flex-shrink-0 bg-gray-900 text-white flex flex-col shadow-2xl z-20 items-center">
        
        {/* BRAND / LOGO AREA */}
        <div className="h-20 flex items-center justify-center w-full border-b border-gray-800 shrink-0">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <span className="text-2xl font-black tracking-tighter text-white">F</span>
          </div>
        </div>
        
        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto py-6 w-full flex flex-col gap-4 items-center custom-scrollbar">
          
          <Link to="/dashboard" className={getSidenavLinkStyle("/dashboard")}>
            <FaHome className="text-2xl shrink-0" />
            <span className="text-[11px]">Dashboard</span>
          </Link>

          <Link to="/calendario" className={getSidenavLinkStyle("/calendario")}>
            <FaRegCalendarAlt className="text-2xl shrink-0" />
            <span className="text-[11px]">Calendario</span>
          </Link>
          
          <Link to="/pazienti" className={getSidenavLinkStyle("/pazienti")}>
            <IoPersonOutline className="text-2xl shrink-0" />
            <span className="text-[11px]">Pazienti</span>
          </Link>

          <div className="w-12 border-t border-gray-800 my-2"></div>

          <Link to="/terapie" className={getSidenavLinkStyle("/terapie")}>
            <IoListOutline className="text-2xl flex-shrink-0" />
            <span className="text-[11px]">Terapie</span>
          </Link>
          
          <button className={`w-20 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all font-medium mx-auto text-gray-400 hover:bg-gray-800 hover:text-white`}>
            <IoSettingsOutline className="text-2xl shrink-0" />
            <span className="text-[11px]">Opzioni</span>
          </button>
        </nav>

        {/* LOGOUT FOOTER */}
        <div className="p-3 border-t border-gray-800 bg-gray-900 w-full shrink-0 flex justify-center">
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex flex-col items-center justify-center gap-1 w-20 p-2 rounded-xl bg-gray-800/50 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all text-gray-400 font-medium"
          >
            <CiLogout className="text-2xl" />
            <span className="text-[11px]">Esci</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-20 flex-shrink-0 bg-white/70 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-8 z-10 sticky top-0 shadow-sm/50">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex gap-4 items-center">
            <button
              onClick={goToAddPatient}
              className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-lg font-bold hover:bg-indigo-100 hover:shadow-md transition-all border border-indigo-100"
            >
              <FaUserPlus className="text-lg" /> 
              <span className="hidden sm:inline">Nuovo Paziente</span>
            </button>
            
            <button
              onClick={goToAddAppointment}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md"
            >
              <FaCalendarPlus className="text-lg" /> 
              <span className="hidden sm:inline">Nuovo Appuntamento</span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT (SCROLLABLE OUTLET) */}
        <main className={`flex-1 ${pathname.includes("/anamnesi") || pathname.includes("/pazienti") || pathname.includes("/dashboard") ? "overflow-hidden" : "overflow-y-auto"} p-4 sm:p-8 relative z-0`}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}

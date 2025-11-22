import { Link, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../Api/axiosClient";
import { FaCalendarPlus, FaHome, FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";
import { CiLogout, CiViewList } from "react-icons/ci";
import { IoListOutline, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import { TfiRuler } from "react-icons/tfi";

export default function DashboardLayout() {



    const handleLogout = async () => {
        try {
            await axiosClient.post("/logout");
        } catch (err) {
            console.log("Errore durante il logout: ", err)
        } finally {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }

    const navigate = useNavigate();

    const goToAddPatient = () => {
        navigate('/patients/add');
    }

    const goToAddAppointment = () => {
        navigate('/appointments/add');
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            <div className="flex min-h-screen">
                <aside className="w-28 mt-10 text-white flex flex-col gap-4 p-2 bg-indigo-600">
                    <nav className="w-full flex flex-col gap-4">
                        <Link
                            to="/dashboard"
                            className="w-full rounded-md hover:bg-indigo-900 flex flex-col items-center justify-center p-2"
                        >
                            <FaHome className="text-2xl" />
                            <span className="text-[13px] mt-1">Dashboard</span>
                        </Link>

                        <Link
                            to="/pazienti"
                            className="w-full rounded-md hover:bg-indigo-900 flex flex-col items-center justify-center p-2"
                        >
                            <CiViewList className="text-2xl" />
                            <span className="text-[13px] mt-1">Pazienti</span>
                        </Link>

                        <Link
                            to="/calendario"
                            className="w-full rounded-md hover:bg-indigo-900 flex flex-col items-center justify-center p-2"
                        >
                            <FaRegCalendarAlt className="text-2xl" />
                            <span className="text-[13px] mt-1">Calendario</span>
                        </Link>
                        <div className="w-full flex flex-col items-center">

                            <div
                                className="w-full rounded-md hover:bg-indigo-900 flex flex-col items-center justify-center p-2 cursor-pointer"
                                onClick={handleOpen}
                            >
                                <IoSettingsOutline className="text-2xl" />
                                <span className="text-[13px] mt-1">Impostazioni</span>
                            </div>

                            <div className={`w-full flex flex-col mt-1 ${isOpen ? 'block' : 'hidden'}`}>
                                <Link
                                    to="/terapie"
                                    className="w-full rounded-md hover:bg-indigo-900 flex flex-col items-center justify-center p-2"
                                >
                                    <IoListOutline className="text-2xl" />
                                    <span className="text-[13px] mt-1">Terapie</span>
                                </Link>
                            </div>

                        </div>

                    </nav>
                    <button
                        onClick={handleLogout}
                        className="mt-auto rounded-md hover:bg-indigo-900 text-center text-lg flex items-center justify-center p-2"
                    >
                        <CiLogout className="text-2xl" />
                    </button>
                </aside>
                <header className="text-white">
                    <nav className="w-full h-10 bg-indigo-600 fixed top-0 left-0 flex items-center justify-between px-6 py-1">
                        <div className="">

                        </div>
                        <div className="ml-auto h-full flex flex-row items-center gap-2">
                            <button
                                className="flex items-center gap-1 text-center p-1 rounded-md hover:bg-indigo-900 transition"
                                onClick={goToAddPatient}
                            >
                                <FaUserPlus size={20} />
                                <span className="text-xs font-light">Aggiungi paziente</span>
                            </button>

                            <button
                                className="flex items-center gap-1 text-center p-1 rounded-md hover:bg-indigo-900 transition"
                                onClick={goToAddAppointment}
                            >
                                <FaCalendarPlus size={20} />
                                <span className="text-xs font-light">Aggiungi appuntamento</span>
                            </button></div>
                    </nav>
                </header>
                <main className="flex-1 flex flex-col min-h-0 p-2 mt-10 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
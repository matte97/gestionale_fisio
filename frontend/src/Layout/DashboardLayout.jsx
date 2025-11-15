import { Link, Outlet } from "react-router-dom";
import axiosClient from "../Api/axiosClient";

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

    return (
        <>
            <div className="flex min-h-screen">
                <aside className="w-28 mt-10 text-white flex flex-col gap-4 p-2 bg-indigo-600">
                    <nav className="w-full flex flex-col gap-4">
                        <Link
                            to="/dashboard"
                            className="w-full rounded-md hover:bg-indigo-900 text-center text-lg"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/pazienti"
                            className="w-full rounded-md hover:bg-indigo-900 text-center text-lg"
                        >
                            Pazienti
                        </Link>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="mt-auto rounded-md hover:bg-indigo-900 text-center text-lg"
                    >
                        Logout
                    </button>
                </aside>
                <header className="text-white">
                    <nav className="w-full h-10 bg-indigo-600 fixed top-0 left-0 flex items-center justify-between px-6 py-1">
                        <div className="">

                        </div>
                        <div className="ml-auto h-full flex flex-row items-center gap-2">
                            <button className="text-center p-1 rounded-md hover:bg-indigo-900 transition">Aggiungi paziente</button>
                            <button className="text-center p-1 rounded-md hover:bg-indigo-900 transition">Aggiungi appuntamento</button>
                        </div>
                    </nav>
                </header>
                <main className="flex-1 p-2 mt-10">
                    <Outlet />
                </main>
            </div>
        </>
    );
}
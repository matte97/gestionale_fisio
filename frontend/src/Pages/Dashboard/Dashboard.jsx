import { useEffect, useState } from "react";
import axiosClient from "../../Api/axiosClient";

function Dashboard() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const res = await axiosClient.get("/dashboard");
                setStats(res.data);
            } catch (err) {
                console.error("Errore nel caricamento della dashboard: ", err);
            }
        };

        getDashboard();

    }, [])

    console.log(stats);

    return (
        <>
            <div className="w-full h-full flex flex-col">
                <div className="w-full flex flex-row p-2 gap-4">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;
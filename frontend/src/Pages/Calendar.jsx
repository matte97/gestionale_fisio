import {
    Calendar as BigCalendar,
    dateFnsLocalizer,
    Views,
} from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { it } from "date-fns/locale";

import { useEffect, useMemo, useState } from "react";
import axiosClient from "../Api/axiosClient";

import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizzazione
const locales = { it };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

// Mappa appuntamenti → eventi del calendario
function mapAppointmentsToEvents(appointments = []) {
    return appointments.map((a) => ({
        id: a.id,
        title: a.notes,
        start: new Date(a.start_time),
        end: new Date(a.end_time),
    }));
}

export default function Calendar() {
    const [calendar, setCalendar] = useState([]);
    const [view, setView] = useState(Views.WEEK);
    const [date, setDate] = useState(new Date());

    // Carico gli appuntamenti dal backend
    useEffect(() => {
        const getCalendar = async () => {
            try {
                const res = await axiosClient.get("/appointments");
                setCalendar(res.data.data);
            } catch (err) {
                console.error("Errore nel caricamento appuntamenti:", err);
            }
        };

        getCalendar();
    }, []);

    const events = useMemo(
        () => mapAppointmentsToEvents(calendar),
        [calendar]
    );

    // Per debug: vedi se React-Big-Calendar chiama questi handler
    const handleViewChange = (nextView) => {
        console.log("Cambio view:", nextView);
        setView(nextView);
    };

    const handleNavigate = (nextDate, _view, action) => {
        console.log("Navigate:", { nextDate, view: _view, action });
        setDate(nextDate);
    };

    return (
        <div className="w-full h-[85vh] p-2 overflow-hidden flex flex-col">
            <h1 className="mb-2 shrink-0">Calendario appuntamenti</h1>

            <div className="w-full flex-1 min-h-0">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={view}
                    onView={handleViewChange}
                    date={date}
                    onNavigate={handleNavigate}
                    views={["month", "week", "day"]}
                    style={{ height: "100%" }}
                    culture="it"
                    min={new Date(2020, 1, 1, 7, 0)}
                    max={new Date(2020, 1, 1, 20, 1)}
                    step={30}
                    timeslots={1}
                    messages={{
                        today: "Oggi",
                        previous: "Indietro",
                        next: "Avanti",
                        month: "Mese",
                        week: "Settimana",
                        day: "Giorno",
                        agenda: "Agenda",
                    }}
                />
            </div>
        </div>
    );
}

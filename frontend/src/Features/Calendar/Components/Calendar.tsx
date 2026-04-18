import { useEffect, useState } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
} from '@schedule-x/calendar';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { createScrollControllerPlugin } from '@schedule-x/scroll-controller';
import '@schedule-x/theme-default/dist/index.css';
import axiosClient from '../../../Api/axiosClient';
import { format } from 'date-fns';
import { useAppointmentsList } from '../../Appointments/Hooks/useAppointmentsList';

type ScheduleXEvent = {
    id: string;
    title: string;
    start: string; // "YYYY-MM-DD hh:mm"
    end: string;
};

export function Calendar() {
    const [events, setEvents] = useState<ScheduleXEvent[]>([]);
    const { data: appointments } = useAppointmentsList();

    const calendar = useCalendarApp({
        locale: 'it-IT',
        views: [createViewDay(), createViewWeek(), createViewMonthGrid()],
        defaultView: 'week',
        events: [], // Starts empty, populated strictly via events.set()
        dayBoundaries: {
            start: '07:00',
            end: '21:00',
        },
        weekOptions: {
            gridHeight: 1200,
        },
        callbacks: {
            onEventUpdate: async (updatedEvent: any) => {
                try {
                    await axiosClient.put(`/appointments/${updatedEvent.id}`, {
                        start_time: updatedEvent.start + ':00',
                        end_time: updatedEvent.end + ':00'
                    });
                } catch (e) {
                    console.error("Errore nel salvataggio evento", e);
                }
            }
        }
    }, [
        createDragAndDropPlugin(),
        createResizePlugin(),
        createScrollControllerPlugin({ initialScroll: '07:00' })
    ]);

    useEffect(() => {
        if (appointments && Array.isArray(appointments)) {
            const mappedEvents = appointments
                .filter((a: any) => a.start_time && a.end_time) // Reject corrupt entries
                .map((a: any) => {
                    // Safe parsing handling both ISO strings (T) and raw SQL times
                    let startStr = a.start_time;
                    let endStr = a.end_time;
                    
                    try {
                        if (startStr.includes('T')) {
                           startStr = format(new Date(startStr), 'yyyy-MM-dd HH:mm');
                        } else {
                           startStr = startStr.substring(0, 16); // Extract YYYY-MM-DD HH:mm
                        }
                        
                        if (endStr.includes('T')) {
                           endStr = format(new Date(endStr), 'yyyy-MM-dd HH:mm');
                        } else {
                           endStr = endStr.substring(0, 16);
                        }
                    } catch(e) {
                        return null; // Flag for internal filter
                    }

                    return {
                        id: String(a.id),
                        title: a.notes || "Appuntamento",
                        start: startStr,
                        end: endStr
                    };
                })
                .filter(Boolean); // Drop flagged exceptions
            
            calendar.events.set(mappedEvents);
        }
    }, [appointments]);

    return (
        <div className="w-full overflow-hidden animate-fade-in">
            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-y-auto sx-react-calendar-wrapper" style={{ height: 'calc(100vh - 150px)', minHeight: '500px' }}>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
    );
}

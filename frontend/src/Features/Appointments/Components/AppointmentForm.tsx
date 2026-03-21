import Input from "../../../Shared/Components/Input";
import { Select } from "../../../Shared/Components/Select";
import TextArea from "../../../Shared/Components/TextArea";
import { AppointmentFormData, CreateAppointmentPayload } from "../appointment.type";

type Props = {
  data: AppointmentFormData;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  patientsOptions: { value: string; label: string }[];
  therapiesOptions: { value: string; label: string }[];
  isLoading?: boolean;
  titolo: string;
  disabled:boolean;
};

const generateTimeOptions = (selectedDateStr?: string) => {
  const options = [];
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;
  
  // If no date is selected, assume today as a precaution for the time filter
  const isToday = !selectedDateStr || selectedDateStr === todayStr;
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (let i = 7; i <= 21; i++) {
    for (const m of ['00', '15', '30', '45']) {
      if (isToday) {
         if (i < currentHour || (i === currentHour && Number(m) <= currentMinute)) {
             continue;
         }
      }
      const hour = String(i).padStart(2, '0');
      options.push({ value: `${hour}:${m}`, label: `${hour}:${m}` });
    }
  }
  return options;
};


export function AppointmentForm({
  data,
  onChange,
  onSubmit,
  patientsOptions,
  therapiesOptions,
  isLoading,
  disabled,
  titolo
}: Props) {
  
  // Helper for today's date in YYYY-MM-DD
  const today = new Date();
  const todayMinStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-full"
      >
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <h2 className="text-lg font-bold text-gray-800">{titolo}</h2>
        </div>

        <div className="p-6 space-y-4 bg-white flex-1 overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Select
              label="Paziente"
              name="patient_id"
              value={String(data.patient_id)}
              onChange={onChange}
              options={patientsOptions}
            />
            
            <Select
              label="Terapia"
              name="therapy_id"
              value={String(data.therapy_id)}
              onChange={onChange}
              options={therapiesOptions}
            />

            <Input
              label="Data"
              name="date"
              type="date"
              min={todayMinStr}
              value={data.date}
              onChange={onChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Ora inizio"
                name="start_hour"
                value={data.start_hour}
                options={generateTimeOptions(data.date)}
                onChange={(name, value) => {
                  onChange(name, value);
                  if (value) {
                    const [h, m] = value.split(':').map(Number);
                    const endDate = new Date(2000, 1, 1, h + 1, m); 
                    const outH = String(endDate.getHours()).padStart(2, '0');
                    const outM = String(endDate.getMinutes()).padStart(2, '0');
                    onChange("end_hour", `${outH}:${outM}`);
                  }
                }}
              />

              <Select
                label="Ora fine"
                name="end_hour"
                value={data.end_hour}
                options={generateTimeOptions(data.date).filter(opt => opt.value > data.start_hour)}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="pt-2">
            <TextArea
               label="Note / Dettagli"
               name="notes"
               value={data.notes}
               onChange={onChange}
               rows={2}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || disabled}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salva Appuntamento
          </button>
        </div>
      </form>
    </div>
  );
}

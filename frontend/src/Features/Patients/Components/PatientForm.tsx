import Input from "../../../Shared/Components/Input";
import { CreatePatientPayload } from "../patients.type";
import { Select } from "../../../Shared/Components/Select";
import TextArea from "../../../Shared/Components/TextArea";

type Props = {
  data: CreatePatientPayload;
  onChange: (e: any) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  titolo: string;
};

export function PatientForm({
  data,
  onChange,
  onSubmit,
  isLoading,
  titolo,
}: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      <form
        className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 shrink-0">
          <h2 className="text-lg font-bold text-gray-800">{titolo}</h2>
        </div>

        <div className="px-6 py-4 space-y-4 bg-white">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Riga 1: Dati Base */}
            <Input label="Nome" name="first_name" value={data?.first_name} onChange={onChange} />
            <Input label="Cognome" name="last_name" value={data?.last_name} onChange={onChange} />
            <Input label="Data di nascita" name="birth_date" type="date" value={data?.birth_date} onChange={onChange} />
            <Select
              label="Sesso"
              name="gender"
              value={data?.gender}
              onChange={onChange}
              options={[
                { value: "M", label: "Maschio" },
                { value: "F", label: "Femmina" },
                { value: "Altro", label: "Altro" },
              ]}
            />

            {/* Riga 2: Contatti base */}
            <div className="md:col-span-2">
              <Input label="Indirizzo" name="address" value={data?.address} onChange={onChange} />
            </div>
            <Input label="Telefono" name="phone" type="tel" value={data?.phone} onChange={onChange} />
            <Input label="Email" name="email" type="email" value={data?.email} onChange={onChange} />

            {/* Riga 3: Profilo */}
            <Input label="Occupazione" name="occupation" value={data?.occupation} onChange={onChange} />
            <Select
              label="Stato civile"
              name="marital_status"
              value={data?.marital_status}
              onChange={onChange}
              options={[
                { value: "single", label: "Single" },
                { value: "married", label: "Sposato/a" },
                { value: "divorced", label: "Divorziato/a" },
                { value: "widowed", label: "Vedovo/a" },
              ]}
            />
            <div className="md:col-span-2">
              <Input label="Sport e Hobby" name="sports_hobbies" value={data?.sports_hobbies} onChange={onChange} />
            </div>
          </div>

          {/* Riga 4: Clinica */}
          <div className="pt-2">
            <TextArea
              label="Diagnosi / Note aggiuntive"
              name="diagnosis"
              onChange={onChange}
              rows={2}
              value={data?.diagnosis}
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 shrink-0 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Salva Paziente
          </button>
        </div>
      </form>
    </div>
  );
}

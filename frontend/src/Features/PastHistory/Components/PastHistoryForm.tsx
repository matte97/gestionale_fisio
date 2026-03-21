import ActionButton from "../../../Shared/Components/ActionButton";
import TextArea from "../../../Shared/Components/TextArea";
import { CreatePastHistoryPayload } from "../pastHistory.types";
import { pastHistoryFormLayout } from "../Utils/pastHistoryFormLayout";

type Props = {
  data: CreatePastHistoryPayload;
  onChange: (e: any) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  titolo: string;
  next?: () => void;
  prev?: () => void;
};

export default function PastHistoryForm({
  data,
  onChange,
  onSubmit,
  isLoading,
  titolo,
  next,
  prev,
}: Props) {
  const fields = pastHistoryFormLayout;
  return (
    <div className="flex justify-center flex-col items-start p-2 w-full h-[90vh]">
      <div className="w-full p-2 border-b bg-white sticky top-0 z-10">
        <div className="relative flex items-center justify-between">
          {/* Bottone Indietro */}
          <button
            type="button"
            onClick={prev}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          >
            ← Indietro
          </button>

          {/* Titolo centrato assoluto */}
          <h2 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
            {titolo}
          </h2>

          {/* Bottone Avanti */}
          <button
            type="button"
            onClick={next}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Avanti →
          </button>
        </div>
      </div>

      <div className="flex justify-center items-start p-1 w-full">
        <form
          className="flex flex-col w-full bg-white rounded-lg shadow h-full p-4"
          onSubmit={onSubmit}
        >
          {fields.map((row, rowIndex) => {
            const rowCount = row.length;
            const width = rowCount > 1 ? "w-full" : "w-1/2";
            return (
              <div key={rowIndex} className={`${width} flex gap-3 p-1`}>
                {row.map((line, lineIndex) => {
                  const key = `${rowIndex}-${lineIndex}`;
                  return (
                    <TextArea
                      label={line.label}
                      name={line.name}
                      onChange={onChange}
                      rows={2}
                      value={data[line.name]}
                      key={key}
                    />
                  );
                })}
              </div>
            );
          })}
        </form>
      </div>

      {/* FOOTER STICKY */}
      <div className="w-full p-2 bg-white sticky top-0 z-10">
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-40 py-2 rounded-md bg-blue-600 text-white text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}

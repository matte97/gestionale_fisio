import CheckboxWithInput from "../../../Shared/Components/CheckboxWithInput.tsx";
import Input from "../../../Shared/Components/Input";
import { Select } from "../../../Shared/Components/Select";
import TextArea from "../../../Shared/Components/TextArea";
import { PhysicalExaminationFormLayout } from "../../PhisycalExaminations/Utils/PhysicalExaminationFormLayout";
import { CreatePhysicaltherapyDiagnosisPayload } from "../PhysicalTherapyDiagnosis.types";
import { PhysicalTherapyDiagnosisFormLayout } from "../Utils/PhysicalTherapyDiagnosisFormLayout";

type Props = {
  data: CreatePhysicaltherapyDiagnosisPayload;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSubmit?: () => void;
  isLoading?: boolean;
  titolo: string;
  next?: () => void;
  prev?: () => void;
};

export function PhysicalTherapyDiagnosis({
    data,
    onChange,
    onSubmit,
    isLoading,
    titolo,
    next,
    prev
}: Props) {
    const fields = PhysicalTherapyDiagnosisFormLayout;

    return (
    <div className="flex flex-col w-full h-[90vh] bg-white rounded-lg shadow">
      {/* HEADER */}
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

      {/* BODY SCROLLABILE */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {fields.map((row, rowIndex) => {
          const rowCount = row.length;
          const width = rowCount > 1 ? "w-full" : "w-1/2";

          return (
            <div key={rowIndex} className={`${width} flex gap-4`}>
              {row.map((line, lineIndex) => {
                const key = `${rowIndex}-${lineIndex}`;

                if (line.type === "textarea") {
                  return (
                    <TextArea
                      key={key}
                      label={line.label}
                      name={line.name}
                      onChange={onChange}
                      rows={line.rows ? line.rows : 3}
                      value={data[line.name] || ""}
                    />
                  );
                }

                if (line.type === "checkboxInput") {
                  return (
                    <CheckboxWithInput
                      key={key}
                      label={line.label}
                      nameCheck={line.nameCheck}
                      nameText={line.nameText}
                      valueCheck={data[line.nameCheck] || ""}
                      valueText={data[line.nameText] || ""}
                      onChange={onChange}
                    />
                  );
                }

                if (line.type === "input") {
                  return (
                    <Input
                      key={key}
                      label={line.label}
                      name={line.name}
                      onChange={onChange}
                      value={data[line.name] || ""}
                    />
                  );
                }

                if (line.type === "select") {
                  return (
                    <Select
                      key={key}
                      label={line.label}
                      name={line.name}
                      value={line.value}
                      onChange={onChange}
                      options={line.options}
                    />
                  );
                }

                if (line.type === "section") {
                  return (
                    <h2 key={key} className="text-lg">
                      {line.title}
                    </h2>
                  );
                }

                return null;
              })}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="shrink-0 p-4 border-t bg-white">
        <div className="flex justify-end">
          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="w-40 py-2 rounded-md bg-blue-600 text-white text-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isLoading ? "Salvataggio..." : "Salva"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
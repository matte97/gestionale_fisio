import { FieldConfig } from "../Types/field.types";
import { CheckboxWithInput } from "./CheckboxWithInput";
import Input from "./Input";
import { InputDate } from "./InputDate";
import { RadioGroup } from "./RadioGroup";
import { Select } from "./Select";
import TextArea from "./TextArea";
import { SymptomsManager } from "./SymptomsManager";
import { BodyMapField } from "./BodyMapField";

type Props<T> = {
  data: T;
  fields: FieldConfig[][];
  onChange: (name: string, value: any) => void;
  titolo: string;
  next?: () => void;
  prev?: () => void;
  isLoading?: boolean;
};

export function MultiStepForm<T>({
  data,
  fields,
  onChange,
  titolo,
  next,
  prev,
  isLoading,
}: Props<T>) {
  return (
    <div className="flex flex-col w-full h-full bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* HEADER STICKY */}
      <div className="w-full px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10 flex items-center justify-between">
        {prev ? (
          <button
            onClick={prev}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            ← Indietro
          </button>
        ) : (
          <div className="w-[100px]" />
        )}

        <h2 className="text-xl font-semibold text-gray-800 text-center flex-1">
          {titolo}
        </h2>

        {next ? (
          <button
            onClick={next}
            className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Avanti →
          </button>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>

      {/* BODY SCROLLABLE */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {fields.map((row, rowIndex) => {
          const rowCount = row.length;
          const hasFullWidthField = row.some((f) => f.type === "section" || (f.type === "table" && f.fullWidth) || f.type === "symptomsArray" || f.type === "bodyMap");
          const width = rowCount > 1 || hasFullWidthField ? "w-full" : "w-1/2";
          
          const isColGroupRow = row.some((f) => f.type === "group" && f.direction === "col");
          const alignItems = isColGroupRow ? "items-start" : "items-end";

          return (
            <div key={rowIndex} className={`${width} flex ${alignItems} gap-3`}>
              {row.map((field, fieldIndex) => {
                const key = `${rowIndex}-${fieldIndex}`;

                if (field.type === "symptomsArray") {
                  return (
                    <SymptomsManager
                      key={key}
                      name={field.name}
                      label={field.label}
                      value={(data as any)[field.name] || []}
                      onChange={(val) => onChange(field.name, val)}
                    />
                  );
                }

                if (field.type === "bodyMap") {
                  return (
                    <BodyMapField
                      key={key}
                      name={field.name}
                      label={field.label}
                      value={(data as any)[field.name] || []}
                      onChange={(name, val) => onChange(name, val)}
                    />
                  );
                }

                if (field.type === "section") {
                  return (
                    <h3
                      key={key}
                      className="text-lg font-semibold text-gray-700 w-full border-b border-gray-200 pb-2"
                    >
                      {field.title}
                    </h3>
                  );
                }

                if (field.type === "table") {
                  const tableData = (data as any)[field.name] || [];
                  const handleAdd = () => onChange(field.name, [...tableData, {}]);
                  const handleRemove = (index: number) => {
                    const newData = [...tableData];
                    newData.splice(index, 1);
                    onChange(field.name, newData);
                  };
                  const handleChangeTable = (index: number, colName: string, value: any) => {
                    const newData = [...tableData];
                    newData[index] = { ...newData[index], [colName]: value };
                    onChange(field.name, newData);
                  };

                  return (
                    <div key={key} className="flex flex-col gap-2 w-full mt-2 mb-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] rounded-lg">
                      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-t-lg border border-gray-200">
                        <label className="font-semibold text-gray-700">{field.label}</label>
                        <button
                          type="button"
                          onClick={handleAdd}
                          className="text-sm bg-indigo-100 text-indigo-700 font-medium px-3 py-1.5 rounded-md hover:bg-indigo-200 transition"
                        >
                          + Aggiungi record
                        </button>
                      </div>
                      <div className="overflow-x-auto border border-t-0 border-gray-200 rounded-b-lg">
                        <table className="w-full text-left text-sm text-gray-600">
                          <thead className="bg-white text-gray-700 font-medium border-b border-gray-200">
                            <tr>
                              {field.columns.map((c) => (
                                <th key={c.name} className="px-4 py-3 whitespace-nowrap">
                                  {c.label}
                                </th>
                              ))}
                              <th className="px-4 py-3 w-16 text-center">Azioni</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {tableData.map((rowItem: any, idx: number) => (
                              <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition">
                                {field.columns.map((c) => (
                                  <td key={c.name} className="px-4 py-2 align-top">
                                    {c.type === "textarea" ? (
                                      <textarea
                                        rows={1}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 border outline-none transition-shadow"
                                        value={rowItem[c.name] ?? ""}
                                        onChange={(e) => handleChangeTable(idx, c.name, e.target.value)}
                                      />
                                    ) : c.type === "plusMinus" ? (
                                      <div className="flex items-center w-full rounded-md border border-gray-300 shadow-sm bg-white overflow-hidden transition-shadow focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                                        <button
                                          type="button"
                                          className="px-3 py-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 font-bold border-r border-gray-300 focus:outline-none transition-colors"
                                          onClick={() => {
                                            const states = ["---", "--", "-", "", "+", "++", "+++"];
                                            const currentVal = rowItem[c.name] ?? "";
                                            let idxState = states.indexOf(currentVal);
                                            if (idxState === -1) idxState = 3; // Default center
                                            if (idxState > 0) {
                                              handleChangeTable(idx, c.name, states[idxState - 1]);
                                            }
                                          }}
                                        >
                                          −
                                        </button>
                                        <input
                                          type="text"
                                          maxLength={c.maxLength}
                                          className="w-full text-center sm:text-sm p-1 outline-none min-w-0"
                                          value={rowItem[c.name] ?? ""}
                                          onChange={(e) => handleChangeTable(idx, c.name, e.target.value)}
                                          placeholder="..."
                                        />
                                        <button
                                          type="button"
                                          className="px-3 py-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 font-bold border-l border-gray-300 focus:outline-none transition-colors"
                                          onClick={() => {
                                            const states = ["---", "--", "-", "", "+", "++", "+++"];
                                            const currentVal = rowItem[c.name] ?? "";
                                            let idxState = states.indexOf(currentVal);
                                            if (idxState === -1) idxState = 3; // Default center
                                            if (idxState < states.length - 1) {
                                              handleChangeTable(idx, c.name, states[idxState + 1]);
                                            }
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    ) : (
                                      <input
                                        type={c.type === "number" ? "number" : "text"}
                                        maxLength={c.maxLength}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 border outline-none transition-shadow"
                                        value={rowItem[c.name] ?? ""}
                                        onChange={(e) =>
                                          handleChangeTable(
                                            idx,
                                            c.name,
                                            c.type === "number" ? Number(e.target.value) : e.target.value
                                          )
                                        }
                                      />
                                    )}
                                  </td>
                                ))}
                                <td className="px-4 py-2 text-center align-middle">
                                  <button
                                    type="button"
                                    onClick={() => handleRemove(idx)}
                                    className="text-red-500 hover:text-red-700 font-bold px-3 py-1.5 bg-red-50 rounded-md hover:bg-red-100 transition shadow-sm"
                                    title="Rimuovi record"
                                  >
                                    ✕
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {tableData.length === 0 && (
                              <tr>
                                <td colSpan={field.columns.length + 1} className="px-4 py-6 text-center text-gray-500 bg-gray-50/50">
                                  Nessun record inserito. Clicca su <span className="font-semibold">"+ Aggiungi record"</span> per iniziare.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                }

                if (field.type === "checkboxInput") {
                  return (
                    <div key={key} className="flex-1 w-full">
                      <CheckboxWithInput
                        label={field.label}
                        nameCheck={field.nameCheck}
                        nameText={field.nameText}
                        valueCheck={(data as any)[field.nameCheck] ?? false}
                        valueText={(data as any)[field.nameText] ?? ""}
                        onChangeCheck={(val) => onChange(field.nameCheck, val)}
                        onChangeText={(val) => onChange(field.nameText, val)}
                      />
                    </div>
                  );
                }

                if (field.type === "boolean") {
                  return (
                    <div key={key} className="flex flex-col gap-2 flex-1 w-full min-w-0">
                      {/* BOOLEAN SOPRA */}
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                          checked={(data as any)[field.name] ?? false}
                          onChange={(e) =>
                            onChange(field.name, e.target.checked)
                          }
                        />
                        {field.label}
                      </label>

                      {/* CHILDREN SOTTO */}
                      {field.children && field.children.length > 0 && (
                        <div className={`flex gap-2 w-full mt-1 ${!field.alwaysShowChildren && !(data as any)[field.name] ? 'hidden' : ''}`}>
                          {field.children.map((child, i) => {
                            const childKey = `${key}-child-${i}`;

                            if (child.type === "textarea" || child.type === "input") {
                              return (
                                <div key={childKey} className="flex-1 w-full min-w-0">
                                  {child.type === "textarea" ? (
                                    <TextArea
                                      label={child.label}
                                      name={child.name}
                                      value={(data as any)[child.name] ?? ""}
                                      rows={child.rows}
                                      onChange={onChange}
                                    />
                                  ) : (
                                    <Input
                                      label={child.label}
                                      name={child.name}
                                      value={(data as any)[child.name] ?? ""}
                                      onChange={onChange}
                                    />
                                  )}
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                if (field.type === "group") {
                  return (
                    <div key={key} className="flex flex-col flex-1 w-full min-w-0">
                      {field.label && field.label.trim() !== "" && (
                        <label className="text-sm font-semibold text-gray-700">
                          {field.label}
                        </label>
                      )}
                      <div className={`flex ${field.direction === "col" ? "flex-col" : ""} gap-2 w-full mt-1`}>
                        {field.children.map((child, i) => {
                          const childKey = `${key}-child-${i}`;
                          return (
                            <div key={childKey} className="flex-1 w-full min-w-0">
                              {child.type === "textarea" ? (
                                <TextArea
                                  label={child.label}
                                  name={child.name}
                                  value={(data as any)[child.name] ?? ""}
                                  rows={child.rows}
                                  onChange={onChange}
                                />
                              ) : (
                                <Input
                                  label={child.label}
                                  name={child.name}
                                  value={(data as any)[child.name] ?? ""}
                                  onChange={onChange}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                if (
                  field.type === "input" ||
                  field.type === "textarea" ||
                  field.type === "select" ||
                  field.type === "radiogroup" ||
                  field.type === "date"
                ) {
                  const renderField = () => {
                    switch (field.type) {
                      case "textarea":
                        return (
                          <TextArea
                            label={field.label}
                            name={field.name}
                            value={(data as any)[field.name] ?? ""}
                            rows={field.rows}
                            onChange={onChange}
                          />
                        );
                      case "input":
                        return (
                          <Input
                            label={field.label}
                            name={field.name}
                            value={(data as any)[field.name] ?? ""}
                            onChange={onChange}
                          />
                        );
                      case "select":
                        return (
                          <Select
                            label={field.label}
                            name={field.name}
                            value={(data as any)[field.name] ?? ""}
                            onChange={onChange}
                            options={field.options || []}
                          />
                        );
                      case "radiogroup":
                        return (
                          <RadioGroup
                            label={field.label}
                            name={field.name}
                            value={(data as any)[field.name] ?? ""}
                            onChange={onChange}
                            options={field.options || []}
                          />
                        );
                      case "date":
                        return (
                          <InputDate
                            label={field.label}
                            name={field.name}
                            value={(data as any)[field.name] ?? ""}
                            onChange={onChange}
                          />
                        );
                      default:
                        return null;
                    }
                  };

                  return (
                    <div key={key} className="flex-1 w-full min-w-0">
                      {renderField()}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          );
        })}
      </div>

    </div>
  );
}

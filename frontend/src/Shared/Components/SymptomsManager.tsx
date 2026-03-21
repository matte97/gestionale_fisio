import { useState } from "react";
import { createPortal } from "react-dom";
import TextArea from "./TextArea";

type Symptom = {
  type: string;
  characteristic: string;
  pattern: string;
  triggering_event: string;
  intensity_nprs: number;
  frequency: string;
  better_when: string;
  worse_when: string;
  trend: string;
};

type Props = {
  label: string;
  name: string;
  value: Symptom[];
  onChange: (value: Symptom[]) => void;
};

export function SymptomsManager({ label, name, value = [], onChange }: Props) {
  const [modal, setModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [type, setType] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [pattern, setPattern] = useState("");
  const [intensityNprs, setIntensityNprs] = useState<number>(1);
  const [frequency, setFrequency] = useState("");
  const [betterWhen, setBetterWhen] = useState("");
  const [worseWhen, setWorseWhen] = useState("");
  const [trend, setTrend] = useState("");

  const resetForm = () => {
    setType("");
    setCharacteristic("");
    setPattern("");
    setIntensityNprs(1);
    setFrequency("");
    setBetterWhen("");
    setWorseWhen("");
    setTrend("");
    setEditingIndex(null);
  };

  const openNew = () => {
    resetForm();
    setModal(true);
  };

  const openEdit = (index: number) => {
    const s = value[index];
    setType(s.type || "");
    setCharacteristic(s.characteristic || "");
    setPattern(s.pattern || "");
    setIntensityNprs(s.intensity_nprs || 1);
    setFrequency(s.frequency || "");
    setBetterWhen(s.better_when || "");
    setWorseWhen(s.worse_when || "");
    setTrend(s.trend || "");
    setEditingIndex(index);
    setModal(true);
  };

  const handleRemove = (index: number) => {
    const newValues = [...value];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  const handleSave = () => {
    if (!type.trim()) {
      alert("Il tipo del sintomo non può essere vuoto");
      return;
    }

    if (editingIndex === null) {
      const alreadyExists = value.some((s) => s.type === type);
      if (alreadyExists) {
        alert("Esiste già un sintomo con questo tipo!");
        return;
      }
    } else {
      const alreadyExists = value.some(
        (s, idx) => s.type === type && idx !== editingIndex
      );
      if (alreadyExists) {
        alert("Esiste già un sintomo con questo tipo!");
        return;
      }
    }

    const newSymptom: Symptom = {
      type,
      characteristic,
      pattern,
      triggering_event: "",
      intensity_nprs: intensityNprs,
      frequency,
      better_when: betterWhen,
      worse_when: worseWhen,
      trend,
    };

    if (editingIndex !== null) {
      const newValues = [...value];
      newValues[editingIndex] = newSymptom;
      onChange(newValues);
    } else {
      onChange([...value, newSymptom]);
    }

    setModal(false);
    resetForm();
  };

  return (
    <div className="flex-1 w-full flex flex-col mt-2 mb-4">
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg font-semibold text-gray-800">{label}</label>
        <button
          type="button"
          onClick={openNew}
          className="text-sm bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition shadow-sm"
        >
          + Aggiungi Sintomo
        </button>
      </div>

      {value.length === 0 ? (
        <div className="text-gray-500 italic bg-gray-50 p-6 text-center rounded-md border border-gray-200">
          Nessun sintomo registrato. Clicca su "+ Aggiungi Sintomo" per iniziare.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map((symptom, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition relative flex flex-col group"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wide">
                  {symptom.type}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => openEdit(idx)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                  >
                    Modifica
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Elimina
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                <span className="font-semibold text-gray-700">Caratteristiche:</span>{" "}
                {symptom.characteristic || "-"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-gray-700">NPRS:</span>{" "}
                {symptom.intensity_nprs}/10
              </p>
            </div>
          ))}
        </div>
      )}

      {modal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-[100] backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
              
              <div className="flex justify-between items-center border-b p-6 sm:p-8 shrink-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingIndex !== null ? "Modifica Sintomo" : "Nuovo Sintomo"}
                </h2>
                <button
                  type="button"
                  onClick={() => { setModal(false); resetForm(); }}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 sm:px-8 sm:py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Tipo
                  </label>
                  <div className="flex gap-4 p-2 bg-gray-50 border border-gray-200 rounded-md">
                    {["A", "B", "C", "D"].map((t) => (
                      <label
                        key={t}
                        className="flex items-center gap-2 cursor-pointer text-gray-700 font-medium"
                      >
                        <input
                          type="radio"
                          name="typeRadio"
                          value={t}
                          checked={type === t}
                          onChange={() => setType(t)}
                          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Caratteristica
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={characteristic}
                    onChange={(e) => setCharacteristic(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Costante / Intermittente (Pattern)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Intensità (NPRS)
                  </label>
                  <div className="mt-2 bg-gray-50 p-4 border border-gray-200 rounded-md">
                    <input
                      type="range"
                      min={1}
                      max={10}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      value={intensityNprs}
                      onChange={(e) => setIntensityNprs(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-medium mt-3 px-1">
                      {Array.from({ length: 10 }, (_, i) => (
                        <span key={i}>{i + 1}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Frequenza (tempo/attività)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Presente / Peggio se (att./24h)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={worseWhen}
                    onChange={(e) => setWorseWhen(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Assente / Meglio se (att./24h)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={betterWhen}
                    onChange={(e) => setBetterWhen(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Decorso (Meglio, Peggio, Staz., EsRem.)
                  </label>
                  <textarea
                    rows={2}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow sm:text-sm resize-none"
                    value={trend}
                    onChange={(e) => setTrend(e.target.value)}
                  />
                </div>
              </div>
              
              </div> {/* Close internal flex-1 scrollable area */}

              <div className="flex gap-4 justify-end border-t p-6 sm:px-8 sm:py-5 shrink-0 bg-gray-50 z-10 w-full rounded-b-xl">
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 focus:outline-none transition-colors"
                  onClick={() => {
                    setModal(false);
                    resetForm();
                  }}
                >
                  Annulla
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                  onClick={handleSave}
                >
                  Salva Sintomo
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

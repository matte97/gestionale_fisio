import { useState } from "react";
import { createPortal } from "react-dom";
import Body, { ExtendedBodyPart, Slug } from "react-muscle-highlighter";

type Props = {
  label: string;
  name: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
};

const muscleTranslations: Record<string, string> = {
  abs: "Addome",
  adductors: "Adduttori",
  ankles: "Caviglie",
  biceps: "Bicipiti",
  calves: "Polpacci",
  chest: "Petto",
  deltoids: "Spalle",
  feet: "Piedi",
  forearm: "Avambraccia",
  gluteal: "Glutei",
  hamstring: "Femorali",
  hands: "Mani",
  hair: "Capelli",
  head: "Viso / Testa",
  knees: "Ginocchia",
  "lower-back": "Zona Lombare",
  neck: "Collo",
  obliques: "Obliqui",
  quadriceps: "Quadricipiti",
  tibialis: "Tibiali",
  trapezius: "Trapezio",
  triceps: "Tricipiti",
  "upper-back": "Dorso"
};

const sideTranslations: Record<string, string> = {
  left: "Sx",
  right: "Dx",
  both: ""
};

export function BodyMapField({ label, name, value, onChange }: Props) {
  const safeValue = Array.isArray(value) ? value : [];
  const [modal, setModal] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  const openModal = () => {
    setTempSelected([...safeValue]);
    setModal(true);
  };

  const handleSave = () => {
    onChange(name, tempSelected);
    setModal(false);
  };

  const handleToggleMuscle = (part: ExtendedBodyPart, side?: 'left' | 'right') => {
    if (!part.slug) return;
    const identifier = `${part.slug}:${side || 'both'}`;

    setTempSelected((prev) => {
      if (prev.includes(identifier)) {
        return prev.filter((m) => m !== identifier);
      } else {
        return [...prev, identifier];
      }
    });
  };

  const removeMuscle = (identifier: string) => {
    setTempSelected((prev) => prev.filter((m) => m !== identifier));
  };

  // Convert "slug:side" strings into ExtendedBodyPart objects required by library
  const bodyData: ExtendedBodyPart[] = tempSelected.map(id => {
    const [slug, sideStr] = id.split(':');
    return {
      slug: slug as Slug,
      side: sideStr === 'both' ? undefined : (sideStr as 'left' | 'right'),
      color: '#4f46e5'
    };
  });

  const formatBadgeName = (identifier: string) => {
    const [slug, side] = identifier.split(':');
    const translatedName = muscleTranslations[slug] || slug;
    const translatedSide = sideTranslations[side];
    return translatedSide ? `${translatedName} ${translatedSide}` : translatedName;
  };

  return (
    <div className="flex flex-col w-full mb-2 mt-2">
      <label className="block mb-2 text-sm font-semibold text-gray-700">{label}</label>
      
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition shadow-sm"
          >
            Scegli dalla Mappa Anatomica
          </button>
          
          <div className="flex gap-2 flex-wrap">
            {safeValue.length > 0 ? (
              safeValue.map((m, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md uppercase tracking-wide">
                  {formatBadgeName(m)}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm italic">Nessuna area selezionata sulla mappa</span>
            )}
          </div>
        </div>
      </div>

      {modal &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-65 z-[100] backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl relative w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
              {/* HEADER */}
              <div className="flex justify-between items-center border-b p-6 sm:px-8 sm:py-6 shrink-0 bg-white z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Seleziona Aree Corporee</h2>
                  <p className="text-gray-500 text-sm mt-1">Clicca sulle parti del corpo per evidenziare le zone interessate.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModal(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="flex-1 overflow-y-auto p-6 sm:px-8 sm:py-6">
                {/* BODY MAPS */}
                <div className="flex flex-col md:flex-row items-center justify-evenly gap-8 bg-gray-50/50 p-6 rounded-lg border border-gray-100 mb-6">
                <div className="flex flex-col items-center">
                  <h3 className="mb-4 font-semibold text-gray-700 uppercase tracking-widest text-sm bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">Anteriore</h3>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition">
                    <Body
                      data={bodyData}
                      side="front"
                      gender="male"
                      scale={1.3}
                      onBodyPartPress={handleToggleMuscle}
                      defaultFill="#e5e7eb"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <h3 className="mb-4 font-semibold text-gray-700 uppercase tracking-widest text-sm bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100">Posteriore</h3>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-200 transition">
                    <Body
                      data={bodyData}
                      side="back"
                      gender="male"
                      scale={1.3}
                      onBodyPartPress={handleToggleMuscle}
                      defaultFill="#e5e7eb"
                    />
                  </div>
                </div>
              </div>

              {/* SELECTED TAGS IN MODAL */}
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Aree selezionate correntemente:</h4>
                <div className="flex gap-2 flex-wrap min-h-[42px] p-3 bg-gray-50 rounded-md border border-gray-200">
                  {tempSelected.length > 0 ? (
                    tempSelected.map((m) => (
                      <span
                        key={m}
                        className="px-2.5 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md uppercase cursor-pointer hover:bg-red-100 hover:text-red-700 hover:border-red-200 border border-indigo-200 transition shadow-sm flex items-center gap-2"
                        title="Clicca per rimuovere"
                        onClick={() => removeMuscle(m)}
                      >
                        {formatBadgeName(m)} 
                        <span className="text-red-500 font-bold">✕</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm italic py-1">Nessuna area evidenziata.</span>
                  )}
                </div>
              </div>
              
              </div> {/* conclude inner scrollable division */}

              {/* FOOTER */}
              <div className="flex justify-end gap-4 border-t p-6 sm:px-8 sm:py-5 shrink-0 bg-gray-50 z-10 w-full rounded-b-xl">
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold rounded-md text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-800 focus:outline-none transition-colors"
                  onClick={() => setModal(false)}
                >
                  Annulla
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors"
                  onClick={handleSave}
                >
                  Conferma Aree
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

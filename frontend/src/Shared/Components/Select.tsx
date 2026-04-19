import { useState, useRef, useEffect } from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: any) => void;
  options: { value: string; label: string }[];
};

export function Select({ label, name, value, onChange, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value) || { label: "-- Seleziona --", value: "" };

  return (
    <div className="flex flex-col w-full relative" ref={dropdownRef}>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`w-full h-9 border border-gray-300 rounded-md shadow-sm px-2 flex items-center justify-between cursor-pointer bg-white transition-shadow text-sm select-none ${isOpen ? "ring-2 ring-indigo-500 border-indigo-500" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? "text-gray-500 truncate" : "text-gray-900 truncate"}>{selectedOption.label}</span>
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto top-[100%]">
          <li
            className="px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              onChange(name, "");
              setIsOpen(false);
            }}
          >
            -- Seleziona --
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 ${value === opt.value ? "bg-indigo-100 text-indigo-700 font-medium" : "text-gray-700"}`}
              onClick={() => {
                onChange(name, opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

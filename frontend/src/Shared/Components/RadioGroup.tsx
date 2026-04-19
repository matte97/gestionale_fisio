type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: any) => void;
  options: { value: string; label: string }[];
};

export function RadioGroup({ label, name, value, onChange, options = [] }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <fieldset className="flex items-center gap-4 h-9">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer text-gray-700">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
            />
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: any) => void;
};

export function InputDate({ label, name, value, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full h-9 border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm bg-white"
      />
    </div>
  );
}
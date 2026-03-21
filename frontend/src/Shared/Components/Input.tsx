type Props = {
  label: string;
  name: string;
  value: string;
  type?: string;
  step?: number;
  min?: string;
  onChange: (name: string, value: any) => void;
};

export default function Input({ label, name, value, type = "text", step, min, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        step={step}
        min={min}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full h-9 border border-gray-300 rounded-md shadow-sm p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm"
      />
    </div>
  );
}
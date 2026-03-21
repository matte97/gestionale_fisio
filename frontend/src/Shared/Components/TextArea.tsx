type Props = {
  label: string;
  name: string;
  value: string;
  rows?: number;
  onChange: (name: string, value: any) => void;
};

export default function TextArea({ label, name, value, rows = 2, onChange }: Props) {
  return (
    <div className="flex flex-col w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-300 rounded-md shadow-sm p-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow resize-none"
      />
    </div>
  );
}
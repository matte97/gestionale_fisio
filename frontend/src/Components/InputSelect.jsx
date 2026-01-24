function InputSelect({ label, name, value, onChange, options }) {
  return (
    <>
      <div className="flex-1">
        <label className="block mb-1">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Seleziona --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default InputSelect;

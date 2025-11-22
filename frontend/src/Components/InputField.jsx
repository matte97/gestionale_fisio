export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  options = [],
  ...rest // <--- NOVITÀ: cattura min, max, step, placeholder ecc.
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>

      {/* INPUT BASE */}
      {type !== "select" && type !== "textarea" && (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}                                  // <--- PASSA TUTTI GLI ATTRIBUTI
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {/* SELECT */}
      {type === "select" && (
        <select
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Seleziona --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* TEXTAREA */}
      {type === "textarea" && (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
          className="border border-gray-300 rounded-md p-2 min-h-[80px] focus:ring-2 focus:ring-indigo-500"
        />
      )}
    </div>
  );
}

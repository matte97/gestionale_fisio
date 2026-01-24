function InputText({ label, name, value, onChange }) {
  return (
    <>
      <div className="flex-1">
        <label className="block mb-1 ">{label}</label>
        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full border p-1 rounded resize-none"
        ></input>
      </div>
    </>
  );
}

export default InputText;

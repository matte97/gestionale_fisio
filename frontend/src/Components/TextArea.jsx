function TextArea({ label, name, value, onChange, rows }) {
    return (
        <>
            <div className="flex-1">
                <label className="block mb-1">{label}</label>
                <textarea
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    rows={rows}
                    className="w-full border p-2 rounded resize-none"
                ></textarea>
            </div>
        </>
    )
}

export default TextArea;
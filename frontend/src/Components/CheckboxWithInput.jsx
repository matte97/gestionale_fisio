function CheckboxWithInput({ label, nameCheck, nameText, valueCheck, valueText, onChange }) {
    return (
        <>
            <div className="w-full flex flex-col gap-1">
                <div>
                    <label>{label}</label>
                </div>
                <div className="w-full flex flex-row items-center gap-4 ml-1 mr-1">
                    <input
                        type="checkbox"
                        name={nameCheck}
                        value={valueCheck}
                        onChange={onChange}
                        className="transform scale-150"
                    />
                    <input
                        type="text"
                        name={nameText}
                        value={valueText}
                        onChange={onChange}
                        className="w-full border p-1 rounded"
                    />
                </div>
            </div>
        </>
    )
}

export default CheckboxWithInput;
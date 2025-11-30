function RadioGroup({label, name, options=[], value, onChange}) {
    return (
        <>
            <div className="flex-1">
                <label className="block mb-1 font-medium">{label}</label>
                <fieldset className="flex items-center gap-4 mt-2">
                    {options.map(opt =>(
                        <label key={opt.value} className="flex items-center gap-2">
                        <input
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={onChange}
                            type="radio"
                            className="h-4 w-4"
                        />
                        {opt.label}
                    </label>
                    ))}
                </fieldset>
            </div>
        </>
    )
}

export default RadioGroup;
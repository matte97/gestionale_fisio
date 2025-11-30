function ActionButton({label, onClick, className = "", type = "button"}) {

    const colorClasses = {
        Salva: "bg-green-500 hover:bg-green-700 text-white",
        Annulla: "bg-gray-500 hover:bg-gray-700 text-white",
        Modifica: "bg-blue-500 hover:bg-blue-700 text-white",
        Elimina: "bg-red-500 hover:bg-red-700 text-white",
    };

    const classes = `px-3 py-1 rounded ${colorClasses[label] || "bg-gray-400"} ${className}`;

    return (
        <>
            <button type={type} className={classes} onClick={onClick}>
                {label}
            </button>
        </>
    )
}

export default ActionButton;
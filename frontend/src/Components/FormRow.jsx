function FormRow({ children }) {
    return (
        <>
            <div className="w-full flex gap-3 p-1">
                {children}
            </div>
        </>
    )
}

export default FormRow;
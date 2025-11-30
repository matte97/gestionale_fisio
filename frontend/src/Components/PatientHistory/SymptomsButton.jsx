function SymptomsButtons({ symptoms, setEditingSymptom, setModalEdit }) {
    const sortedSymptoms = [...symptoms].sort((a, b) =>
        a.type.localeCompare(b.type)
    );

    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="text-xl flex items-center">
                Sintomi
            </div>

            <div className="flex-1 flex flex-row justify-center gap-4">
                {sortedSymptoms.map(symptom => {
                    const originalIndex = symptoms.findIndex(
                        s => s.type === symptom.type
                    );

                    return (
                        <button
                            key={symptom.type}
                            className="w-8 h-8 bg-blue-500 rounded-md hover:bg-blue-800 text-white text-xl text-center"
                            type="button"
                            onClick={() => {
                                setEditingSymptom({ ...symptom, index: originalIndex });
                                setModalEdit(true);
                            }}
                        >
                            {symptom.type}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SymptomsButtons;

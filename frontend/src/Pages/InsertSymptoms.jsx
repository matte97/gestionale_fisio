import { use, useState } from "react";

function InsertSymptoms({ modal, setModal, patientHistorySymptoms, setPatientHistorySymptoms }) {
    if (!modal) return null;

    const [type, setType] = useState('');
    const [characteristic, setCharacteristic] = useState('');
    const [pattern, setPattern] = useState('');
    const [intensityNprs, setIntensityNprs] = useState(1);
    const [frequency, setFrequency] = useState('');
    const [betterWhen, setBetterWhen] = useState('');
    const [worseWhen, setWorseWhen] = useState('');
    const [trend, setTrend] = useState('');

    const handleSave = () => {

        if(!type.trim()){
            alert("Il tipo del sintomo non può essere vuoto");
            return;
        }
        // 1️⃣ Controllo se esiste già un sintomo con lo stesso type
        const alreadyExists = patientHistorySymptoms.some(s => s.type === type);

        if (alreadyExists) {
            alert("Esiste già un sintomo con questo tipo!");
            return;
        }

        // 2️⃣ Se non esiste lo aggiungo
        const newSymptom = {
            type,
            characteristic,
            pattern,
            intensityNprs,
            frequency,
            betterWhen,
            worseWhen,
            trend,
        };

        setPatientHistorySymptoms(prev => [...prev, newSymptom]);
        setModal(false);

        // Reset campi
        setType('');
        setCharacteristic('');
        setPattern('');
        setIntensityNprs(1);
        setFrequency('');
        setBetterWhen('');
        setWorseWhen('');
        setTrend('');
    };



    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg relative w-1/2">
                    <h2 className="text-xl font-bold mb-4">Nuovo sintomo</h2>
                    <form>
                        <div className="w-full flex gap-3 p-1">
                            <div className="flex-1">
                                <label className="block mb-1">Tipo</label>
                                <div className="flex flex-row justify-between items-center gap-2 mt-5">
                                    {["A", "B", "C", "D"].map((t) => (
                                        <label key={t} className="flex items-center gap-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                value={t}
                                                className="h-4 w-4 accent-blue-500"
                                                onChange={() => setType(t)}
                                            />
                                            {t}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1">Caratteristica</label>
                                <textarea
                                    name="characteristic"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={characteristic}
                                    onChange={e => setCharacteristic(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex gap-3 p-1">
                            <div className="flex-1">
                                <label className="block mb-1">Costante; Intermittente (on-off?)
                                </label>
                                <textarea
                                    name="pattern"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={pattern}
                                    onChange={e => setPattern(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <div>
                                    <label className="block mb-1">Intensità (tempo/attività)</label>
                                    <input
                                        name="intensityNprs"
                                        type="range"
                                        min={1}
                                        max={10}
                                        className="w-full mt-5"
                                        value={intensityNprs}
                                        onChange={e => setIntensityNprs(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-1 px-1">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <span key={i}>{i + 1}</span>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div className="w-full flex gap-3 p-1">
                            <div className="flex-1">
                                <label className="block mb-1">Frequenza (tempo/attività)
                                </label>
                                <textarea
                                    name="frequency"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={frequency}
                                    onChange={e => setFrequency(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1">Presente/Peggio se (att./24h)</label>
                                <textarea
                                    name="worseWhen"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={worseWhen}
                                    onChange={e => setWorseWhen(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex gap-3 p-1">
                            <div className="flex-1">
                                <label className="block mb-1">Assente/Meglio se (att./24h)</label>
                                <textarea
                                    name="betterWhen"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={betterWhen}
                                    onChange={e => setBetterWhen(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-1">Decorso (Meglio, Peggio, Stazionario, EsRem.)</label>
                                <textarea
                                    name="trend"
                                    rows={2}
                                    className="w-full border p-2 rounded resize-none"
                                    value={trend}
                                    onChange={e => setTrend(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 justify-end mr-1">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => setModal(false)}
                            >
                                Chiudi
                            </button>
                            <button
                                type="button"
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={handleSave}
                            >
                                Salva
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InsertSymptoms
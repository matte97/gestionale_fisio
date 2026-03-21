type Props = {
  label: string;
  nameCheck: string;
  nameText: string;
  valueCheck: boolean;
  valueText: string;
  onChangeCheck: (val: boolean) => void;
  onChangeText: (val: string) => void;
};

export function CheckboxWithInput({
  label,
  nameCheck,
  nameText,
  valueCheck,
  valueText,
  onChangeCheck,
  onChangeText,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={valueCheck}
          onChange={(e) => onChangeCheck(e.target.checked)}
          className="transform scale-150"
        />
        {label}
      </label>
      {valueCheck && (
        <input
          type="text"
          value={valueText}
          onChange={(e) => onChangeText(e.target.value)}
          className="w-full border p-1 rounded"
        />
      )}
    </div>
  );
}
import CheckboxWithInput from "./CheckboxWithInput";
import InputSelect from "./InputSelect";
import InputText from "./InputText";
import RadioGroup from "./PatientHistory/RadioGroup";
import TextArea from "./TextArea";

function AnamnesisForm({ formLayout, handleChange }) {
  /*console.log(formLayout);*/
  return (
    <>
      <form className="w-full flex flex-col flex-1 overflow-y-auto p-2">
        {formLayout.map((row, rowIndex) => {
          const rowCount = row.length;
          const width = rowCount > 1 ? "w-full" : "w-1/2";
          return (
            <div key={rowIndex} className={`${width} flex gap-3 p-1`}>
              {row.map((line, lineIndex) => {
                const key =
                  line.name ||
                  line.nameCheck ||
                  line.title ||
                  `${rowIndex}-${lineIndex}`;

                if (line.type === "section") {
                  return (
                    <h2 key={key} className="text-lg">
                      {line.title}
                    </h2>
                  );
                }

                if (line.type === "textarea") {
                  return (
                    <TextArea
                      key={key}
                      label={line.label}
                      name={line.name}
                      onChange={handleChange}
                      value={line.value}
                      rows={line.rows}
                    />
                  );
                }

                if (line.type === "checkboxInput") {
                  return (
                    <CheckboxWithInput
                      key={key}
                      label={line.label}
                      nameCheck={line.nameCheck}
                      nameText={line.nameText}
                      valueCheck={line.valueCheck}
                      valueText={line.valueText}
                      onChange={handleChange}
                    />
                  );
                }

                if (line.type === "radiogroup") {
                  return (
                    <RadioGroup
                      key={key}
                      label={line.label}
                      name={line.name}
                      value={line.value}
                      onChange={handleChange}
                      options={line.options}
                    />
                  );
                }

                if (line.type === "text") {
                  return (
                    <InputText
                    key={key}
                    label={line.label}
                    name={line.name}
                    value={line.value}
                    onChange={handleChange}
                    />
                  );
                }

                if (line.type === "select") {
                  return (
                    <InputSelect
                    key={key}
                    label={line.label}
                    name={line.name}
                    value={line.value}
                    onChange={handleChange}
                    options={line.options}
                    />
                  );
                }

                if (line.type === "date") {
                  return (
                    <div className="flex-1" key={key}>
                      <label className="block mb-1 font-medium">
                        {line.label}
                      </label>
                      <input
                        name={line.name}
                        value={line.value}
                        onChange={handleChange}
                        type="date"
                        className="w-full border p-2 rounded"
                      />
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </form>
    </>
  );
}

export default AnamnesisForm;

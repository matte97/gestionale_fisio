import { MultiStepForm } from "../../Shared/Components/MultiStepForm";
import { CreatePatientHistoryPayload } from "./patientHistory.type";
import { patientHistoryFormLayout } from "./Utils/patientHistoryFormLayout";

type PageProps<T> = {
  data: T;
  onChange: (name: string, value: any) => void;
  next: () => void;
  prev: () => void;
};

export function CreatePatienthistorypagee({
  data,
  onChange,
  next,
  prev,
}: PageProps<CreatePatientHistoryPayload>) {
  const fields = patientHistoryFormLayout;
  return (
    <MultiStepForm
      data={data}
      fields={fields}
      onChange={onChange}
      titolo="Anamnesi prossima"
      next={next}
      prev={prev}
    />
  );
}

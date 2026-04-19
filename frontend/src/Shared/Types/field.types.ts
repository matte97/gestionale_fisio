export type FieldConfig =
  | {
      type: "input" | "textarea" | "select" | "radiogroup" | "date" | "boolean";
      name: string;
      label: string;
      options?: { label: string; value: any }[];
      rows?: number;
      alwaysShowChildren?: boolean;
      children?: any[];
    }
  | {
      type: "section";
      title: string;
    }
  | {
      type: "group";
      name: string;
      label: string;
      direction?: "row" | "col";
      children: { label: string; name: string; type: "input" | "textarea"; rows?: number }[];
    }
  | {
      type: "checkboxInput";
      label: string;
      nameCheck: string;
      nameText: string;
    }
  | {
      type: "symptomsArray";
      name: string;
      label: string;
    }
  | {
      type: "table";
      name: string;
      label: string;
      columns: { label: string; name: string; type: "input" | "number" | "textarea" | "plusMinus"; maxLength?: number }[];
      fullWidth?: boolean;
    }
  | {
      type: "bodyMap";
      name: string;
      label: string;
    }

import React from "react";

type ActionButtonProps = {
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

function ActionButton({ label, onClick, className = "", type = "button" }: ActionButtonProps) {
  const colorMap: Record<string, string> = {
    Salva: "bg-green-500 hover:bg-green-700 text-white",
    Annulla: "bg-gray-500 hover:bg-gray-700 text-white",
    Modifica: "bg-blue-500 hover:bg-blue-700 text-white",
    Elimina: "bg-red-500 hover:bg-red-700 text-white",
  };

  const colorClass = typeof label === "string" ? colorMap[label] : "";
  const classes = `px-3 py-1 rounded ${colorClass || "bg-gray-400"} ${className}`;

  return (
    <button type={type} className={classes} onClick={onClick}>
      {label}
    </button>
  );
}

export default ActionButton;

import { FaPlus, FaRegFolderOpen } from "react-icons/fa";

function CardAnamnesis({ id, isNew, click }) {
  if (isNew) {
    return (
      <div
        onClick={click}
        className="
        w-full h-36
        flex flex-col
        rounded-lg
        shadow-md
        cursor-pointer

        transition-all duration-200 ease-in-out
        hover:shadow-xl
        hover:scale-[1.03]
        hover:bg-gray-50
      "
      >
        <h2 className="text-lg text-center mt-2">Inserisci</h2>

        <div className="flex-1 flex items-center justify-center">
          <FaPlus
            size={56}
            className="text-gray-500 transition-colors"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      w-full h-36
      flex flex-col
      rounded-lg
      shadow-md
      cursor-pointer

      transition-all duration-200 ease-in-out
      hover:shadow-xl
      hover:scale-[1.03]
      hover:bg-gray-50
    "
    >
      <h2 className="text-lg text-center mt-2">{"Anamnesi " + id}</h2>

      <div className="flex-1 flex items-center justify-center">
        <FaRegFolderOpen
          size={56}
          className="text-gray-500 transition-colors"
        />
      </div>
    </div>
  );
}

export default CardAnamnesis;

//svg
import { ChevronDownIcon } from "@heroicons/react/outline";

function Selection({ options, selectedOption, handleOption }) {
  return (
    <div className="flex flex-col relative group">
      <div className="border rounded-md text-lg my-2 py-1.5 px-2 flex items-center justify-between ">
        {selectedOption.title ? selectedOption.title : "Not selected"}
        <ChevronDownIcon className="group-hover:rotate-180 duration-200 w-5" />
      </div>
      <div
        className={`group-hover:flex absolute top-14 z-20 border rounded-md py-1.5 px-2 hidden flex-col gap-y-2.5 w-full overflow-hidden bg-white`}
      >
        {options &&
          options.map((item) => (
            <button
              key={item.id}
              onClick={() => handleOption(item.id)}
              className={`${
                selectedOption.id === item.id ? "bg-gray-400 !text-white" : ""
              } flex items-center justify-between px-3 py-1.5 rounded-md text-black hover:text-white bg-white hover:bg-gray-400 duration-200`}
            >
              <span>{item.title}</span>
              {selectedOption.id === item.id && (
                <i className="bg-blue-500 w-5 h-5 rounded-full"></i>
              )}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Selection;

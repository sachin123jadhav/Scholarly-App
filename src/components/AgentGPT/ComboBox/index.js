import { useState } from "react";
import { Combobox as ComboboxPrimitive } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const ComboBox = ({ options, value, disabled = false, onChange, styleClass = "" }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    if (event.target) {
      setQuery(event.target.value);
    }
  };

  const filteredOptions =
    query === "" ? options : options.filter((e) => e.toLowerCase().includes(query.toLowerCase()));

  return (
    <ComboboxPrimitive value={value} onChange={onChange} disabled={disabled}>
      <div className={styleClass?.container}>
        <ComboboxPrimitive.Input onChange={handleInputChange} className={styleClass?.input} />
        <ComboboxPrimitive.Button className="absolute inset-y-0 right-0 flex items-center pr-4">
          <FaChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </ComboboxPrimitive.Button>
        <ComboboxPrimitive.Options className="absolute right-0 top-full z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border-2 border-white/10 bg-[#3a3a3a] tracking-wider shadow-xl outline-0 transition-all">
          {filteredOptions.map((opt) => (
            <ComboboxPrimitive.Option key={opt} value={opt} className={styleClass?.option}>
              {opt}
            </ComboboxPrimitive.Option>
          ))}
        </ComboboxPrimitive.Options>
      </div>
    </ComboboxPrimitive>
  );
};

export default ComboBox;

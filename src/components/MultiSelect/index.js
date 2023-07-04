import Select, { components } from "react-select";
import Icon from "../Icon";

const { Option, MultiValueRemove } = components;

const DetailsOption = (props) => (
  <Option {...props}>
    <div className="relative w-10 h-10 mr-3">
      <img className="object-fill rounded-full" src={props.data.avatar} alt={props.data.name} />
    </div>
    <div className="grow">
      <div className="font-semibold base2 text-n-5 dark:text-n-1">{props.data.name}</div>
      <div className="caption1 text-n-4/50 dark:text-n-3/50">{props.data.email}</div>
    </div>
  </Option>
);

const CustomMultiValueRemove = (props) => (
  <MultiValueRemove {...props}>
    <Icon className="w-4 h-4 transition-transform fill-inherit" name="close" />
  </MultiValueRemove>
);

const MultiSelect = ({
  className,
  classMultiSelectGlobal,
  items,
  selectedOptions,
  setSelectedOptions,
}) => {
  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  console.log(selectedOptions);

  const getOptionLabel = (option) => option.name;

  const getOptionValue = (option) => option.id;

  const formatOptionLabel = ({ avatar, name }) => (
    <div className="flex items-center font-semibold base2">
      <div className="relative w-6 h-6 mr-2">
        <img className="object-fill rounded-full" src={avatar} alt={name} />
      </div>
      <span className="mr-3">{name}</span>
    </div>
  );

  return (
    <div className={`relative ${className}`}>
      <Select
        className={`multiselect ${classMultiSelectGlobal}`}
        classNamePrefix="multiselect"
        value={selectedOptions}
        onChange={handleMultiSelectChange}
        options={items}
        isMulti
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        formatOptionLabel={formatOptionLabel}
        placeholder="Name member"
        noOptionsMessage={() => "No people found"}
        components={{
          Option: DetailsOption,
          MultiValueRemove: CustomMultiValueRemove,
        }}
        isClearable={false}
      />
      <Icon
        className={`absolute top-4 left-5 w-5 h-5 pointer-events-none fill-n-4/50 dark:fill-n-4/75 ${
          selectedOptions.length !== 0 && "hidden"
        }`}
        name="email"
      />
    </div>
  );
};

export default MultiSelect;

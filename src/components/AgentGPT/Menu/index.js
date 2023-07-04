import { Fragment } from "react";
import { Menu as MenuPrimitive, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

function Menu({ icon = null, name = "", items, chevron = true }) {
  return (
    <MenuPrimitive>
      <div className="relative">
        <MenuPrimitive.Button className="flex h-8 items-center gap-1 rounded-lg border border-white/30 dark:bg-[#3a3a3a] p-2 font-bold hover:border-[#1E88E5]/40 hover:bg-[#6b6b6b]s">
          <div>{icon}</div>
          {name && <p className="text-sm text-gray/50">{name}</p>}
          {chevron && <FaChevronDown size={15} className="ml-2" />}
        </MenuPrimitive.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <MenuPrimitive.Items className="absolute right-0 top-full p-2 z-20 mt-1 max-h-48 w-fit overflow-hidden rounded-xl border-2 border-white/10 dark:bg-[#3a3a3a] bg-n-2 shadow-xl hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] ">
            {items.map((item) => {
              const itemName = item.props.name;
              return (
                <MenuPrimitive.Item key={itemName} as={Fragment}>
                  <div className="w-full py-[1px] md:py-0.5">{item}</div>
                </MenuPrimitive.Item>
              );
            })}
          </MenuPrimitive.Items>
        </Transition>
      </div>
    </MenuPrimitive>
  );
}

export default Menu;

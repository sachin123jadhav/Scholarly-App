import React, { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";

import Icon from "../../Icon";

const NewsletterSection = ({
  title,
  newsletters,
  defaultOpen = false,
  handleSelectedNews = () => {},
}) => (
  <div className="border-t border-n-3 dark:border-n-6">
    <Disclosure defaultOpen={defaultOpen}>
      <Disclosure.Button className="flex w-full py-6 transition-colors h6 hover:text-primary-1 tap-highlight-color lg:hover:text-n-7 dark:lg:hover:text-n-1">
        <div className="relative shrink-0 w-8 h-8 mr-8 before:absolute before:top-1/2 before:l-1/2 before:w-4 before:h-0.5 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-n-6 before:rounded-full after:absolute after:top-1/2 after:l-1/2 after:w-0.5 after:h-4 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-n-6 after:rounded-full after:transition-transform after:ui-open:rotate-90 md:mr-6 dark:before:bg-n-3 dark:after:bg-n-3"></div>
        <div className="text-left">{title}</div>
        <div className="text-xs font-semibold text-n-6 dark:text-n-10">{newsletters.length}</div>
      </Disclosure.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-in"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Disclosure.Panel className="pb-6 -mt-4 base1 ">
          <div className="grid grid-cols-2 mx-6 md:grid-cols-1 gap-x-2">
            {newsletters?.map((item) => (
              <div
                className="group flex items-center mb-5 p-3.5 border border-n-3 rounded-xl h6 transition-all hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] 2xl:p-2.5 lg:p-3.5 dark:border-n-5 dark:hover:border-n-7 dark:hover:bg-n-7"
                onClick={() => handleSelectedNews(item)}
              >
                <p className="w-9/12 text-base font-semibold truncate md:text-sm">{item.topic}</p>
                <Icon
                  className="ml-auto transition-colors fill-n-4 group-hover:fill-n-7 dark:group-hover:fill-n-4"
                  name="arrow-next"
                />
              </div>
            ))}
          </div>
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  </div>
);

export default NewsletterSection;

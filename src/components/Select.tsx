import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export type Option = {
  label: string;
  value: string;
};

export type Options = Option[];

type SelectProps = {
  label: string;
  options: Options;
  onChange: (value: string) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ label, options, onChange }: SelectProps) {
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    if (selected) {
      onChange(selected.value);
    }
  }, [selected]);

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 space-y-1">
          <Listbox.Label>{label}</Listbox.Label>
          <Listbox.Button className=" flex justify-between items-center border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 outline-none ">
            <span className="block truncate text-sm">{selected.value}</span>
            <span className="pointer-events-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-10 mx-4 rounded-lg ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={option}>
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}>
                        {option.value}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-4 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

import React from "react";

type InputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...attributes }, ref) => {
    return (
      <label className=" flex flex-col space-y-1 w-full">
        <span className="text-base">{label}</span>
        <input
          ref={ref}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
          {...attributes}
        />
      </label>
    );
  }
);

export default Input;

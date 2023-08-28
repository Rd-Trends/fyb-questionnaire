import React from "react";

type TextAreaProps = {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label }, ref) => {
    return (
      <label className=" flex flex-col space-y-1 w-full">
        <span className=" text-base">{label}</span>
        <textarea
          ref={ref}
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
        />
      </label>
    );
  }
);

export default TextArea;

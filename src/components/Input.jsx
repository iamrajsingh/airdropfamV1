import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", isRequired = false, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col items-start">
      {label && (
        <label
          htmlFor={id}
          className="inline-block mb-1 pl-1 font-palanquin text-gray-400"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg shadow-inner bg-light-gray  text-pale-blue outline-none focus:border-brown duration-200 border focus:border-1 w-full ${className}`}
        ref={ref}
        required = {isRequired}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

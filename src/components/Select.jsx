import React, { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full shad">
      {label && (
        <label htmlFor={id} className="font-palanquin text-gray-400">
          {label}
          <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg text-pale-blue outline-none bg-light-gray focus:bg-light-gray duration-200 shadow-inner w-full ${className}`}
          >
            {options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
});

export default Select;

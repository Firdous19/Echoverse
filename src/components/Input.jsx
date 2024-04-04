import React from "react";

const Input = React.forwardRef(function Input(
  { label, type, name, value, className = "", ...props },
  ref
) {
  return (
    <div className="space-y-2">
      <div>{label && <label htmlFor={name}>{label}</label>}</div>
      <div>
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          value={value}
          className={`border-2 border-gray-200 rounded-md p-2 w-full ${className}`}
          {...props}
        />
      </div>
    </div>
  );
});

export default Input;

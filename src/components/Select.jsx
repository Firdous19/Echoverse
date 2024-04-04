import { forwardRef, useId } from "react";

function Select({ options = [], label, ...props }, ref) {
  const id = useId();
  return (
    <div className="space-y-4">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className="shadow-xl py-2 px-4 w-full rounded-md"
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);

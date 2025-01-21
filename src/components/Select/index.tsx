import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    title: string;
  }[];
  register?: any;
  name: string;
}

export function Select({
  name,
  options,
  register,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={`w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white ${className}`}
        {...register?.(name)}
        {...rest}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
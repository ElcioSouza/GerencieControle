"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  name: string;
  error?: any;
  control?: any;
  mask?: string;
}

export default function Input({
  name,
  register,
  type,
  control,
  mask,
  error = undefined,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {control && mask ? (
        <Controller
          control={control}
          name={name}
          render={({ field: { ref, ...field } }) => (
            <InputMask
              placeholder={rest.placeholder}
              value={field.value}
              onChange={field.onChange}
              maskChar=""
              autoComplete="off"
              className={`${
                error ? "border-secondary" : "border-primary"
              } w-full h-14 border focus:outline-none text-black sm:pr-12 pl-6 border-[#ddd] bg-[#fff] rounded-lg`}
              mask={mask}
            />
          )}
        />
      ) : (
        <input
          autoComplete="off"
          className={`${
            error ? "border-secondary" : "border-primary"
          } w-full h-14 border focus:outline-none text-black  rounded-lg pl-3 pr-5 sm:pr-12 `}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...register?.(name)}
          {...rest}
        />
      )}
      {type === "password" && (
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible color="#C6C6C6" size={20} />
          ) : (
            <AiOutlineEye color="#C6C6C6" size={20} />
          )}
        </div>
      )}
    </div>
  );
}
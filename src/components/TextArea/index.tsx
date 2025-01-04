import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: any;
  name: string;
  error?: any;
  className?: string;
}

export default function TextArea({
  name,
  register,
  className,
  error = undefined,
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={`w-full h-[9rem] resize-none pt-4 border focus:outline-none border-primary rounded-lg pl-3 pr-5 ${className}`}
      {...register?.(name)}
      {...rest}
    />
  );
}

import { FC, forwardRef } from "react";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email" | "password";

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  className?: string;
  disabled?: any;
  placeholder?: string;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      id,
      name,
      label,
      type = "text",
      className,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) {
    return (
      <input
        id={id}
        ref={ref}
        name={name}
        type={type}
        aria-label={label}
        className={className}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from "react-hook-form";
import { Input, InputProps } from "../atoms/Input";
import inputStyles from "../../styles/input.module.scss";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>> | undefined;
} & InputProps;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  register,
  name,
  rules,
  errors,
  className,
  disabled = false,
  label,
  ...props
}: FormInputProps<TFormValues>) => {
  return (
    <div className={inputStyles.inputContainer}>
      <div className={inputStyles.inputContainerHeader}>
        <div className={inputStyles.inputLabel}>
          <label htmlFor={name}>{label}</label>
        </div>
        {errors && (
          <div className={inputStyles.inputError}>{errors[name]?.message}</div>
        )}
      </div>
      <Input
        name={name}
        disabled={disabled}
        className={inputStyles.inputField}
        {...props}
        {...(register && register(name, rules))}
      />
    </div>
  );
};

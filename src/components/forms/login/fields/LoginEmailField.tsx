import { FC } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { LoginFormFields } from "../../../../types/form-fields";
import inputStyles from "../../../../styles/input.module.scss";

type Props = {
  register: UseFormRegister<LoginFormFields>;
  error?: FieldError;
};

export const LoginEmailField: FC<Props> = ({ register, error }) => (
  <div className={inputStyles.inputContainer}>
    <div className={inputStyles.inputContainerHeader}>
      <div className={inputStyles.inputLabel}>
        <label htmlFor="email">Email</label>
      </div>
      {error && <div className={inputStyles.inputError}>{error.message}</div>}
    </div>
    <input
      className={inputStyles.inputField}
      id="email"
      {...register("email", {
        required: "Required",
        maxLength: {
          value: 16,
          message: "16 Characters Max",
        },
        minLength: {
          value: 3,
          message: "3 Characters Min",
        },
      })}
    />
  </div>
);

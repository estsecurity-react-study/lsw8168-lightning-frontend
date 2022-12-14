import formStyles from "../../../styles/forms.module.scss";
import buttonStyles from "../../../styles/buttons.module.scss";
import { Button } from "../../buttons/Button";
import { LoginUsernameField } from "./fields/LoginUsernameField";
import { LoginPasswordField } from "./fields/LoginPasswordField";
import { useForm } from "react-hook-form";
import { LoginFormFields } from "../../../types/form-fields";

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormFields>();

  const onSubmit = (data: LoginFormFields) => {
    console.log(data);
  };

  return (
    <form
      className={formStyles.registerLoginForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginUsernameField register={register} error={errors.username} />
      <LoginPasswordField register={register} error={errors.password} />
      <Button className={buttonStyles.defaultButton}>Login</Button>
    </form>
  );
};

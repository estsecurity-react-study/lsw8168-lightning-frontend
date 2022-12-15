import { useForm } from "react-hook-form";
import { RegisterFormFields } from "../../../types/form-fields";
import { Button } from "../../buttons/Button";
import { UserNameField } from "./fields/UserNameField";
import { RegisterEmailField } from "./fields/RegisterEmailField";
import { RegisterPasswordField } from "./fields/RegisterPasswordField";
import buttonStyles from "../../../styles/buttons.module.scss";
import formStyles from "../../../styles/forms.module.scss";
import axios, { AxiosError } from "axios";

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormFields>({
    defaultValues: {
      username: "lsw8168",
      email: "test@google.com",
      password: "secret123123",
    },
  });

  const onSubmit = async (data: RegisterFormFields) => {
    console.log(data);
    try {
      const response = await axios.post(" /authentication/register", {
        name: data.username,
        email: data.email,
        password: data.password,
      });
      console.log("성공", response.data);
      return response.data;
    } catch (error: unknown) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        console.log(response.status, response.data);
        return { status: response.status, data: response.data };
      }
      throw error;
    }
  };

  return (
    <form
      className={formStyles.registerLoginForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <UserNameField register={register} error={errors.username} />
      <RegisterEmailField register={register} error={errors.email} />
      <RegisterPasswordField register={register} error={errors.password} />
      <Button className={buttonStyles.defaultButton}>Create Account</Button>
    </form>
  );
};

import formStyles from "../../../styles/forms.module.scss";
import buttonStyles from "../../../styles/buttons.module.scss";
import { useRouter } from "next/router";
import { Button } from "../../atoms/Button";
import { LoginEmailField } from "./fields/LoginEmailField";
import { LoginPasswordField } from "./fields/LoginPasswordField";
import { useForm } from "react-hook-form";
import { LoginFormFields } from "../../../types/form-fields";
import axios, { AxiosError } from "axios";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: "test@google.com",
      password: "secret123123",
    },
  });

  const onSubmit = async (data: LoginFormFields) => {
    try {
      const response = await axios.post(
        " /authentication/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        router.push("/me");
      }
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
      <LoginEmailField register={register} error={errors.email} />
      <LoginPasswordField register={register} error={errors.password} />
      <Button className={buttonStyles.defaultButton}>Login</Button>
    </form>
  );
};

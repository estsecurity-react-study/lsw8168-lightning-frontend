import formStyles from "~/styles/forms.module.scss";
import buttonStyles from "~/styles/buttons.module.scss";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Button } from "~/components/atoms/Button";
import { FormInput } from "~/components/molecules/FormInput";

type PasswordChangeFormFields = {
  password: string;
  passwordCheck: string;
};

export const PasswordChangeForm: NextPage = () => {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<PasswordChangeFormFields>();

  const onSubmit = async (data: PasswordChangeFormFields) => {
    const { password, passwordCheck } = data;

    try {
      const response = await axios.post(
        " /authentication/passwordChange",
        {
          password,
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
        if (response.status === 403) {
          router.push("/login");
        }
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
      <h3>비밀번호 변경</h3>
      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="새로운 비밀번호를 입력하세요."
        className="mb-2"
        register={register}
        rules={{
          required: "새로운 비밀번호를 입력하세요.",
          maxLength: {
            value: 32,
            message: "32 Characters Max",
          },
          minLength: {
            value: 8,
            message: "8 Characters Min",
          },
        }}
        errors={errors}
      />
      <FormInput
        id="passwordCheck"
        name="passwordCheck"
        label="Password 확인"
        type="password"
        placeholder="새로운 비밀번호를 한번 더 입력하세요."
        className="mb-2"
        register={register}
        rules={{
          required: "새로운 비밀번호를 한번 더 입력하세요.",
          maxLength: {
            value: 32,
            message: "32 Characters Max",
          },
          minLength: {
            value: 8,
            message: "8 Characters Min",
          },
          validate: (val: string) => {
            if (watch("password") != val) {
              return "PASSWORD가 일치하지 않습니다.";
            }
          },
        }}
        errors={errors}
      />
      <Button className={buttonStyles.defaultButton}>비밀번호 변경</Button>
    </form>
  );
};

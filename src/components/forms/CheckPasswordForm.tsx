import formStyles from "~/styles/forms.module.scss";
import buttonStyles from "~/styles/buttons.module.scss";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Button } from "~/components/atoms/Button";
import { FormInput } from "~/components/molecules/FormInput";

export const CheckPasswordForm: NextPage<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "secret1231231",
    },
  });

  const onSubmit = async ({ password }: any) => {
    if (!email) {
      return alert("이메일이 없습니다.");
    }
    try {
      const response = await axios.post(
        " /authentication/passwordCheck",
        {
          email,
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
        router.push("/me/ChangePassword");
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
      <h3>비밀번호 확인</h3>
      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
        placeholder="비밀번호를 입력하세요."
        className="mb-2"
        register={register}
        rules={{
          required: "비밀번호를 입력하세요.",
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
      <Button className={buttonStyles.defaultButton}>비밀번호 확인</Button>
    </form>
  );
};

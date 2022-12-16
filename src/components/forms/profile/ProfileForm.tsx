import formStyles from "../../../styles/forms.module.scss";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button";
import buttonStyles from "../../../styles/buttons.module.scss";
import { ProfileFormFields } from "../../../types/form-fields";
import { FormInput } from "../../molecules/FormInput";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

export const ProfileForm = ({ ...profile }) => {
  const router = useRouter();

  const { id, email, name, role, createdAt, updatedAt } = profile;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileFormFields>({
    defaultValues: {
      id: id,
      username: name,
      email: email,
      role: role.toUpperCase(),
      createdAt: dayjs(`${createdAt}`).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(`${updatedAt}`).format("YYYY-MM-DD HH:mm:ss"),
    },
  });

  const onChangePassword = () => {
    router.push("/me/changePassword");
  };

  const onSubmit = async (data: ProfileFormFields) => {
    const { email, username } = data;
    try {
      await axios.post(
        " /authentication/edit",
        {
          email,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      router.push("/me");
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        console.log(response.status, response.data);
        return { status: response.status, data: response.data };
      }
      throw error;
    }
  };

  return (
    <form className={formStyles.registerLoginForm}>
      <FormInput<ProfileFormFields>
        id="id"
        name="id"
        label="ID"
        className="mb-2"
        disabled
        register={register}
      />
      <FormInput<ProfileFormFields>
        id="email"
        name="email"
        label="Email"
        className="mb-2"
        disabled
        register={register}
      />
      <FormInput<ProfileFormFields>
        id="username"
        name="username"
        label="Name"
        placeholder="사용자 이름을 입력하세요."
        className="mb-2"
        register={register}
        rules={{
          required: "사용자 이름을 입력하세요.",
          maxLength: {
            value: 16,
            message: "16 Characters Max",
          },
          minLength: {
            value: 3,
            message: "3 Characters Min",
          },
        }}
        errors={errors}
      />
      <FormInput<ProfileFormFields>
        id="role"
        name="role"
        label="Role"
        className="mb-2"
        disabled
        register={register}
      />
      <FormInput<ProfileFormFields>
        id="createdAt"
        name="createdAt"
        label="createdAt"
        className="mb-2"
        disabled
        register={register}
      />
      <FormInput<ProfileFormFields>
        id="updatedAt"
        name="updatedAt"
        label="updatedAt"
        className="mb-2"
        disabled
        register={register}
      />
      <div className={formStyles.formNameContainer}>
        <Button
          className={buttonStyles.defaultButton}
          onClick={handleSubmit(onSubmit)}
        >
          저장
        </Button>
        <Button
          className={buttonStyles.defaultButton}
          onClick={handleSubmit(onChangePassword)}
        >
          비밀번호 수정
        </Button>
      </div>
    </form>
  );
};

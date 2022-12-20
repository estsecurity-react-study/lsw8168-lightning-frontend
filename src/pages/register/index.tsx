import { GetServerSideProps, NextPage } from "next";
import { RegisterForm } from "~/components/forms/register/RegisterForm";
import { getSession } from "~/Utilities/getSession";
import styles from "./index.module.scss";

const RegisterPage: NextPage = () => {
  return (
    <div className={styles.page}>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

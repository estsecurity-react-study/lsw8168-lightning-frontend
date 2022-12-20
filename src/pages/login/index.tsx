import { GetServerSideProps, NextPage } from "next";
import { LoginForm } from "~/components/forms/login/LoginForm";
import { getSession } from "~/Utilities/getSession";

const LoginPage: NextPage = () => {
  return (
    <div className="pageFlex">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/me",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};

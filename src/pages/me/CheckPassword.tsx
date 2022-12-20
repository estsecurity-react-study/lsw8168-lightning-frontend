import type { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { CheckPasswordForm } from "~/components/forms/CheckPasswordForm";
import { BasicLayout } from "~/components/layouts/BasicLayout";
import { ProfileFormFields } from "~/types/form-fields";
import { NextPageWithLayout } from "~/types/index";
import { getSession } from "~/Utilities/getSession";

const CheckPassword: NextPageWithLayout<{ user: ProfileFormFields }> = ({
  user,
}) => {
  const { email } = user;
  return (
    <div className="pageFlex">
      <CheckPasswordForm email={email} />
    </div>
  );
};

export default CheckPassword;

CheckPassword.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: { user: session.data },
  };
};

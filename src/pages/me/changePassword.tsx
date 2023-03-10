import type { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { PasswordChangeForm } from "~/components/forms/PasswordChangeForm";
import { BasicLayout } from "~/components/layouts/BasicLayout";
import { ProfileFormFields } from "~/types/form-fields";
import { NextPageWithLayout } from "~/types/index";
import { getSession } from "~/Utilities/getSession";

const ChangePassword: NextPageWithLayout<{ user: ProfileFormFields }> = ({
  user,
}) => {
  return (
    <div className="pageFlex">
      <PasswordChangeForm />
    </div>
  );
};

export default ChangePassword;

ChangePassword.getLayout = function getLayout(page: ReactElement) {
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

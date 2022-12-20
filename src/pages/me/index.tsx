import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import { ProfileForm } from "~/components/forms/profile/ProfileForm";

const Me: NextPage<{ profile: any }> = ({ profile }) => {
  return (
    <div className="pageFlex">
      <ProfileForm {...profile} />
    </div>
  );
};

export default Me;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await axios.get("http://localhost:3000/authentication", {
      headers: {
        ...(context.req?.headers as any),
      },
      withCredentials: true,
    });
    if (response && response.status === 200) {
      return { props: { profile: response.data } };
    }
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { profile: {} },
  };
};

import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "../../Utilities/getSession";

const ChangePassword: NextPage = ({ user }: any) => {
  console.log(user);
  return <div className="pageFlex">비밀번호 변경</div>;
};

export default ChangePassword;

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

  // return { props: { session } };
  // try {
  //   const response = await axios.get("http://localhost:3000/authentication", {
  //     headers: {
  //       ...(context.req?.headers as any),
  //     },
  //     withCredentials: true,
  //   });
  //   if (response.status === 200) {
  //     return { props: { profile: response.data } };
  //   }
  // } catch (error) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/login",
  //     },
  //     props: {},
  //   };
  // }
  // return { props: {} };
};

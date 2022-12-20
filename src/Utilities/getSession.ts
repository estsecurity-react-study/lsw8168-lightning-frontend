import axios from "axios";
import { GetServerSidePropsContext } from "next";

export const getSession = async (context: GetServerSidePropsContext) => {
  return axios
    .get("http://localhost:3000" + "/authentication", {
      withCredentials: true,
      headers: {
        ...(context.req?.headers as any),
      },
    })
    .then((response) => Promise.resolve(response))
    .catch((error) => {
      console.log(error.response.data);
      return null;
    });
};

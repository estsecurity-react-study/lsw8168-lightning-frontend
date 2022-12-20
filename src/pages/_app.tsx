import { Header } from "~/components/layouts/Header";
import "~/styles/globals.css";
import { AppPropsWithLayout } from "~/types/index";

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

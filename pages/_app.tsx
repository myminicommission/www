import { AppProps /*, AppContext */ } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const user = {
    avatar:
      "https://en.gravatar.com/userimage/463192/8a7f7125f6de54e9b2f07a71c5052639.png",
    nickname: "ExtremeModeration",
  };
  return (
    <div className="mx-auto">
      <Header user={user} />
      <Component {...pageProps} />
    </div>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;

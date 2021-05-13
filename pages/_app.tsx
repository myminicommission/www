import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import { AppProps /*, AppContext */ } from "next/app";
import { withUrqlClient } from "next-urql";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp(props: AppProps) {
  return (
    <UserProvider>
      <ContentWrapper {...props} />
    </UserProvider>
  );
}

function ContentWrapper({ Component, pageProps }: AppProps) {
  const { user, error, isLoading } = useUser();

  if (error) console.error(error);

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

export default withUrqlClient(() => ({
  url: "/api/graphql",
  requestPolicy: "cache-and-network",
}))(MyApp);

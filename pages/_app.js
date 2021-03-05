import Link from "next/link";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
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

export default MyApp;

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { useUser } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Box from "../../components/Box";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = `
query GetUser($nickname: String!) {
  userWithNickname(nname: $nickname) {
    name
    picture
  }
}
`;

function Profile() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [result] = useQuery({
    pause: !router.query.nickname,
    query: USER_WITH_NICKNAME_QUERY,
    variables: {
      nickname: router.query.nickname,
    },
  });

  if (!router.query.nickname || result.fetching || isLoading) {
    // TODO: Do a better job with this loading fragment...
    return <div>Loading...</div>;
  }

  if (!result.data) {
    return (
      <div>
        <Head>
          <title>
            User {router.query.nickname} not found! - My Mini Commission
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* TODO: create a user specific 404 page rather than using the generic one */}
        <FourOhFour />
      </div>
    );
  }

  const { name, picture } = result.data.userWithNickname;

  return (
    <div>
      <Head>
        <title>{name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        {/* main grid */}
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div className="grid grid-cols-4 gap-4 lg:gap-8 col-span-1 md:col-span-2">
            {/* User Info */}
            <Box
              className="col-span-4 md:col-span-1 h-full"
              header={
                <div className="text-center p-6  border-b border-gray-600">
                  {picture && (
                    <img
                      className="h-24 w-24 rounded-full mx-auto"
                      src={picture}
                      alt={name}
                    />
                  )}
                  <p className="pt-2 text-lg font-semibold">{name}</p>
                  {user && user.nickname === router.query.nickname && (
                    <div className="mt-5">
                      <Link href={`/${user.nickname}/edit`}>
                        <a className="border rounded-full py-2 px-4 text-xs font-semibold">
                          Manage your Account
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              }
            >
              <div className="border-b border-gray-600">
                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div>
                    <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Facebook
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div>
                    <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Instagram
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div>
                    <FontAwesomeIcon icon={faTwitch} className="w-4 h-4" />
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Twitch
                    </p>
                  </div>
                </a>

                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div>
                    <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Twitter
                    </p>
                  </div>
                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Contact Me
                    </p>
                  </div>
                </a>
                <a
                  href="#"
                  className="px-4 py-2 hover:bg-gray-900 flex no-underline hover:no-underline"
                >
                  <div className="text-green-600">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium leading-none text-gray-200">
                      Hire Me
                    </p>
                  </div>
                </a>

                {user && user.nickname === router.query.nickname && (
                  <Link href="/api/auth/logout">
                    <a className="px-4 py-2 pb-4 hover:bg-gray-900 flex no-underline hover:no-underline border-t border-gray-600">
                      <p className="text-sm font-medium leading-none text-red-500">
                        Logout
                      </p>
                    </a>
                  </Link>
                )}
              </div>
            </Box>
            {/* Gallery */}
            <Box
              header="Gallery"
              className="col-span-4 md:col-span-3 h-full p-8 lg:p-16"
            >
              Coming soon!
            </Box>
          </div>
        </div>
      </div>

      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-8">
          <Box header="Reviews" className="p-8 lg:p-16">
            Coming soon!
          </Box>
        </div>
      </div>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: "/api/graphql",
}))(Profile);

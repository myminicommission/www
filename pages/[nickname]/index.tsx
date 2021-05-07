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
    forHire
    socials {
      facebook
      instagram
      twitch
      twitter
    }
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

  const { name, picture, socials, forHire } = result.data.userWithNickname;

  return (
    <div>
      <Head>
        <title>{name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        {/* main grid */}
        <div className="grid grid-cols-1 gap-4 mx-auto my-0 max-w-none lg:max-w-7xl lg:my-8 md:grid-cols-2 lg:gap-8">
          <div className="grid grid-cols-4 col-span-1 gap-4 lg:gap-8 md:col-span-2">
            {/* User Info */}
            <Box
              className="h-full col-span-4 md:col-span-1"
              header={
                <div className="p-6 text-center border-b border-gray-600">
                  {picture && (
                    <img
                      className="w-24 h-24 mx-auto rounded-full"
                      src={picture}
                      alt={name}
                    />
                  )}
                  <p className="pt-2 text-lg font-semibold">{name}</p>
                  {forHire && (
                    <div className="w-full mt-5">
                      <Link href={`/${user.nickname}/edit`}>
                        <a className="block w-full px-4 py-2 font-semibold bg-green-900 border border-green-500 hover:border-green-200 hover:bg-green-700 hover:no-underline">
                          Hire Me
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              }
            >
              {socials && (
                <div>
                  {socials.facebook && (
                    <a
                      href={socials.facebook}
                      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="pl-3">
                        <p className="text-sm font-medium leading-none text-gray-200">
                          Facebook
                        </p>
                      </div>
                    </a>
                  )}

                  {socials.instagram && (
                    <a
                      href={socials.instagram}
                      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
                    >
                      <div>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="w-4 h-4"
                        />
                      </div>
                      <div className="pl-3">
                        <p className="text-sm font-medium leading-none text-gray-200">
                          Instagram
                        </p>
                      </div>
                    </a>
                  )}

                  {socials.twitch && (
                    <a
                      href={socials.twitch}
                      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
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
                  )}

                  {socials.twitter && (
                    <a
                      href={socials.twitter}
                      className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
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
                  )}
                </div>
              )}

              <div>
                <a
                  href="#"
                  className="flex px-4 py-2 no-underline hover:bg-gray-900 hover:no-underline"
                >
                  <div>
                    <svg
                      className="w-4 h-4"
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

                {user && user.nickname === router.query.nickname && (
                  <div className="border-t border-gray-600">
                    <Link href={`/${user.nickname}/edit`}>
                      <a className="flex px-4 py-2 pb-4 text-gray-200 no-underline hover:bg-gray-900 hover:no-underline">
                        <p className="text-sm font-medium leading-none">
                          Manage Your Account
                        </p>
                      </a>
                    </Link>

                    <Link href="/api/auth/logout">
                      <a className="flex px-4 py-2 pb-4 no-underline hover:bg-gray-900 hover:no-underline">
                        <p className="text-sm font-medium leading-none text-red-500">
                          Logout
                        </p>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </Box>
            {/* Gallery */}
            <Box
              header="Gallery"
              className="h-full col-span-4 p-8 md:col-span-3 lg:p-16"
            >
              Coming soon!
            </Box>
          </div>
        </div>
      </div>

      <div className="lg:px-4">
        <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-8">
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

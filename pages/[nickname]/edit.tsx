import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import Box from "../../components/Box";
import { useQuery } from "urql";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = `
query GetUser($nickname: String!) {
  userWithNickname(nname: $nickname) {
    name
    picture
  }
}
`;

function ProfileEditor() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const [result] = useQuery({
    pause: !router.query.nickname,
    query: USER_WITH_NICKNAME_QUERY,
    variables: {
      nickname: router.query.nickname,
    },
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!router.query.nickname || result.fetching || isLoading) {
    // TODO: Do a better job with this loading fragment...
    return <div>Loading...</div>;
  }

  if (user.nickname !== router.query.nickname) {
    router.push(`/${router.query.nickname}`);
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
        <title>Edit {name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-2xl mx-auto my-0 lg:my-8">
          <Box
            header="Manage Account"
            subheader={`${router.query.nickname}`}
            className="p-6"
          >
            <div>
              <div className="flex max-w-sm w-full shadow-md rounded-lg overflow-hidden mx-auto">
                <div className="w-2 bg-gray-800"></div>

                <div className="flex items-center px-2 py-3">
                  <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Display Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="text"
                          value={name}
                        />
                        <p className="text-gray-400 text-xs italic">
                          Make it as long and as crazy as you'd like
                        </p>
                      </div>
                    </div>

                    {/*  */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-first-name"
                        >
                          First Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Jane"
                        />
                        <p className="text-red-500 text-xs italic">
                          Please fill out this field.
                        </p>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-last-name"
                        >
                          Last Name
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="password"
                          placeholder="******************"
                        />
                        <p className="text-gray-400 text-xs italic">
                          Make it as long and as crazy as you'd like
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-city"
                        >
                          City
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          type="text"
                          placeholder="Albuquerque"
                        />
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          State
                        </label>
                        <div className="relative">
                          <select
                            className="block appearance-none w-full bg-gray-700 border border-gray-200 text-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option>New Mexico</option>
                            <option>Missouri</option>
                            <option>Texas</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-200 text-xs font-bold mb-2"
                          htmlFor="grid-zip"
                        >
                          Zip
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-700 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="text"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: "/api/graphql",
}))(ProfileEditor);

import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "../../components/Box";
import { withUrqlClient } from "next-urql";
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
    return error;
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
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div className="grid grid-cols-4 gap-4 lg:gap-8 col-span-1 md:col-span-2">
            <Box
              header={
                <h1 className="text-2xl lg:text-4xl font-medium mb-2 flex flex-row">
                  {picture && (
                    <img
                      src={picture}
                      alt={name}
                      className="rounded-full w-10 h-10 lg:w-14 lg:h-14 mr-3"
                    />
                  )}
                  <span>Edit {name}</span>
                </h1>
              }
              className="col-span-4 md:col-span-3 h-full"
            >
              Welcome to my profile page!
            </Box>

            <Box header="Socials" className="col-span-4 md:col-span-1 h-full">
              Coming soon!
            </Box>
          </div>

          <Box header="Reviews">Coming soon!</Box>

          <Box header="Gallery">Coming soon!</Box>
        </div>
      </div>
    </div>
  );
}

export default withUrqlClient(() => ({
  url: "/api/graphql",
}))(ProfileEditor);

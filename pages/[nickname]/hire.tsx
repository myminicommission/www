import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { gql } from "@urql/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import Box from "../../components/Box";
import TextInput from "../../components/input/TextInput";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = gql`
  query GetUser($nickname: String!) {
    userWithNickname(nname: $nickname) {
      name
      forHire
    }
  }
`;

function Hire() {
  const { user, isLoading } = useUser();
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

  const { nickname } = router.query;
  const { name, forHire } = result.data.userWithNickname;

  if (!forHire) {
    router.push(`/${nickname}`);
    return <></>;
  }

  return (
    <div>
      <div className="lg:px-4">
        <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-8">
          <Box
            header={`Hire ${name}`}
            subheader={`${nickname}`}
            className="p-8 lg:p-16"
          >
            <TextInput
              id="displayName"
              label="Requested By"
              defaultValue={user.name}
              disabled
              onChange={(e) => console.log(e)}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default withPageAuthRequired(Hire);

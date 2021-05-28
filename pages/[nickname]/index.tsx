import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery, gql } from "urql";
import { useUser } from "@auth0/nextjs-auth0";
import Box from "../../components/Box";
import FourOhFour from "../404";
import ProfileInfoPanel from "../../components/profile/ProfileInfoPanel";
import PageLoader from "../../components/PageLoader";
import { Card, Col, Grid, Paper, Text, Title } from "@mantine/core";
import Page from "../../components/Page";

const USER_WITH_NICKNAME_QUERY = gql`
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
    return <PageLoader />;
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
  const { name } = result.data.userWithNickname;

  return (
    <div>
      <Head>
        <title>{name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <Grid grow gutter="xl">
          {/* User Info */}
          <Col span={3}>
            <ProfileInfoPanel
              router={router}
              user={user}
              profile={{ ...result.data.userWithNickname, nickname }}
            />
          </Col>

          {/* Gallery */}
          <Col span={9}>
            <Paper padding="md" shadow="xs">
              <Title order={3}>Gallery</Title>
              <Text>Coming soon!</Text>
            </Paper>
          </Col>
        </Grid>

        <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-8">
          <Paper padding="md" shadow="xs">
            <Title order={3}>Reviews</Title>
            <Text>Coming soon!</Text>
          </Paper>
        </div>
      </Page>
    </div>
  );
}

export default Profile;

import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Box from "../components/Box";

type ProfileProps = {
  id: string;
  nickname: string;
  name: string;
};

export default function Profile({ id, nickname, name }: ProfileProps) {
  return (
    <div>
      <Head>
        <title>{name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        <div className="max-w-none lg:max-w-7xl mx-auto my-0 lg:my-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div className="grid grid-cols-4 gap-4 lg:gap-8 col-span-1 md:col-span-2">
            <Box
              header={name}
              subheader={nickname}
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

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_SERVER_URL,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetUser($nickname: String!) {
        userWithNickname(nname: $nickname) {
          id
          nickname
          name
        }
      }
    `,
    variables: {
      nickname: context.params.nickname,
    },
  });

  return {
    props: {
      ...data.userWithNickname,
    },
  };
}

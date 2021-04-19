import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "../components/Box";
import { withUrqlClient } from "next-urql";
import { ssrExchange, useQuery } from "urql";
import FourOhFour from "./404";

function Profile() {
  const router = useRouter();
  const [result] = useQuery({
    pause: !router.query.nickname,
    query: `
    query GetUser($nickname: String!) {
      userWithNickname(nname: $nickname) {
        id
        nickname
        name
      }
    }
  `,
    variables: {
      nickname: router.query.nickname,
    },
  });

  const { nickname } = router.query;

  if (!nickname || result.fetching) {
    return <div>Loading...</div>;
  }

  if (!result.data) {
    return (
      <div>
        <Head>
          <title>User {nickname} not found! - My Mini Commission</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <FourOhFour />
      </div>
    );
  }

  const { name, id } = result.data.userWithNickname;

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
              subheader={`${nickname}`}
              className="col-span-4 md:col-span-3 h-full"
            >
              Welcome to my profile page!
              <Link href="/testuser1">Test User 1</Link>
              <Link href="/testuser2">Test User 2</Link>
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

export default withUrqlClient(
  (ssr, ctx) => {
    const p = {
      url: `${process.env.GRAPHQL_SERVER_URL}`,
    };
    console.log(p, ctx);
    return p;
  },
  { ssr: false }
)(Profile);

// export async function getServerSideProps(context) {
//   const ssrCache = ssrExchange({ isClient: true });
//   return {
//     props: {
//       urqlState: {
//         ...ssrCache.extractData(),
//         url: process.env.GRAPHQL_SERVER_URL,
//       },
//     },
//   };
// }

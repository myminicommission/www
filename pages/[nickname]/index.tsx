import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, gql } from "urql";
import { useUser } from "@auth0/nextjs-auth0";
import FourOhFour from "../404";
import {
  ContactMeLink,
  PanelHeader,
  SocialLinkList,
} from "../../components/profile/ProfileInfoPanel";
import PageLoader from "../../components/PageLoader";
import Page from "../../components/Page";
import { Paper } from "../../components/containers";
import Divider from "../../components/Divider";
import { StatusBadge } from "../../components/commission/status";

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

const MY_COMMISSION_QUERY = gql`
  {
    myCommissions {
      id
      artist {
        name
        nickname
        picture
      }
      patron {
        name
        nickname
        picture
      }
      status
      minis {
        id
        price
        quantity
        notes
        name
        size
      }
      total
      discussionItems {
        author {
          name
          nickname
          picture
        }
        body
        createdAt
        updatedAt
      }
    }
  }
`;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isMe(query, user): boolean {
  return query.nickname && user && user.nickname === query.nickname;
}

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

  const [myCommissionsResult] = useQuery({
    pause: !isMe(router.query, user),
    query: MY_COMMISSION_QUERY,
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
  const profile = { ...result.data.userWithNickname, nickname };

  return (
    <div>
      <Head>
        <title>{name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* User Info */}
          <div className="lg:col-span-3">
            <Paper>
              <Paper.Content>
                <PanelHeader
                  forHire={profile.forHire}
                  name={name}
                  nickname={nickname}
                  picture={profile.picture}
                />
                {profile?.socials && (
                  <SocialLinkList socials={profile.socials} />
                )}
              </Paper.Content>

              <Divider />

              <div>
                {/* Contact Me Link */}
                <ContactMeLink />
              </div>
            </Paper>
          </div>

          {/* Gallery */}
          <div className="lg:col-span-9">
            <Paper className="h-full">
              <Paper.Content>
                <h2 className="text-2xl font-bold">Gallery</h2>
                <p>Coming soon!</p>
              </Paper.Content>
            </Paper>
          </div>
        </div>
        {!myCommissionsResult.fetching &&
          isMe(router.query, user) &&
          myCommissionsResult?.data?.myCommissions && (
            <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-6">
              <div className="flex gap-6">
                <div
                  className={classNames(
                    myCommissionsResult.data.myCommissions.filter(
                      (c) => c.artist.nickname === user.nickname
                    ).length > 0
                      ? "flex-none lg:flex-1"
                      : "hidden"
                  )}
                >
                  <Paper>
                    <Paper.Content>
                      <h2 className="text-2xl font-bold">Commissioned</h2>
                      <ul>
                        {myCommissionsResult.data.myCommissions
                          .filter((c) => c.artist.nickname === user.nickname)
                          .map((commission) => (
                            <Link
                              key={commission.id}
                              href={`/commission/${commission.id}`}
                            >
                              <a>
                                <li>
                                  <StatusBadge status={commission.status} />{" "}
                                  <span>
                                    Painting {commission.minis.length} minis for{" "}
                                    {commission.patron.name}
                                  </span>
                                </li>
                              </a>
                            </Link>
                          ))}
                      </ul>
                    </Paper.Content>
                  </Paper>
                </div>

                <div
                  className={classNames(
                    myCommissionsResult.data.myCommissions.filter(
                      (c) => c.patron.nickname === user.nickname
                    ).length > 0
                      ? "flex-none lg:flex-1"
                      : "hidden"
                  )}
                >
                  <Paper>
                    <Paper.Content>
                      <h2 className="text-2xl font-bold">Commissioning</h2>
                      <ul>
                        {myCommissionsResult.data.myCommissions
                          .filter((c) => c.patron.nickname === user.nickname)
                          .map((commission) => (
                            <Link
                              key={commission.id}
                              href={`/commission/${commission.id}`}
                            >
                              <a>
                                <li>
                                  <StatusBadge status={commission.status} />{" "}
                                  <span>
                                    {commission.artist.name} to paint{" "}
                                    {commission.minis.length} minis
                                  </span>
                                </li>
                              </a>
                            </Link>
                          ))}
                      </ul>
                    </Paper.Content>
                  </Paper>
                </div>
              </div>
            </div>
          )}

        <div className="mx-auto my-0 max-w-none lg:max-w-7xl lg:my-6">
          <Paper>
            <Paper.Content>
              <h2 className="text-2xl font-bold">Reviews</h2>
              <p>Coming soon!</p>
            </Paper.Content>
          </Paper>
        </div>
      </Page>
    </div>
  );
}

export default Profile;

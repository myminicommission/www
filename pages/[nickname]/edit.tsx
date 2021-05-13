import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import Box from "../../components/Box";
import { gql, useQuery, useMutation } from "urql";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = gql`
  query GetUser($nickname: String!) {
    userWithNickname(nname: $nickname) {
      id
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

const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      success
    }
  }
`;

type TextInputProps = {
  id: string;
  label: string;
  defaultValue: string | null;
  onChange: ChangeEventHandler;
  hint?: string;
};
function TextInput({
  id,
  label,
  defaultValue,
  hint,
  onChange,
}: TextInputProps) {
  return (
    <div className="flex flex-wrap mb-6 -mx-3">
      <div className="w-full px-3">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-200 uppercase"
          htmlFor={`${id}Field`}
        >
          {label}
        </label>
        <input
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-200 bg-gray-700 border border-gray-200 rounded "
          id={`${id}Field`}
          type="text"
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {hint && <p className="text-xs italic text-gray-400">{hint}</p>}
      </div>
    </div>
  );
}

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
  const [updateProfileResult, updateProfile] = useMutation(
    UPDATE_PROFILE_MUTATION
  );
  const [displayNameValue, setDisplayNameValue] = useState("");
  const [forHireValue, setForHireValue] = useState(false);
  const [facebookValue, setFacebookValue] = useState(null);
  const [instagramValue, setInstagramValue] = useState(null);
  const [twitchValue, setTwitchValue] = useState(null);
  const [twitterValue, setTwitterValue] = useState(null);

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

  const { id, name, picture, forHire, socials } = result.data.userWithNickname;

  const handleSaveClick = async () => {
    // grab the existing values
    const data = {
      id,
      name,
      forHire,
      socials: {
        facebook: socials.facebook,
        instagram: socials.instagram,
        twitch: socials.twitch,
        twitter: socials.twitter,
      },
    };

    // override values if they are different
    if (displayNameValue !== "" && displayNameValue !== name) {
      data.name = displayNameValue;
    }

    if (forHire !== forHireValue) {
      data.forHire = forHireValue;
    }

    if (
      facebookValue &&
      facebookValue !== "" &&
      facebookValue !== socials.facebook
    ) {
      data.socials.facebook = facebookValue;
    }

    if (
      instagramValue &&
      instagramValue !== "" &&
      instagramValue !== socials.instagram
    ) {
      data.socials.instagram = instagramValue;
    }

    if (twitchValue && twitchValue !== "" && twitchValue !== socials.twitch) {
      data.socials.twitch = twitchValue;
    }

    if (
      twitterValue &&
      twitterValue !== "" &&
      twitterValue !== socials.twitter
    ) {
      data.socials.twitter = twitterValue;
    }

    await updateProfile({
      input: data,
    });

    router.push(`/${user.nickname}`);
  };

  return (
    <div>
      <Head>
        <title>Edit {name} - My Mini Commission</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="lg:px-4">
        <div className="mx-auto my-0 max-w-none lg:max-w-2xl lg:my-8">
          <Box
            header="Manage Account"
            subheader={`${router.query.nickname}`}
            className="p-6"
          >
            <div>
              <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg">
                <div className="flex items-center w-full px-2 py-3">
                  <div className="w-full max-w-lg">
                    <Box header="Details" className="shadow-none">
                      <TextInput
                        id="displayName"
                        label="Display Name"
                        defaultValue={name}
                        onChange={(e: ChangeEvent) =>
                          setDisplayNameValue(
                            (e.target as HTMLInputElement).value
                          )
                        }
                      />

                      <div className="flex flex-wrap mb-6 -mx-3">
                        <div className="w-full px-3">
                          <label
                            className="block mb-2 text-xs font-bold tracking-wide text-gray-200 uppercase"
                            htmlFor="forHire"
                          >
                            For Hire?
                          </label>
                          <input
                            className="block px-3 py-3 mb-3 leading-tight bg-gray-700 border border-gray-200 rounded"
                            id="forHire"
                            type="checkbox"
                            defaultChecked={forHire}
                            onChange={(e) => setForHireValue(e.target.checked)}
                          />
                        </div>
                      </div>
                    </Box>

                    <Box
                      header="Socials"
                      className="pt-4 border-t border-gray-700 shadow-none"
                    >
                      <TextInput
                        id="facebook"
                        label="Facebook"
                        hint="https://facebook.com/your_user_name"
                        defaultValue={socials?.facebook}
                        onChange={(e: ChangeEvent) =>
                          setFacebookValue((e.target as HTMLInputElement).value)
                        }
                      />

                      <TextInput
                        id="instagram"
                        label="Instagram"
                        onChange={(e) =>
                          setInstagramValue(
                            (e.target as HTMLInputElement).value
                          )
                        }
                        defaultValue={socials?.instagram}
                        hint="https://instagram.com/your_user_name"
                      />

                      <TextInput
                        id="twitch"
                        label="Twitch"
                        onChange={(e) =>
                          setTwitchValue((e.target as HTMLInputElement).value)
                        }
                        defaultValue={socials?.twitch}
                        hint="https://twitch.tv/your_user_name"
                      />

                      <TextInput
                        id="twitter"
                        label="Twitter"
                        onChange={(e) =>
                          setTwitterValue((e.target as HTMLInputElement).value)
                        }
                        defaultValue={socials?.twitter}
                        hint="https://twitter.com/your_user_name"
                      />
                    </Box>

                    <Box
                      header={<></>}
                      className="pt-8 border-t border-gray-700 shadow-none"
                    >
                      <div className="w-full">
                        <button
                          className="w-full px-4 py-2 text-lg font-semibold tracking-wider text-white bg-blue-500 rounded hover:bg-blue-600"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                      </div>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;

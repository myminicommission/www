import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Button,
  Col,
  Divider,
  Grid,
  NumberInput,
  Paper,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { gql } from "@urql/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import Field from "../../components/form/Field";
import Page from "../../components/Page";
import PageLoader from "../../components/PageLoader";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = gql`
  query GetUser($nickname: String!) {
    userWithNickname(nname: $nickname) {
      name
      forHire
    }
  }
`;

const games = [
  { value: "wh40k", label: "Warhammer: 40,000" },
  { value: "whaos", label: "Warhammer: Age of Sigmar" },
  { value: "swlegion", label: "Star Wars: Legion" },
  { value: "infinity", label: "Infinity" },
];

const minis = {
  wh40k: [{ value: "drukhari-raider", label: "Drukhari: Raider" }],
  whaos: [
    {
      value: "slaanesh-exalted-seeker-chariot",
      label: "Exalted Seeker Chariot",
    },
  ],
  swlegion: [{ value: "empire-at-st", label: "Empire: AT-ST" }],
  infinity: [
    {
      value: "raoul-spector-mercenary-operative",
      label: "Raoul Spector, Mercenary Operative",
    },
  ],
};

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
  const [selectedGame, setSelectedGame] = useState({
    value: "none",
    label: "Select Game...",
  });
  const [gameMinis, setGameMinis] = useState([]);

  // when the selected game changes, fetch the related minis
  useEffect(() => {
    if (selectedGame.value !== "none") {
      setGameMinis(minis[selectedGame.value]);
    }
  }, [selectedGame, setGameMinis]);

  if (!router.query.nickname || result.fetching || isLoading) {
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
  const { name, forHire } = result.data.userWithNickname;

  if (!forHire) {
    router.push(`/${nickname}`);
    return <PageLoader />;
  }

  const handleGameChange = ({ target }) => {
    const { value } = target;

    // find the game
    const matches = games.filter((game) => game.value === value);
    if (matches.length === 1) {
      setSelectedGame(matches[0]);
    }
  };

  return (
    <Page>
      <Paper padding="md" shadow="xs">
        <Title order={2}>Hire {name}</Title>
        <Title order={4}>{nickname}</Title>

        <Divider />

        <Field>
          <TextInput label="Requested By" disabled defaultValue={user.name} />
        </Field>

        <Field>
          <Select
            data={games.sort((a, b) => (a.label > b.label ? 1 : -1))}
            placeholder="Select a game..."
            label="Game"
            description="To which game do the minis belong?"
            required
            value={selectedGame.value !== "none" ? selectedGame.value : null}
            onChange={handleGameChange}
          />
        </Field>

        <Field>
          <Grid align="flex-end">
            <Col span={9}>
              <Select
                disabled={!gameMinis.length}
                data={gameMinis.sort((a, b) => (a.label > b.label ? 1 : -1))}
                placeholder="Select a mini..."
                label="Add a Mini"
                description="Select the mini you want to add to the commission"
                required
              />
            </Col>
            <Col span={2}>
              <NumberInput
                defaultValue={1}
                placeholder="Quantity"
                label="Quantity"
                description="Number of these minis to add"
                required
              />
            </Col>
            <Col span={1}>
              <Button size="lg">Add</Button>
            </Col>
          </Grid>
        </Field>
      </Paper>
    </Page>
  );
}

export default withPageAuthRequired(Hire);

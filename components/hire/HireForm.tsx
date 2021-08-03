import { Col, Grid, Loader } from "@mantine/core";
import { gql, OperationContext } from "@urql/core";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { LineItem } from "../../types/hire";
import { Button } from "../buttons";
import { NumberInput, Option, Select } from "../form";
import Field from "../form/Field";

const GAMES_QUERY = gql`
  {
    games {
      id
      name
    }
  }
`;

const MINIS_QUERY = gql`
  query GetGameMinis($id: ID!) {
    gameMinis(game: $id) {
      id
      name
    }
  }
`;

type GameMini = {
  name: string;
  id: string;
};

type HireFormProps = {
  onItemAdded: (item: LineItem) => void;
};

const defaultSelectedMini = {
  value: "none",
  label: "Select Mini...",
};

function sortByName(data) {
  return data.sort((a, b) => (a.name > b.name ? 1 : -1));
}

export default function HireForm({ onItemAdded }: HireFormProps) {
  const [gameMinis, setGameMinis] = useState<Array<GameMini>>([]);
  const [selectedGame, setSelectedGame] = useState({
    value: "none",
    label: "Select Game...",
  });
  const [selectedMini, setSelectedMini] = useState(defaultSelectedMini);
  const [selectedQty, setSelectedQty] = useState(1);

  // query hooks
  const [gamesResult] = useQuery({ query: GAMES_QUERY });
  const [minisResult, reexecuteMinisQuery] = useQuery({
    query: MINIS_QUERY,
    variables: { id: selectedGame.value },
    pause: selectedGame.value === "none" || gamesResult.fetching,
    requestPolicy: "cache-first",
  });

  // when the selected game changes, fetch the related minis
  useEffect(() => {
    if (selectedGame.value !== "none") {
      const opts: Partial<OperationContext> = {
        variables: { id: selectedGame.value },
      };
      reexecuteMinisQuery(opts);
      setSelectedMini(defaultSelectedMini);
      setSelectedQty(1);
    }
  }, [selectedGame, reexecuteMinisQuery]);

  // watch for the game minis to load
  useEffect(() => {
    if (!minisResult?.fetching && minisResult?.data) {
      setGameMinis(sortByName(minisResult.data.gameMinis));
    }
  }, [minisResult, setGameMinis, sortByName]);

  if (gamesResult.fetching) {
    return <Loader />;
  }

  const games = sortByName(gamesResult.data.games);

  const handleGameChange = ({ target }) => {
    const { value } = target;

    // find the game
    const matches = games.filter((game) => game.id === value);
    if (matches.length === 1) {
      const selected = {
        value: matches[0].id,
        label: matches[0].name,
      };
      setSelectedGame(selected);
    }
  };

  const handleMiniChange = ({ target }) => {
    const { value } = target;

    // find the mini
    const matches = gameMinis.filter((mini) => mini.id === value);
    if (matches.length === 1) {
      const selected = {
        value: matches[0].id,
        label: matches[0].name,
      };
      setSelectedMini(selected);
    }
  };

  const handleMiniAddClick = () => {
    // craft a new line item
    const lineItem: LineItem = {
      game: selectedGame,
      mini: selectedMini,
      qty: selectedQty,
    };

    // reset the selections
    setSelectedQty(1);
    setSelectedMini(defaultSelectedMini);

    // call the handler
    onItemAdded(lineItem);
  };

  return (
    <div>
      <Field>
        <Select
          label="Game"
          required
          onChange={handleGameChange}
          disabled={gamesResult.fetching}
          value={selectedGame.value}
        >
          <Option disabled value="none">
            Select a game...
          </Option>
          {games.map((game) => (
            <Option key={`game-${game.id}`} value={game.id}>
              {game.name}
            </Option>
          ))}
        </Select>
      </Field>

      <Field>
        <Grid align="flex-end" grow>
          <Col span={8}>
            <Select
              disabled={minisResult.fetching || !gameMinis.length}
              label="Add a Mini"
              required
              onChange={handleMiniChange}
              value={
                selectedMini?.value
                  ? selectedMini.value
                  : defaultSelectedMini.value
              }
            >
              <Option disabled value={defaultSelectedMini.value}>
                {defaultSelectedMini.label}
              </Option>
              {sortByName(gameMinis).map((mini) => (
                <Option key={`mini-${mini.id}`} value={mini.id}>
                  {mini.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={2}>
            <NumberInput
              value={selectedQty}
              placeholder="Quantity"
              label="Quantity"
              required
              disabled={selectedMini.value === "none"}
              onChange={(e) => setSelectedQty(parseInt(e.target.value))}
              min={1}
            />
          </Col>
          <Col span={1}>
            <Button
              className="w-full"
              onClick={handleMiniAddClick}
              disabled={selectedMini.value === "none"}
            >
              Add
            </Button>
          </Col>
        </Grid>
      </Field>
    </div>
  );
}

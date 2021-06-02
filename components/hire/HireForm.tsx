import {
  Button,
  Col,
  Grid,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { LineItem } from "../../types/hire";
import Field from "../form/Field";

/*
 * Begin temp data
 */
const games = [
  { value: "wh40k", label: "Warhammer: 40,000" },
  { value: "whaos", label: "Warhammer: Age of Sigmar" },
  { value: "swlegion", label: "Star Wars: Legion" },
  { value: "infinity", label: "Infinity" },
];

const minis = {
  wh40k: [
    { value: "drukhari-raider", label: "Drukhari: Raider" },
    { value: "drukhari-drazhar", label: "Drukhari: Drazhar" },
  ],
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
/*
 * End temp data
 */

type HireFormProps = {
  onItemAdded: (item: LineItem) => void;
};

const defaultSelectedMini = {
  value: "none",
  label: "Select Mini...",
};

export default function HireForm({ onItemAdded }: HireFormProps) {
  const [selectedGame, setSelectedGame] = useState({
    value: "none",
    label: "Select Game...",
  });
  const [gameMinis, setGameMinis] = useState([]);
  const [selectedMini, setSelectedMini] = useState(defaultSelectedMini);
  const [selectedQty, setSelectedQty] = useState(1);

  // when the selected game changes, fetch the related minis
  useEffect(() => {
    if (selectedGame.value !== "none") {
      setGameMinis(minis[selectedGame.value]);
      setSelectedMini(defaultSelectedMini);
      setSelectedQty(1);
    }
  }, [selectedGame, setGameMinis]);

  const handleGameChange = ({ target }) => {
    const { value } = target;

    // find the game
    const matches = games.filter((game) => game.value === value);
    if (matches.length === 1) {
      setSelectedGame(matches[0]);
    }
  };

  const handleMiniChange = ({ target }) => {
    const { value } = target;

    // find the mini
    const matches = minis[selectedGame.value].filter(
      (mini) => mini.value === value
    );
    if (matches.length === 1) {
      setSelectedMini(matches[0]);
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
          data={games.sort((a, b) => (a.label > b.label ? 1 : -1))}
          placeholder="Select a game..."
          label="Game"
          required
          value={selectedGame.value !== "none" ? selectedGame.value : ""}
          onChange={handleGameChange}
        />
      </Field>

      <Field>
        <Grid align="flex-end" grow>
          <Col span={8}>
            <Select
              disabled={!gameMinis.length}
              data={gameMinis.sort((a, b) => (a.label > b.label ? 1 : -1))}
              placeholder="Select a mini..."
              label="Add a Mini"
              required
              value={selectedMini.value !== "none" ? selectedMini.value : ""}
              onChange={handleMiniChange}
            />
          </Col>
          <Col span={2}>
            <NumberInput
              value={selectedQty}
              placeholder="Quantity"
              label="Quantity"
              required
              disabled={selectedMini.value === "none"}
              onChange={(val) => setSelectedQty(val)}
              min={1}
            />
          </Col>
          <Col span={1}>
            <Button
              fullWidth
              size="lg"
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

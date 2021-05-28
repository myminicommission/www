import { Divider, Paper, Title } from "@mantine/core";

function SummarySection({ label, minis }) {
  console.log(label, minis);
  return (
    <div>
      <Title order={4}>{label}</Title>
      <ul>
        {minis.map((mini) => (
          <li>
            {mini.qty} x {mini.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Summary({ lineItems }) {
  const sortedLineItems = {};
  lineItems.forEach((li) => {
    if (sortedLineItems[li.game.value] === undefined) {
      sortedLineItems[li.game.value] = {
        id: li.game.value,
        label: li.game.label,
        minis: [],
      };
    }

    sortedLineItems[li.game.value].minis = [
      ...sortedLineItems[li.game.value].minis,
      { ...li.mini, qty: li.qty },
    ].sort((a, b) => (a.label > b.label ? 1 : -1));
  });

  return (
    <Paper padding="md" shadow="xs">
      <Title order={2}>Summary</Title>
      <Divider />

      {Object.keys(sortedLineItems).map((key) => (
        <div>
          <SummarySection
            label={sortedLineItems[key].label}
            minis={sortedLineItems[key].minis}
          />
        </div>
      ))}
    </Paper>
  );
}

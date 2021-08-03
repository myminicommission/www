import { Divider, Paper, Table, Title } from "@mantine/core";
import { LineItem, MiniWithQuantity } from "../../types/hire";

type SummarySectionProps = {
  label: String;
  minis: [
    {
      value: String;
      label: String;
      qty: Number;
    }
  ];
};

type SummaryProps = {
  lineItems: LineItem[];
  onItemRemoved: (miniWithQty: MiniWithQuantity) => void;
};

function SummarySection({ label, minis }: SummarySectionProps) {
  console.log(label, minis);
  return (
    <div>
      <Title order={4}>{label}</Title>
      <Divider variant="dotted" />
      <Table>
        <thead>
          <tr>
            <th>Qty</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {minis.map((mini) => (
            <tr key={`mini-${mini.value}`}>
              <td>{mini.qty}</td>
              <td>{mini.label}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default function Summary({ lineItems }: SummaryProps) {
  const sortedLineItems = {};
  lineItems.forEach((li) => {
    if (sortedLineItems[`${li.game.value}`] === undefined) {
      sortedLineItems[`${li.game.value}`] = {
        id: li.game.value,
        label: li.game.label,
        minis: [],
      };
    }

    sortedLineItems[`${li.game.value}`].minis = [
      ...sortedLineItems[`${li.game.value}`].minis,
      { ...li.mini, qty: li.qty },
    ].sort((a, b) => (a.label > b.label ? 1 : -1));
  });

  return (
    <>
      <Title order={2}>Summary</Title>

      {Object.keys(sortedLineItems).map((key) => (
        <div className="pt-3">
          <Divider />
          <div className="pt-3">
            <SummarySection
              label={sortedLineItems[key].label}
              minis={sortedLineItems[key].minis}
            />
          </div>
        </div>
      ))}
    </>
  );
}

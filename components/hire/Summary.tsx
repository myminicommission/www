import { LineItem, MiniWithQuantity } from "../../types/hire";
import Divider from "../Divider";

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
      <h4 className="font-bold">{label}</h4>
      <Divider />

      <table className="min-w-full divide-y divide-gray-600">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Qty
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            >
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {minis.map((mini, i) => (
            <tr
              key={`mini-${mini.value}`}
              className={i % 2 === 0 ? "" : "bg-gray-700"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {mini.qty}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {mini.label}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <h2 className="text-2xl leading-6 font-bold text-gray-100">Summary</h2>

      {Object.keys(sortedLineItems).map((key) => (
        <div key={`game-${key}`} className="pt-3">
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

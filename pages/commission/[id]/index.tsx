import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "urql";
import { Paper } from "../../../components/containers";
import Divider from "../../../components/Divider";
import Loader from "../../../components/Loader";
import Page from "../../../components/Page";
import { Mini, Person } from "../../../model";

const GET_COMMISSION_QUERY = gql`
  query GetCommission($id: ID!) {
    commission(id: $id) {
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
      createdAt
      updatedAt
      total
      minis {
        id
        name
        quantity
        price
        notes
      }
    }
  }
`;

function AvatarLine({ label, name, nickname, picture }: Person) {
  return (
    <div className="grid items-center grid-cols-4 mt-1.5 mb-1.5">
      <div className="col-span-1">
        <Link href={`/${nickname}`}>
          <a>
            <img
              className="inline-block w-10 h-10 rounded-md"
              src={picture}
              alt={name}
            />
          </a>
        </Link>
      </div>
      <div className="grid items-center grid-flow-row col-span-3">
        <Link href={`/${nickname}`}>
          <a className="text-base">{name}</a>
        </Link>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = "green";

  switch (status.toUpperCase()) {
    case "QUOTE":
      color = "gray";
      break;
    case "ACCEPTED":
      color = "blue";
      break;
    case "WAITING":
      color = "yellow";
      break;
    case "IN_PROGRESS":
      color = "purple";
      break;
    case "SHIPPED":
      color = "indigo";
      break;
    case "COMPLETE":
      color = "green";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-${color}-700 text-${color}-100`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

type MiniLineItemProps = {
  mini: Mini;
};

function MiniLineItem({ mini }: MiniLineItemProps) {
  return (
    <>
      <div className="flex justify-between space-x-3">
        <div className="flex-1 min-w-0">
          <div className="block focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-lg font-medium text-gray-900 truncate dark:text-gray-200">
              {mini.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              {mini.quantity} x ${mini.price}
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 text-base text-gray-500 dark:text-gray-400 whitespace-nowrap">
          ${mini.quantity * mini.price}
        </div>
      </div>
      {mini.notes.length > 0 && (
        <div className="mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
            {mini.notes}
          </p>
        </div>
      )}
    </>
  );
}

export default function CommissionPage() {
  const router = useRouter();
  const [result] = useQuery({
    pause: !router?.query?.id,
    query: GET_COMMISSION_QUERY,
    variables: {
      id: router.query.id,
    },
  });
  const [commission, setCommission] = useState(undefined);

  useEffect(() => {
    console.log(result);
    if (result?.data?.commission) {
      setCommission(result.data?.commission);
    }
  }, [result, setCommission]);

  if (result.fetching || !result?.data?.commission || !commission) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  return (
    <Page>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <Paper>
            <Paper.Content>
              <StatusBadge status={commission.status} />
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-500"
              >
                {[
                  { label: "Artist", person: commission.artist },
                  { label: "Patron", person: commission.patron },
                ].map((data) => (
                  <li
                    key={`person-id-${data.person.nickname}`}
                    className="relative p-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <AvatarLine label={data.label} {...data.person} />
                  </li>
                ))}
              </ul>
            </Paper.Content>
          </Paper>
        </div>
        <div className="col-span-3">
          <Paper>
            <Paper.Content>
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-500"
              >
                {commission.minis.map((mini, i) => (
                  <li
                    key={`mini-${mini.id}-${i}`}
                    className="relative px-4 py-5 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                  >
                    <MiniLineItem mini={mini} />
                  </li>
                ))}
              </ul>
            </Paper.Content>
          </Paper>
        </div>
      </div>
    </Page>
  );
}

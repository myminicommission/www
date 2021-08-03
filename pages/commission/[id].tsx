import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql, useQuery } from "urql";
import { Paper } from "../../components/containers";
import Divider from "../../components/Divider";
import Loader from "../../components/Loader";
import Page from "../../components/Page";

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

function AvatarLine({ label, name, nickname, picture }) {
  return (
    <div className="grid grid-cols-4 mt-3 items-center">
      <div className="col-span-1">
        <Link href={`/${nickname}`}>
          <a>
            <img
              className="inline-block h-10 w-10 rounded-md"
              src={picture}
              alt={name}
            />
          </a>
        </Link>
      </div>
      <div className="col-span-3 items-center grid grid-flow-row">
        <Link href={`/${nickname}`}>
          <a className="text-lg">{name}</a>
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

              <Divider className="mt-1" />

              <AvatarLine label="Artist" {...commission.artist} />

              <Divider className="mt-1" />

              <AvatarLine label="Patron" {...commission.patron} />
            </Paper.Content>
          </Paper>
        </div>
        <div className="col-span-3">
          <Paper>
            <Paper.Content>
              <pre>
                <code>{JSON.stringify(commission, null, 2)}</code>
              </pre>
            </Paper.Content>
          </Paper>
        </div>
      </div>
    </Page>
  );
}

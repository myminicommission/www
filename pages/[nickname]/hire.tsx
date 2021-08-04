import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { gql } from "@urql/core";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState, MouseEvent } from "react";
import { useQuery, useMutation } from "urql";
import { Button } from "../../components/buttons";
import { Paper } from "../../components/containers";
import Divider from "../../components/Divider";
import HireForm from "../../components/hire/HireForm";
import Summary from "../../components/hire/Summary";
import Page from "../../components/Page";
import PageLoader from "../../components/PageLoader";
import { LineItem, MiniWithQuantity } from "../../types/hire";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = gql`
  query GetUser($nickname: String!) {
    userWithNickname(nname: $nickname) {
      name
      forHire
    }
  }
`;

const NEW_COMMISSION_QUERY = gql`
  mutation NewCommission($input: NewCommission!) {
    newCommission(input: $input) {
      id
    }
  }
`;

function addToLineItems(item: LineItem, lineItems: LineItem[]): LineItem[] {
  // is the incoming line item already in the collection?
  const matches = lineItems.filter((it) => it.mini.value === item.mini.value);

  // no matches were found
  if (!matches.length) {
    // append item to lineItems
    return [...lineItems, item];
  }

  let items: LineItem[] = [];
  lineItems.forEach((it) => {
    if (it.mini.value === item.mini.value) {
      it.qty = it.qty + item.qty;
    }

    items.push(it);
  });

  return items;
}

function Hire() {
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [result] = useQuery({
    pause: !router.query.nickname,
    query: USER_WITH_NICKNAME_QUERY,
    variables: {
      nickname: router.query.nickname,
    },
  });
  const [mutationResult, newCommissionMutation] =
    useMutation(NEW_COMMISSION_QUERY);

  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    setLoading(false);
    if (mutationResult?.data?.newCommission?.id) {
      router.push(`/commission/${mutationResult?.data?.newCommission?.id}`);
    }
  }, [mutationResult, setLoading]);

  if (!router.query.nickname || result.fetching || isLoading || loading) {
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

  const handleItemAdded = (lineItem: LineItem) => {
    setLineItems(addToLineItems(lineItem, lineItems));
  };

  const handleCancelClick = () => {
    router.push(`/${nickname}`);
    return <PageLoader />;
  };

  const handleSubmitClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Submit clicked!");
    newCommissionMutation({
      input: {
        artistNickname: router.query.nickname,
        comments: "",
        minis: lineItems.map((item) => ({
          id: item.mini.value,
          quantity: item.qty,
          name: item.mini.label,
          size: "MEDIUM",
          notes: "",
        })),
      },
    });
    setLoading(true);
  };

  const handleItemRemoved = (mini: MiniWithQuantity) => {
    console.log(mini);
  };

  return (
    <Page>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Paper>
            <Paper.Content>
              <h1 className="text-2xl leading-6 font-bold">Hire {name}</h1>
              <p className="text-md text-gray-500">
                <Link href={`/${nickname}`}>
                  <a>@{nickname}</a>
                </Link>
              </p>

              <Divider />

              <HireForm onItemAdded={handleItemAdded} />
            </Paper.Content>
          </Paper>

          <div className="mt-6">
            <span className="relative z-0 inline-flex shadow-sm rounded-md w-full flex-row-reverse">
              <Button disabled={!lineItems.length} onClick={handleSubmitClick}>
                Submit
              </Button>
              <Button secondary onClick={handleCancelClick}>
                Cancel
              </Button>
            </span>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Paper>
            <Paper.Content>
              <Summary
                lineItems={lineItems}
                onItemRemoved={handleItemRemoved}
              />
            </Paper.Content>
          </Paper>
        </div>
      </div>
    </Page>
  );
}

export default withPageAuthRequired(Hire);

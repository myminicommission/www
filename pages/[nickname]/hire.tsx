import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Button, Col, Divider, Grid, Group, Paper, Title } from "@mantine/core";
import { gql } from "@urql/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "urql";
import HireForm from "../../components/hire/HireForm";
import Summary from "../../components/hire/Summary";
import Page from "../../components/Page";
import PageLoader from "../../components/PageLoader";
import { LineItem } from "../../types/hire";
import FourOhFour from "../404";

const USER_WITH_NICKNAME_QUERY = gql`
  query GetUser($nickname: String!) {
    userWithNickname(nname: $nickname) {
      name
      forHire
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
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [result] = useQuery({
    pause: !router.query.nickname,
    query: USER_WITH_NICKNAME_QUERY,
    variables: {
      nickname: router.query.nickname,
    },
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([]);

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

  const handleItemAdded = (lineItem: LineItem) => {
    setLineItems(addToLineItems(lineItem, lineItems));
  };

  const handleCancelClick = () => {
    router.push(`/${nickname}`);
    return <PageLoader />;
  };

  return (
    <Page>
      <Grid gutter="lg">
        <Col span={7}>
          <Paper padding="md" shadow="xs">
            <Title order={2}>Hire {name}</Title>
            <Title order={4}>{nickname}</Title>

            <Divider />

            <HireForm onItemAdded={handleItemAdded} />
          </Paper>

          <Paper padding="md" shadow="xs" className="mt-5">
            <Group position="right">
              <Button variant="outline" color="red" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button disabled={!lineItems.length}>Submit</Button>
            </Group>
          </Paper>
        </Col>

        <Col span={5}>
          <Summary
            lineItems={lineItems}
            onItemRemoved={(mini) => {
              console.log(mini);
            }}
          />
        </Col>
      </Grid>
    </Page>
  );
}

export default withPageAuthRequired(Hire);

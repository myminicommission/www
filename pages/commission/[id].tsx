import { useRouter } from "next/router";
import { gql, useQuery } from "urql";
import Page from "../../components/Page";

const GET_COMMISSION_QUERY = gql`
  query GetCommission($id: ID!) {
    commission(id: $id) {
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

export default function CommissionPage() {
  const router = useRouter();
  const [result] = useQuery({
    pause: !router?.query?.id,
    query: GET_COMMISSION_QUERY,
    variables: {
      id: router.query.id,
    },
  });

  const comId = router.query.id;
  return (
    <Page>
      Commission {comId}
      <pre>
        <code>{JSON.stringify(result?.data, null, 2)}</code>
      </pre>
    </Page>
  );
}

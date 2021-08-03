import { Group } from "@mantine/core";
import Loader from "./Loader";
import Page from "./Page";

export default function PageLoader() {
  return (
    <Page>
      <Group position="center">
        <Loader />
      </Group>
    </Page>
  );
}

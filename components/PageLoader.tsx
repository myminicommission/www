import { Group, Loader } from "@mantine/core";
import Page from "./Page";

export default function PageLoader() {
  return (
    <Page>
      <Group position="center">
        <Loader color="dark" size="xl" />
      </Group>
    </Page>
  );
}

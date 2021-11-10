import { Client, createClient } from "urql";

const api: Client = createClient({
  url: "/api/graphql",
});

export function useAPIClient(): Client {
  return api;
}

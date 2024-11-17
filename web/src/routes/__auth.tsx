import { createFileRoute, redirect } from "@tanstack/react-router";
import node, { AuthSessionQuery } from "__generated__/AuthSessionQuery.graphql";
import { fetchQuery, graphql } from "relay-runtime";
import { AuthenticationError, AuthorizationError } from "~/lib/relay";

graphql`
  query AuthSessionQuery {
    session {
      name
      username
      email
      avatarUrl
    }
  }
`;

export const Route = createFileRoute("/__auth")({
  async beforeLoad({ context: { RelayEnvironment } }) {
    const data = await fetchQuery<AuthSessionQuery>(
      RelayEnvironment,
      node,
      {},
      { fetchPolicy: "store-or-network" },
    ).toPromise();
    if (!data?.session) {
      return { redirectTo: "/login" };
    }
    return { session: data.session };
  },
  onError(error) {
    if (error instanceof AuthenticationError) {
      throw redirect({ to: "/login" });
    }

    if (error instanceof AuthorizationError) {
      throw redirect({ to: "/login" });
    }

    throw error;
  },
});

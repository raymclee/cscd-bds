import { createFileRoute, redirect } from "@tanstack/react-router";
import node, { AuthSessionQuery } from "__generated__/AuthSessionQuery.graphql";
import { fetchQuery, graphql } from "relay-runtime";
import { AuthenticationError, AuthorizationError } from "~/lib/relay";

graphql`
  query AuthSessionQuery {
    session {
      userId
      name
      username
      email
      avatarUrl
      isAdmin
      hasMapAccess
      hasEditAccess
    }
  }
`;

export const Route = createFileRoute("/__auth")({
  async beforeLoad({ context: { RelayEnvironment }, location }) {
    const data = await fetchQuery<AuthSessionQuery>(
      RelayEnvironment,
      node,
      {},
      { fetchPolicy: "store-or-network" },
    ).toPromise();
    if (!data?.session) {
      throw redirect({
        to: "/login",
        from: location.pathname,
        params: { search: location.pathname },
      });
    }
    // if (!data.session.isAdmin && !data.session.isLeader) {
    //   throw redirect({ to: "/portal/tenders" });
    // }
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

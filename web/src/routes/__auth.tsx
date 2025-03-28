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
      isSuperAdmin
      isCeo
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
    ).toPromise();
    if (!data?.session?.userId) {
      throw redirect({
        to: "/login",
        params: { search: location.pathname },
      });
    }

    return { session: data.session };
  },
  onError(error) {
    if (
      error instanceof AuthenticationError ||
      error instanceof AuthorizationError
    ) {
      throw redirect({ to: "/login" });
    }

    throw error;
  },
});

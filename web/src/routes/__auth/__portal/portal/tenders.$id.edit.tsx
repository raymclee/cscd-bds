import { createFileRoute, redirect } from "@tanstack/react-router";
import node, {
  tendersEditPageQuery,
} from "__generated__/tendersEditPageQuery.graphql";
import { loadQuery } from "react-relay";
import { canEdit } from "~/lib/permission";

export const Route = createFileRoute(
  "/__auth/__portal/portal/tenders/$id/edit",
)({
  beforeLoad({ context: { session } }) {
    if (!canEdit(session)) {
      throw redirect({ to: "/access-denied" });
    }
    return { userId: session.userId };
  },
  loader({ context: { RelayEnvironment, userId }, params: { id } }) {
    return loadQuery<tendersEditPageQuery>(RelayEnvironment, node, {
      id,
      userId,
    });
  },
});

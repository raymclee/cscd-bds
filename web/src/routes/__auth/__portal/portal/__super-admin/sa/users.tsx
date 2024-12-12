import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import * as v from "valibot";
import node, {
  usersSuperAdminUsersPageQuery,
} from "__generated__/usersSuperAdminUsersPageQuery.graphql";

const userSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
  q: v.optional(v.string()),
  area: v.optional(v.string()),
});

export const Route = createFileRoute(
  "/__auth/__portal/portal/__super-admin/sa/users",
)({
  async loader({ context: { RelayEnvironment } }) {
    return loadQuery<usersSuperAdminUsersPageQuery>(RelayEnvironment, node, {});
  },
  validateSearch: userSearchSchema,
});

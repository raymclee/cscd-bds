import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, { usersPageQuery } from "__generated__/usersPageQuery.graphql";
import * as v from "valibot";

const userSearchSchema = v.object({
  page: v.optional(v.fallback(v.number(), 1), 1),
});

export const Route = createFileRoute("/__auth/__portal/portal/__admin/users")({
  async loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<usersPageQuery>(RelayEnvironment, node, {});
  },
  validateSearch: userSearchSchema,
});

import { createFileRoute } from "@tanstack/react-router";
import node, {
  operationsPageQuery,
} from "__generated__/operationsPageQuery.graphql";
import { loadQuery } from "react-relay";
import * as v from "valibot";

const operationSearchSchema = v.object({
  code: v.optional(v.string()),
});

export const Route = createFileRoute("/__auth/__dashboard/operations")({
  validateSearch: operationSearchSchema,
  loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<operationsPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    });
  },
});

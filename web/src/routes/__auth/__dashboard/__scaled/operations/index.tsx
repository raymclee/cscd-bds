import { createFileRoute } from "@tanstack/react-router";
import node, {
  operationsIndexPageQuery,
} from "__generated__/operationsIndexPageQuery.graphql";
import { loadQuery } from "react-relay";
import * as v from "valibot";

const operationSearchSchema = v.object({
  code: v.optional(v.string()),
});

export const Route = createFileRoute(
  "/__auth/__dashboard/__scaled/operations/",
)({
  validateSearch: operationSearchSchema,
  loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<operationsIndexPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
    });
  },
});

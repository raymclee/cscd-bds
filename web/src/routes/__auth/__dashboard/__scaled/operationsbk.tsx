import { createFileRoute } from "@tanstack/react-router";
import node, {
  operationsbkPageQuery,
} from "__generated__/operationsbkPageQuery.graphql";

import { loadQuery } from "react-relay";
import * as v from "valibot";

const operationSearchSchema = v.object({
  code: v.optional(v.string()),
});

export const Route = createFileRoute(
  "/__auth/__dashboard/__scaled/operationsbk",
)({
  validateSearch: operationSearchSchema,
  loader({ context: { RelayEnvironment, session } }) {
    return loadQuery<operationsbkPageQuery>(RelayEnvironment, node, {
      userId: session?.userId,
    });
  },
});

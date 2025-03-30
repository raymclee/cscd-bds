import { createFileRoute } from "@tanstack/react-router";
import node, {
  v1MapIndexPageQuery,
} from "__generated__/v1MapIndexPageQuery.graphql";
import { loadQuery } from "react-relay";

export const Route = createFileRoute("/__auth/__dashboard/__scaled/__map/v1")({
  loader: async ({ context: { RelayEnvironment, session } }) => {
    return loadQuery<v1MapIndexPageQuery>(RelayEnvironment, node, {
      userId: session.userId,
      orderBy: [
        { field: "TENDER_DATE", direction: "ASC" },
        { field: "CLOSING_DATE", direction: "ASC" },
        { field: "CREATED_AT", direction: "ASC" },
      ],
      // visitOrderBy: [{ field: "DATE", direction: "DESC" }],
    });
  },
});

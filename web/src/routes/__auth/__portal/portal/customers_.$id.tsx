import { createFileRoute, redirect } from "@tanstack/react-router";
import { loadQuery } from "react-relay";
import node, {
  customersDetailPageQuery,
} from "__generated__/customersDetailPageQuery.graphql";
import * as v from "valibot";

const customerDetailSearchSchema = v.object({
  tab: v.optional(
    v.pipe(
      v.number(),
      v.transform((value) => Number(value)),
    ),
    1,
  ),
  p: v.optional(v.string()),
});

export const Route = createFileRoute("/__auth/__portal/portal/customers_/$id")({
  loader({ context: { RelayEnvironment, session }, params: { id } }) {
    return loadQuery<customersDetailPageQuery>(RelayEnvironment, node, {
      id,
      userId: session?.userId,
      // orderBy: [{ field: "DATE", direction: "DESC" }],
      // where: { customerID: id },
    });
  },
  validateSearch: customerDetailSearchSchema,
});

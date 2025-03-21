import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

export const Route = createFileRoute("/__auth/__dashboard/__amap/v2")({
  validateSearch: v.object({
    tenderDate: v.optional(v.string()),
    status: v.optional(
      v.pipe(
        v.number(),
        v.transform((value) => Number(value)),
      ),
    ),
    sort: v.optional(v.string()),
    q: v.optional(v.string()),
  }),
});

import { operationsPageQuery$data } from "__generated__/operationsPageQuery.graphql";

export type Project = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<operationsPageQuery$data["node"]>["projects"]
      >["edges"]
    >
  >[0]
>["node"];

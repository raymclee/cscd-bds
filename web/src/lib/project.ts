import { operationsIndexPageQuery$data } from "__generated__/operationsIndexPageQuery.graphql";

export type Project = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<operationsIndexPageQuery$data["node"]>["projects"]
      >["edges"]
    >
  >[0]
>["node"];

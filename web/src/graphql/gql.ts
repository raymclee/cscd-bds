/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation useCreatePlotMutation(\n    $input: CreatePlotInput!\n    $geoBounds: [[Float!]!]\n    $connections: [ID!]!\n  ) {\n    createPlot(input: $input, geoBounds: $geoBounds) {\n      edges @prependNode(connections: $connections, edgeTypeName: \"PlotEdge\") {\n        node {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n      }\n    }\n  }\n": typeof types.UseCreatePlotMutationDocument,
    "\n    mutation useCreateUserMutation(\n      $input: CreateUserInput!\n      $connections: [ID!]!\n    ) {\n      createUser(input: $input) {\n        edges @appendEdge(connections: $connections) {\n          node {\n            id\n            name\n            email\n            username\n            openID\n            avatarURL\n            disabled\n            areas {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            leader {\n              id\n              name\n            }\n            teamMembers {\n              id\n              name\n            }\n            projects {\n              edges {\n                node {\n                  id\n                  code\n                }\n              }\n            }\n            isAdmin\n            isSuperAdmin\n            isCeo\n            hasMapAccess\n            hasEditAccess\n          }\n        }\n      }\n    }\n  ": typeof types.UseCreateUserMutationDocument,
    "\n    mutation useDeleteUserMutation($id: ID!, $connections: [ID!]!) {\n      deleteUser(id: $id) {\n        id @deleteEdge(connections: $connections)\n      }\n    }\n  ": typeof types.UseDeleteUserMutationDocument,
    "\n    mutation useUpdateCompetitorMutation(\n      $id: ID!\n      $input: UpdateCompetitorInput!\n    ) {\n      updateCompetitor(id: $id, input: $input) {\n        id\n        shortName\n        name\n      }\n    }\n  ": typeof types.UseUpdateCompetitorMutationDocument,
    "\n    mutation useUpdateProjectMutation($id: ID!, $input: UpdateProjectInput!) {\n      updateProject(id: $id, input: $input) {\n        id\n      }\n    }\n  ": typeof types.UseUpdateProjectMutationDocument,
    "\n    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {\n      updateUser(id: $id, input: $input) {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        leader {\n          id\n          name\n        }\n        teamMembers {\n          id\n          name\n        }\n        projects(where: { isFinishedNEQ: true }, orderBy: { field: CODE }) {\n          edges {\n            node {\n              id\n              code\n            }\n          }\n        }\n        isSuperAdmin\n        isAdmin\n        isCeo\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  ": typeof types.UseUpdateUserMutationDocument,
    "\n  query mapv2DistrictsQuery($adcode: Int!) {\n    districts(where: { adcode: $adcode }) {\n      edges {\n        node {\n          plots {\n            edges {\n              node {\n                id\n                name\n                geoBounds\n                colorHex\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.Mapv2DistrictsQueryDocument,
};
const documents: Documents = {
    "\n  mutation useCreatePlotMutation(\n    $input: CreatePlotInput!\n    $geoBounds: [[Float!]!]\n    $connections: [ID!]!\n  ) {\n    createPlot(input: $input, geoBounds: $geoBounds) {\n      edges @prependNode(connections: $connections, edgeTypeName: \"PlotEdge\") {\n        node {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n      }\n    }\n  }\n": types.UseCreatePlotMutationDocument,
    "\n    mutation useCreateUserMutation(\n      $input: CreateUserInput!\n      $connections: [ID!]!\n    ) {\n      createUser(input: $input) {\n        edges @appendEdge(connections: $connections) {\n          node {\n            id\n            name\n            email\n            username\n            openID\n            avatarURL\n            disabled\n            areas {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            leader {\n              id\n              name\n            }\n            teamMembers {\n              id\n              name\n            }\n            projects {\n              edges {\n                node {\n                  id\n                  code\n                }\n              }\n            }\n            isAdmin\n            isSuperAdmin\n            isCeo\n            hasMapAccess\n            hasEditAccess\n          }\n        }\n      }\n    }\n  ": types.UseCreateUserMutationDocument,
    "\n    mutation useDeleteUserMutation($id: ID!, $connections: [ID!]!) {\n      deleteUser(id: $id) {\n        id @deleteEdge(connections: $connections)\n      }\n    }\n  ": types.UseDeleteUserMutationDocument,
    "\n    mutation useUpdateCompetitorMutation(\n      $id: ID!\n      $input: UpdateCompetitorInput!\n    ) {\n      updateCompetitor(id: $id, input: $input) {\n        id\n        shortName\n        name\n      }\n    }\n  ": types.UseUpdateCompetitorMutationDocument,
    "\n    mutation useUpdateProjectMutation($id: ID!, $input: UpdateProjectInput!) {\n      updateProject(id: $id, input: $input) {\n        id\n      }\n    }\n  ": types.UseUpdateProjectMutationDocument,
    "\n    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {\n      updateUser(id: $id, input: $input) {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        leader {\n          id\n          name\n        }\n        teamMembers {\n          id\n          name\n        }\n        projects(where: { isFinishedNEQ: true }, orderBy: { field: CODE }) {\n          edges {\n            node {\n              id\n              code\n            }\n          }\n        }\n        isSuperAdmin\n        isAdmin\n        isCeo\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  ": types.UseUpdateUserMutationDocument,
    "\n  query mapv2DistrictsQuery($adcode: Int!) {\n    districts(where: { adcode: $adcode }) {\n      edges {\n        node {\n          plots {\n            edges {\n              node {\n                id\n                name\n                geoBounds\n                colorHex\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.Mapv2DistrictsQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation useCreatePlotMutation(\n    $input: CreatePlotInput!\n    $geoBounds: [[Float!]!]\n    $connections: [ID!]!\n  ) {\n    createPlot(input: $input, geoBounds: $geoBounds) {\n      edges @prependNode(connections: $connections, edgeTypeName: \"PlotEdge\") {\n        node {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').UseCreatePlotMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useCreateUserMutation(\n      $input: CreateUserInput!\n      $connections: [ID!]!\n    ) {\n      createUser(input: $input) {\n        edges @appendEdge(connections: $connections) {\n          node {\n            id\n            name\n            email\n            username\n            openID\n            avatarURL\n            disabled\n            areas {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            leader {\n              id\n              name\n            }\n            teamMembers {\n              id\n              name\n            }\n            projects {\n              edges {\n                node {\n                  id\n                  code\n                }\n              }\n            }\n            isAdmin\n            isSuperAdmin\n            isCeo\n            hasMapAccess\n            hasEditAccess\n          }\n        }\n      }\n    }\n  "): typeof import('./graphql').UseCreateUserMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useDeleteUserMutation($id: ID!, $connections: [ID!]!) {\n      deleteUser(id: $id) {\n        id @deleteEdge(connections: $connections)\n      }\n    }\n  "): typeof import('./graphql').UseDeleteUserMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useUpdateCompetitorMutation(\n      $id: ID!\n      $input: UpdateCompetitorInput!\n    ) {\n      updateCompetitor(id: $id, input: $input) {\n        id\n        shortName\n        name\n      }\n    }\n  "): typeof import('./graphql').UseUpdateCompetitorMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useUpdateProjectMutation($id: ID!, $input: UpdateProjectInput!) {\n      updateProject(id: $id, input: $input) {\n        id\n      }\n    }\n  "): typeof import('./graphql').UseUpdateProjectMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {\n      updateUser(id: $id, input: $input) {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        leader {\n          id\n          name\n        }\n        teamMembers {\n          id\n          name\n        }\n        projects(where: { isFinishedNEQ: true }, orderBy: { field: CODE }) {\n          edges {\n            node {\n              id\n              code\n            }\n          }\n        }\n        isSuperAdmin\n        isAdmin\n        isCeo\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  "): typeof import('./graphql').UseUpdateUserMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query mapv2DistrictsQuery($adcode: Int!) {\n    districts(where: { adcode: $adcode }) {\n      edges {\n        node {\n          plots {\n            edges {\n              node {\n                id\n                name\n                geoBounds\n                colorHex\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').Mapv2DistrictsQueryDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

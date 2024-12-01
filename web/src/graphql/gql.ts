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
const documents = {
    "\n  mutation useCreatePlotMutation(\n    $input: CreatePlotInput!\n    $geoBounds: [[Float!]!]\n    $connections: [ID!]!\n  ) {\n    createPlot(input: $input, geoBounds: $geoBounds) {\n      edges @prependNode(connections: $connections, edgeTypeName: \"PlotEdge\") {\n        node {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n      }\n    }\n  }\n": types.UseCreatePlotMutationDocument,
    "\n    mutation useCreateUserMutation(\n      $input: CreateUserInput!\n      $connections: [ID!]!\n    ) {\n      createUser(input: $input) {\n        edges\n          @prependNode(connections: $connections, edgeTypeName: \"UserEdge\") {\n          node {\n            id\n            name\n            email\n            username\n            openID\n            avatarURL\n            disabled\n            areas {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            isAdmin\n            hasMapAccess\n            hasEditAccess\n          }\n        }\n      }\n    }\n  ": types.UseCreateUserMutationDocument,
    "\n  mutation useDeleteTenderMutation($id: ID!) {\n    deleteTender(id: $id) {\n      id @deleteRecord\n    }\n  }\n": types.UseDeleteTenderMutationDocument,
    "\n    mutation useDeleteUserMutation($id: ID!) {\n      deleteUser(id: $id) {\n        id @deleteRecord\n      }\n    }\n  ": types.UseDeleteUserMutationDocument,
    "\n    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {\n      updateUser(id: $id, input: $input) {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        isAdmin\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  ": types.UseUpdateUserMutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation useCreatePlotMutation(\n    $input: CreatePlotInput!\n    $geoBounds: [[Float!]!]\n    $connections: [ID!]!\n  ) {\n    createPlot(input: $input, geoBounds: $geoBounds) {\n      edges @prependNode(connections: $connections, edgeTypeName: \"PlotEdge\") {\n        node {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').UseCreatePlotMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useCreateUserMutation(\n      $input: CreateUserInput!\n      $connections: [ID!]!\n    ) {\n      createUser(input: $input) {\n        edges\n          @prependNode(connections: $connections, edgeTypeName: \"UserEdge\") {\n          node {\n            id\n            name\n            email\n            username\n            openID\n            avatarURL\n            disabled\n            areas {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n            isAdmin\n            hasMapAccess\n            hasEditAccess\n          }\n        }\n      }\n    }\n  "): typeof import('./graphql').UseCreateUserMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation useDeleteTenderMutation($id: ID!) {\n    deleteTender(id: $id) {\n      id @deleteRecord\n    }\n  }\n"): typeof import('./graphql').UseDeleteTenderMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useDeleteUserMutation($id: ID!) {\n      deleteUser(id: $id) {\n        id @deleteRecord\n      }\n    }\n  "): typeof import('./graphql').UseDeleteUserMutationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation useUpdateUserMutation($id: ID!, $input: UpdateUserInput!) {\n      updateUser(id: $id, input: $input) {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        isAdmin\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  "): typeof import('./graphql').UseUpdateUserMutationDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

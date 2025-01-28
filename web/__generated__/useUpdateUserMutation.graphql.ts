/**
 * @generated SignedSource<<80a24c51e391988fef9cf784eb440310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateUserInput = {
  addAreaIDs?: ReadonlyArray<string> | null | undefined;
  addCustomerIDs?: ReadonlyArray<string> | null | undefined;
  addProjectIDs?: ReadonlyArray<string> | null | undefined;
  addTeamMemberIDs?: ReadonlyArray<string> | null | undefined;
  addTenderIDs?: ReadonlyArray<string> | null | undefined;
  addVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  avatarURL?: string | null | undefined;
  clearAreas?: boolean | null | undefined;
  clearAvatarURL?: boolean | null | undefined;
  clearCustomers?: boolean | null | undefined;
  clearLeader?: boolean | null | undefined;
  clearOpenID?: boolean | null | undefined;
  clearProjects?: boolean | null | undefined;
  clearTeamMembers?: boolean | null | undefined;
  clearTenders?: boolean | null | undefined;
  clearVisitRecords?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  email?: string | null | undefined;
  hasEditAccess?: boolean | null | undefined;
  hasMapAccess?: boolean | null | undefined;
  isAdmin?: boolean | null | undefined;
  isCeo?: boolean | null | undefined;
  isSuperAdmin?: boolean | null | undefined;
  leaderID?: string | null | undefined;
  name?: string | null | undefined;
  openID?: string | null | undefined;
  removeAreaIDs?: ReadonlyArray<string> | null | undefined;
  removeCustomerIDs?: ReadonlyArray<string> | null | undefined;
  removeProjectIDs?: ReadonlyArray<string> | null | undefined;
  removeTeamMemberIDs?: ReadonlyArray<string> | null | undefined;
  removeTenderIDs?: ReadonlyArray<string> | null | undefined;
  removeVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  username?: string | null | undefined;
};
export type useUpdateUserMutation$variables = {
  id: string;
  input: UpdateUserInput;
};
export type useUpdateUserMutation$data = {
  readonly updateUser: {
    readonly areas: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly name: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
    readonly avatarURL: string | null | undefined;
    readonly disabled: boolean;
    readonly email: string;
    readonly hasEditAccess: boolean;
    readonly hasMapAccess: boolean;
    readonly id: string;
    readonly isAdmin: boolean;
    readonly isCeo: boolean;
    readonly isSuperAdmin: boolean;
    readonly name: string;
    readonly openID: string | null | undefined;
    readonly projects: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly code: string;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
    readonly username: string;
  };
};
export type useUpdateUserMutation = {
  response: useUpdateUserMutation$data;
  variables: useUpdateUserMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "updateUser",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "openID",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "avatarURL",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "disabled",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AreaConnection",
        "kind": "LinkedField",
        "name": "areas",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AreaEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "orderBy",
            "value": {
              "field": "CODE"
            }
          },
          {
            "kind": "Literal",
            "name": "where",
            "value": {
              "isFinishedNEQ": true
            }
          }
        ],
        "concreteType": "ProjectConnection",
        "kind": "LinkedField",
        "name": "projects",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProjectEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Project",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "projects(orderBy:{\"field\":\"CODE\"},where:{\"isFinishedNEQ\":true})"
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isSuperAdmin",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isAdmin",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCeo",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasMapAccess",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasEditAccess",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateUserMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateUserMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "91e6ee8fefc340b6121b669a96324268",
    "id": null,
    "metadata": {},
    "name": "useUpdateUserMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateUserMutation(\n  $id: ID!\n  $input: UpdateUserInput!\n) {\n  updateUser(id: $id, input: $input) {\n    id\n    name\n    email\n    username\n    openID\n    avatarURL\n    disabled\n    areas {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n    projects(where: {isFinishedNEQ: true}, orderBy: {field: CODE}) {\n      edges {\n        node {\n          id\n          code\n        }\n      }\n    }\n    isSuperAdmin\n    isAdmin\n    isCeo\n    hasMapAccess\n    hasEditAccess\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0d641293cf2b82e4bb7783e4af79426";

export default node;

/**
 * @generated SignedSource<<e39d49eadd195095e2a4f20da9d7a742>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {
  areaIDs?: ReadonlyArray<string> | null | undefined;
  avatarURL?: string | null | undefined;
  createdAt?: any | null | undefined;
  customerIDs?: ReadonlyArray<string> | null | undefined;
  disabled?: boolean | null | undefined;
  email?: string | null | undefined;
  hasEditAccess?: boolean | null | undefined;
  hasMapAccess?: boolean | null | undefined;
  isAdmin?: boolean | null | undefined;
  isCeo?: boolean | null | undefined;
  isSuperAdmin?: boolean | null | undefined;
  leaderID?: string | null | undefined;
  name?: string | null | undefined;
  openID: string;
  projectIDs?: ReadonlyArray<string> | null | undefined;
  teamMemberIDs?: ReadonlyArray<string> | null | undefined;
  tenderIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  username?: string | null | undefined;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
};
export type useCreateUserMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateUserInput;
};
export type useCreateUserMutation$data = {
  readonly createUser: {
    readonly edges: ReadonlyArray<{
      readonly node: {
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
        readonly email: string | null | undefined;
        readonly hasEditAccess: boolean;
        readonly hasMapAccess: boolean;
        readonly id: string;
        readonly isAdmin: boolean;
        readonly isCeo: boolean;
        readonly isSuperAdmin: boolean;
        readonly leader: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly name: string | null | undefined;
        readonly openID: string;
        readonly projects: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly code: string;
              readonly id: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
        readonly teamMembers: ReadonlyArray<{
          readonly id: string;
          readonly name: string | null | undefined;
        }> | null | undefined;
        readonly username: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type useCreateUserMutation = {
  response: useCreateUserMutation$data;
  variables: useCreateUserMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "UserEdge",
  "kind": "LinkedField",
  "name": "edges",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        (v4/*: any*/),
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
                  "selections": (v5/*: any*/),
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
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "leader",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "teamMembers",
          "plural": true,
          "selections": (v5/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
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
                    (v3/*: any*/),
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
          "name": "isSuperAdmin",
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
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "createUser",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58a40f9da28db2386190522be61f97cc",
    "id": null,
    "metadata": {},
    "name": "useCreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    edges {\n      node {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        leader {\n          id\n          name\n        }\n        teamMembers {\n          id\n          name\n        }\n        projects {\n          edges {\n            node {\n              id\n              code\n            }\n          }\n        }\n        isAdmin\n        isSuperAdmin\n        isCeo\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa43f54669e690d1db8d70c152f5f0cb";

export default node;

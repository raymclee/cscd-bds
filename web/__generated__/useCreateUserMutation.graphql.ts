/**
 * @generated SignedSource<<94c49403e42e5ce0142cf3f7922ecf67>>
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
  email: string;
  hasEditAccess?: boolean | null | undefined;
  hasMapAccess?: boolean | null | undefined;
  isAdmin?: boolean | null | undefined;
  isCeo?: boolean | null | undefined;
  isSuperAdmin?: boolean | null | undefined;
  leaderID?: string | null | undefined;
  name: string;
  openID?: string | null | undefined;
  projectIDs?: ReadonlyArray<string> | null | undefined;
  teamMemberIDs?: ReadonlyArray<string> | null | undefined;
  tenderIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  username: string;
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
        readonly email: string;
        readonly hasEditAccess: boolean;
        readonly hasMapAccess: boolean;
        readonly id: string;
        readonly isAdmin: boolean;
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
v5 = {
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
                  "selections": [
                    (v3/*: any*/),
                    (v4/*: any*/)
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
          (v5/*: any*/)
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
          (v5/*: any*/),
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
    "cacheID": "f9eb6447b30b3780c2b5da0d35b35b78",
    "id": null,
    "metadata": {},
    "name": "useCreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    edges {\n      node {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n            }\n          }\n        }\n        projects {\n          edges {\n            node {\n              id\n              code\n            }\n          }\n        }\n        isAdmin\n        hasMapAccess\n        hasEditAccess\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "81c1b08e610d05d9d263fffc562c65c1";

export default node;

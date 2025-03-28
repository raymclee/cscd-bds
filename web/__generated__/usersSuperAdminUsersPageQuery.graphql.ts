/**
 * @generated SignedSource<<4440e8f4acdeea401008323f88ea2371>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type usersSuperAdminUsersPageQuery$variables = {
  first?: number | null | undefined;
  last?: number | null | undefined;
};
export type usersSuperAdminUsersPageQuery$data = {
  readonly areas: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly projects: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly id: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly users: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly areas: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly code: string;
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
              readonly isFinished: boolean;
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
export type usersSuperAdminUsersPageQuery = {
  response: usersSuperAdminUsersPageQuery$data;
  variables: usersSuperAdminUsersPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "last"
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v4 = {
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
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
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
v6 = {
  "alias": null,
  "args": (v5/*: any*/),
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
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "projects(orderBy:{\"field\":\"CODE\"},where:{\"isFinishedNEQ\":true})"
},
v7 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v8 = [
  {
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
          (v4/*: any*/),
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
            "name": "hasMapAccess",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasEditAccess",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "leader",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "teamMembers",
            "plural": true,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v5/*: any*/),
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFinished",
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
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PageInfo",
    "kind": "LinkedField",
    "name": "pageInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "endCursor",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasNextPage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasPreviousPage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "startCursor",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "kind": "ClientExtension",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__id",
        "storageKey": null
      }
    ]
  }
],
v9 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "usersSuperAdminUsersPageQuery",
    "selections": [
      (v4/*: any*/),
      (v6/*: any*/),
      {
        "alias": "users",
        "args": null,
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "__usersSuperAdminUsersPageQuery_users_connection",
        "plural": false,
        "selections": (v8/*: any*/),
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usersSuperAdminUsersPageQuery",
    "selections": [
      (v4/*: any*/),
      (v6/*: any*/),
      {
        "alias": null,
        "args": (v9/*: any*/),
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": (v8/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v9/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "usersSuperAdminUsersPageQuery_users",
        "kind": "LinkedHandle",
        "name": "users"
      }
    ]
  },
  "params": {
    "cacheID": "3b5d3403ebff3e2997dcda449b48bcbf",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "users"
          ]
        }
      ]
    },
    "name": "usersSuperAdminUsersPageQuery",
    "operationKind": "query",
    "text": "query usersSuperAdminUsersPageQuery(\n  $first: Int\n  $last: Int\n) {\n  areas {\n    edges {\n      node {\n        id\n        name\n        code\n      }\n    }\n  }\n  projects(where: {isFinishedNEQ: true}, orderBy: {field: CODE}) {\n    edges {\n      node {\n        id\n        code\n      }\n    }\n  }\n  users(first: $first, last: $last) {\n    edges {\n      node {\n        id\n        name\n        email\n        username\n        openID\n        avatarURL\n        disabled\n        areas {\n          edges {\n            node {\n              id\n              name\n              code\n            }\n          }\n        }\n        isCeo\n        isAdmin\n        isSuperAdmin\n        hasMapAccess\n        hasEditAccess\n        leader {\n          id\n          name\n        }\n        teamMembers {\n          id\n          name\n        }\n        projects(where: {isFinishedNEQ: true}, orderBy: {field: CODE}) {\n          edges {\n            node {\n              id\n              code\n              isFinished\n            }\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8eef347a2bc4919c31777f7f5b3a0483";

export default node;

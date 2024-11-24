/**
 * @generated SignedSource<<31019ddb68901db9bae08566957efeea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type usersPageQuery$variables = Record<PropertyKey, never>;
export type usersPageQuery$data = {
  readonly users: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly areas: ReadonlyArray<{
          readonly name: string;
        }> | null | undefined;
        readonly id: string;
        readonly isAdmin: boolean;
        readonly isLeader: boolean;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type usersPageQuery = {
  response: usersPageQuery$data;
  variables: usersPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAdmin",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLeader",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "usersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Area",
                    "kind": "LinkedField",
                    "name": "areas",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "usersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Area",
                    "kind": "LinkedField",
                    "name": "areas",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
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
      }
    ]
  },
  "params": {
    "cacheID": "567d3fc9f28afe89b0fb78e9a926dee1",
    "id": null,
    "metadata": {},
    "name": "usersPageQuery",
    "operationKind": "query",
    "text": "query usersPageQuery {\n  users {\n    edges {\n      node {\n        id\n        name\n        areas {\n          name\n          id\n        }\n        isAdmin\n        isLeader\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "590726f35178fc2c6011b2645662c9d7";

export default node;

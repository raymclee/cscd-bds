/**
 * @generated SignedSource<<654455a058dc9f0e7fbfe5a81d7e8cb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type operationsIndexPageQuery$variables = {
  userId: string;
};
export type operationsIndexPageQuery$data = {
  readonly node: {
    readonly projects?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly code: string;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type operationsIndexPageQuery = {
  response: operationsIndexPageQuery$data;
  variables: operationsIndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "field": "CODE"
            }
          ]
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
                (v2/*: any*/),
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
      "storageKey": "projects(orderBy:[{\"field\":\"CODE\"}],where:{\"isFinishedNEQ\":true})"
    }
  ],
  "type": "User",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "operationsIndexPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
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
    "name": "operationsIndexPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3625f0d725a884c8bfcedf447d9f5db9",
    "id": null,
    "metadata": {},
    "name": "operationsIndexPageQuery",
    "operationKind": "query",
    "text": "query operationsIndexPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      projects(where: {isFinishedNEQ: true}, orderBy: [{field: CODE}]) {\n        edges {\n          node {\n            id\n            code\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0fa54ee9e61191abac777df2be10beb5";

export default node;

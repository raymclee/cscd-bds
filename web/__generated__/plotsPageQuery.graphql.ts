/**
 * @generated SignedSource<<c1fe1f14026f068d24ab7c7f606c8bce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type plotsPageQuery$variables = {
  userId: string;
};
export type plotsPageQuery$data = {
  readonly node: {
    readonly areas?: ReadonlyArray<{
      readonly provinces: ReadonlyArray<{
        readonly adcode: number;
        readonly cities: ReadonlyArray<{
          readonly adcode: number;
          readonly districts: ReadonlyArray<{
            readonly adcode: number;
            readonly id: string;
            readonly name: string;
            readonly plots: ReadonlyArray<{
              readonly colorHex: string;
              readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
              readonly id: string;
              readonly name: string;
            }> | null | undefined;
          }> | null | undefined;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
        readonly districts: ReadonlyArray<{
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
          readonly plots: ReadonlyArray<{
            readonly colorHex: string;
            readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
            readonly id: string;
            readonly name: string;
          }> | null | undefined;
        }> | null | undefined;
        readonly id: string;
        readonly name: string;
      }> | null | undefined;
    }> | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type plotsPageQuery = {
  response: plotsPageQuery$data;
  variables: plotsPageQuery$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "districts",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Plot",
      "kind": "LinkedField",
      "name": "plots",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "geoBounds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "colorHex",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Province",
  "kind": "LinkedField",
  "name": "provinces",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "City",
      "kind": "LinkedField",
      "name": "cities",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/)
      ],
      "storageKey": null
    },
    (v5/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "areas",
                "plural": true,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "plotsPageQuery",
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
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "areas",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0c19a5c3053adaf31dd3678a0803af77",
    "id": null,
    "metadata": {},
    "name": "plotsPageQuery",
    "operationKind": "query",
    "text": "query plotsPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    id\n    ... on User {\n      areas {\n        provinces {\n          id\n          name\n          adcode\n          cities {\n            id\n            name\n            adcode\n            districts {\n              id\n              name\n              adcode\n              plots {\n                id\n                name\n                geoBounds\n                colorHex\n              }\n            }\n          }\n          districts {\n            id\n            name\n            adcode\n            plots {\n              id\n              name\n              geoBounds\n              colorHex\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "281f093347a8742ad48a498f57c98113";

export default node;

/**
 * @generated SignedSource<<11b5e976b04d073d1c1fb47650e69871>>
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
          }> | null | undefined;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
        readonly districts: ReadonlyArray<{
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
        readonly id: string;
        readonly name: string;
      }> | null | undefined;
    }> | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly plots: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly colorHex: string;
        readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
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
    (v4/*: any*/)
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
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "PlotConnection",
  "kind": "LinkedField",
  "name": "plots",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PlotEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Plot",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
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
    }
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
      },
      (v7/*: any*/)
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
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "cacheID": "dfbd6106e8727c403689a2bbbddea541",
    "id": null,
    "metadata": {},
    "name": "plotsPageQuery",
    "operationKind": "query",
    "text": "query plotsPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    id\n    ... on User {\n      areas {\n        provinces {\n          id\n          name\n          adcode\n          cities {\n            id\n            name\n            adcode\n            districts {\n              id\n              name\n              adcode\n            }\n          }\n          districts {\n            id\n            name\n            adcode\n          }\n        }\n        id\n      }\n    }\n  }\n  plots {\n    edges {\n      node {\n        id\n        name\n        geoBounds\n        colorHex\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e33bac7755d801e17f54152eb6c82ab";

export default node;

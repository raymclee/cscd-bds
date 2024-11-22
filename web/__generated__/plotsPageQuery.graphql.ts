/**
 * @generated SignedSource<<9522205c44b333ee9c2da7ba676d4045>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type plotsPageQuery$variables = Record<PropertyKey, never>;
export type plotsPageQuery$data = {
  readonly node: {
    readonly areas?: ReadonlyArray<{
      readonly provinces: ReadonlyArray<{
        readonly cities: ReadonlyArray<{
          readonly adcode: number;
          readonly districts: ReadonlyArray<{
            readonly adcode: number;
            readonly name: string;
            readonly plots: ReadonlyArray<{
              readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
              readonly id: string;
            }> | null | undefined;
          }> | null | undefined;
          readonly name: string;
        }> | null | undefined;
        readonly districts: ReadonlyArray<{
          readonly adcode: number;
          readonly name: string;
          readonly plots: ReadonlyArray<{
            readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
            readonly id: string;
          }> | null | undefined;
        }> | null | undefined;
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
    "kind": "Literal",
    "name": "id",
    "value": "US-csus3vphi019cp2tgsq0"
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
  "name": "adcode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Plot",
  "kind": "LinkedField",
  "name": "plots",
  "plural": true,
  "selections": [
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "geoBounds",
      "storageKey": null
    }
  ],
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
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "districts",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "provinces",
                    "plural": true,
                    "selections": [
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
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"US-csus3vphi019cp2tgsq0\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "plotsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
          (v1/*: any*/),
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "provinces",
                    "plural": true,
                    "selections": [
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
                          (v6/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"US-csus3vphi019cp2tgsq0\")"
      }
    ]
  },
  "params": {
    "cacheID": "b2cc6b447ca10435c5508dfcc52f9926",
    "id": null,
    "metadata": {},
    "name": "plotsPageQuery",
    "operationKind": "query",
    "text": "query plotsPageQuery {\n  node(id: \"US-csus3vphi019cp2tgsq0\") {\n    __typename\n    id\n    ... on User {\n      areas {\n        provinces {\n          cities {\n            name\n            adcode\n            districts {\n              name\n              adcode\n              plots {\n                id\n                geoBounds\n              }\n              id\n            }\n            id\n          }\n          districts {\n            name\n            adcode\n            plots {\n              id\n              geoBounds\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1ac2140a7ef5def6633c3f8d83c4eb3";

export default node;

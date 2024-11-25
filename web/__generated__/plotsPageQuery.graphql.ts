/**
 * @generated SignedSource<<b6da770fd43717bbf54dd3553f34397e>>
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
    readonly areas?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly provinces: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly adcode: number;
                readonly cities: {
                  readonly edges: ReadonlyArray<{
                    readonly node: {
                      readonly adcode: number;
                      readonly districts: {
                        readonly edges: ReadonlyArray<{
                          readonly node: {
                            readonly adcode: number;
                            readonly id: string;
                            readonly name: string;
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
                          } | null | undefined;
                        } | null | undefined> | null | undefined;
                      };
                      readonly id: string;
                      readonly name: string;
                    } | null | undefined;
                  } | null | undefined> | null | undefined;
                };
                readonly districts: {
                  readonly edges: ReadonlyArray<{
                    readonly node: {
                      readonly adcode: number;
                      readonly id: string;
                      readonly name: string;
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
                    } | null | undefined;
                  } | null | undefined> | null | undefined;
                };
                readonly id: string;
                readonly name: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
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
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "DistrictConnection",
  "kind": "LinkedField",
  "name": "districts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DistrictEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "District",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/),
            (v4/*: any*/),
            (v5/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ProvinceConnection",
                            "kind": "LinkedField",
                            "name": "provinces",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ProvinceEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Province",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "RequiredField",
                                        "field": (v2/*: any*/),
                                        "action": "NONE",
                                        "path": "node.areas.edges.node.provinces.edges.node.id"
                                      },
                                      (v3/*: any*/),
                                      (v4/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CityConnection",
                                        "kind": "LinkedField",
                                        "name": "cities",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CityEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "City",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "kind": "RequiredField",
                                                    "field": (v2/*: any*/),
                                                    "action": "NONE",
                                                    "path": "node.areas.edges.node.provinces.edges.node.cities.edges.node.id"
                                                  },
                                                  (v3/*: any*/),
                                                  (v4/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "DistrictConnection",
                                                    "kind": "LinkedField",
                                                    "name": "districts",
                                                    "plural": false,
                                                    "selections": [
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "concreteType": "DistrictEdge",
                                                        "kind": "LinkedField",
                                                        "name": "edges",
                                                        "plural": true,
                                                        "selections": [
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "concreteType": "District",
                                                            "kind": "LinkedField",
                                                            "name": "node",
                                                            "plural": false,
                                                            "selections": [
                                                              {
                                                                "kind": "RequiredField",
                                                                "field": (v2/*: any*/),
                                                                "action": "NONE",
                                                                "path": "node.areas.edges.node.provinces.edges.node.cities.edges.node.districts.edges.node.id"
                                                              },
                                                              (v3/*: any*/),
                                                              (v4/*: any*/),
                                                              (v5/*: any*/)
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
                                        "concreteType": "DistrictConnection",
                                        "kind": "LinkedField",
                                        "name": "districts",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "DistrictEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "District",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "kind": "RequiredField",
                                                    "field": (v2/*: any*/),
                                                    "action": "NONE",
                                                    "path": "node.areas.edges.node.provinces.edges.node.districts.edges.node.id"
                                                  },
                                                  (v3/*: any*/),
                                                  (v4/*: any*/),
                                                  (v5/*: any*/)
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
                      }
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ProvinceConnection",
                            "kind": "LinkedField",
                            "name": "provinces",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ProvinceEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Province",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v2/*: any*/),
                                      (v3/*: any*/),
                                      (v4/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CityConnection",
                                        "kind": "LinkedField",
                                        "name": "cities",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CityEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "City",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v2/*: any*/),
                                                  (v3/*: any*/),
                                                  (v4/*: any*/),
                                                  (v6/*: any*/)
                                                ],
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a16b74306e039442bbabae05c78d1e74",
    "id": null,
    "metadata": {},
    "name": "plotsPageQuery",
    "operationKind": "query",
    "text": "query plotsPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    id\n    ... on User {\n      areas {\n        edges {\n          node {\n            provinces {\n              edges {\n                node {\n                  id\n                  name\n                  adcode\n                  cities {\n                    edges {\n                      node {\n                        id\n                        name\n                        adcode\n                        districts {\n                          edges {\n                            node {\n                              id\n                              name\n                              adcode\n                              plots {\n                                edges {\n                                  node {\n                                    id\n                                    name\n                                    geoBounds\n                                    colorHex\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                  districts {\n                    edges {\n                      node {\n                        id\n                        name\n                        adcode\n                        plots {\n                          edges {\n                            node {\n                              id\n                              name\n                              geoBounds\n                              colorHex\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "42820ecfb67d3c68c3cd44362017209a";

export default node;

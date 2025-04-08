/**
 * @generated SignedSource<<8100cc9f488ba02d28ea7352f3d705b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type plotsPageQuery$variables = {
  first?: number | null | undefined;
  last?: number | null | undefined;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "RequiredField",
  "field": (v4/*: any*/),
  "action": "NONE"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = [
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
          (v4/*: any*/),
          (v6/*: any*/),
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
          },
          (v8/*: any*/)
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
  }
],
v10 = {
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
            (v5/*: any*/),
            (v6/*: any*/),
            (v7/*: any*/),
            {
              "alias": "plots",
              "args": null,
              "concreteType": "PlotConnection",
              "kind": "LinkedField",
              "name": "__PlotsPageQuery_plots_connection",
              "plural": false,
              "selections": (v9/*: any*/),
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
v11 = [
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
],
v12 = {
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
            (v4/*: any*/),
            (v6/*: any*/),
            (v7/*: any*/),
            {
              "alias": null,
              "args": (v11/*: any*/),
              "concreteType": "PlotConnection",
              "kind": "LinkedField",
              "name": "plots",
              "plural": false,
              "selections": (v9/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": (v11/*: any*/),
              "filters": null,
              "handle": "connection",
              "key": "PlotsPageQuery_plots",
              "kind": "LinkedHandle",
              "name": "plots"
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
v13 = {
  "count": null,
  "cursor": null,
  "direction": "bidirectional",
  "path": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
                                      (v5/*: any*/),
                                      (v6/*: any*/),
                                      (v7/*: any*/),
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
                                                  (v5/*: any*/),
                                                  (v6/*: any*/),
                                                  (v7/*: any*/),
                                                  (v10/*: any*/)
                                                ],
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v10/*: any*/)
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "plotsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v4/*: any*/),
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
                                      (v4/*: any*/),
                                      (v6/*: any*/),
                                      (v7/*: any*/),
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
                                                  (v4/*: any*/),
                                                  (v6/*: any*/),
                                                  (v7/*: any*/),
                                                  (v12/*: any*/)
                                                ],
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v12/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
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
    "cacheID": "7b546fe253587d074f463de9aad40f8d",
    "id": null,
    "metadata": {
      "connection": [
        (v13/*: any*/),
        (v13/*: any*/)
      ]
    },
    "name": "plotsPageQuery",
    "operationKind": "query",
    "text": "query plotsPageQuery(\n  $userId: ID!\n  $first: Int\n  $last: Int\n) {\n  node(id: $userId) {\n    __typename\n    id\n    ... on User {\n      areas {\n        edges {\n          node {\n            provinces {\n              edges {\n                node {\n                  id\n                  name\n                  adcode\n                  cities {\n                    edges {\n                      node {\n                        id\n                        name\n                        adcode\n                        districts {\n                          edges {\n                            node {\n                              id\n                              name\n                              adcode\n                              plots(first: $first, last: $last) {\n                                edges {\n                                  node {\n                                    id\n                                    name\n                                    geoBounds\n                                    colorHex\n                                    __typename\n                                  }\n                                  cursor\n                                }\n                                pageInfo {\n                                  endCursor\n                                  hasNextPage\n                                  hasPreviousPage\n                                  startCursor\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  }\n                  districts {\n                    edges {\n                      node {\n                        id\n                        name\n                        adcode\n                        plots(first: $first, last: $last) {\n                          edges {\n                            node {\n                              id\n                              name\n                              geoBounds\n                              colorHex\n                              __typename\n                            }\n                            cursor\n                          }\n                          pageInfo {\n                            endCursor\n                            hasNextPage\n                            hasPreviousPage\n                            startCursor\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb0e2959fd05ca01fdd77937e083dbd5";

export default node;

/**
 * @generated SignedSource<<81b57bc47c3b8e6822d6227b40aa9a77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersResultPageQuery$variables = {
  id: string;
  userId: string;
};
export type tendersResultPageQuery$data = {
  readonly node: {
    readonly areas?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly tenders: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly " $fragmentSpreads": FragmentRefs<"tendersResultModal_tender">;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"tendersResultModal_competitors">;
};
export type tendersResultPageQuery = {
  response: tendersResultPageQuery$data;
  variables: tendersResultPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
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
v2 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersResultPageQuery",
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
                            "args": (v2/*: any*/),
                            "concreteType": "TenderConnection",
                            "kind": "LinkedField",
                            "name": "tenders",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "TenderEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Tender",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "args": null,
                                        "kind": "FragmentSpread",
                                        "name": "tendersResultModal_tender"
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
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "tendersResultModal_competitors"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tendersResultPageQuery",
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
                            "args": (v2/*: any*/),
                            "concreteType": "TenderConnection",
                            "kind": "LinkedField",
                            "name": "tenders",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "TenderEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Tender",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": (v4/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
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
            "type": "User",
            "abstractKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CompetitorConnection",
        "kind": "LinkedField",
        "name": "competitors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CompetitorEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Competitor",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": (v4/*: any*/),
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
    "cacheID": "7a187b51c476e6a123e9c3a5f3ac4151",
    "id": null,
    "metadata": {},
    "name": "tendersResultPageQuery",
    "operationKind": "query",
    "text": "query tendersResultPageQuery(\n  $id: ID!\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            tenders(where: {id: $id}) {\n              edges {\n                node {\n                  ...tendersResultModal_tender\n                  id\n                }\n              }\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n  ...tendersResultModal_competitors\n}\n\nfragment tendersResultModal_competitors on Query {\n  competitors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment tendersResultModal_tender on Tender {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "fd91cceb4e8b5330fc40b160501b7b2d";

export default node;

/**
 * @generated SignedSource<<a0e9c642bf84476bc64eb866f3b8d5ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tenderForm_provinceCityDistrictSelectorQuery$variables = {
  areaID: string;
};
export type tenderForm_provinceCityDistrictSelectorQuery$data = {
  readonly node: {
    readonly provinces?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly cities: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly districts: {
                  readonly edges: ReadonlyArray<{
                    readonly node: {
                      readonly id: string;
                      readonly name: string;
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
                readonly id: string;
                readonly name: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
          readonly id: string;
          readonly name: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type tenderForm_provinceCityDistrictSelectorQuery = {
  response: tenderForm_provinceCityDistrictSelectorQuery$data;
  variables: tenderForm_provinceCityDistrictSelectorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "areaID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "areaID"
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
v5 = {
  "kind": "InlineFragment",
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
  "type": "Area",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tenderForm_provinceCityDistrictSelectorQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v5/*: any*/)
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
    "name": "tenderForm_provinceCityDistrictSelectorQuery",
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
          (v5/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5791ebdaaf1e887e7bf2f7bc9583931c",
    "id": null,
    "metadata": {},
    "name": "tenderForm_provinceCityDistrictSelectorQuery",
    "operationKind": "query",
    "text": "query tenderForm_provinceCityDistrictSelectorQuery(\n  $areaID: ID!\n) {\n  node(id: $areaID) {\n    __typename\n    ... on Area {\n      provinces {\n        edges {\n          node {\n            id\n            name\n            cities {\n              edges {\n                node {\n                  id\n                  name\n                  districts {\n                    edges {\n                      node {\n                        id\n                        name\n                      }\n                    }\n                  }\n                }\n              }\n            }\n            districts {\n              edges {\n                node {\n                  id\n                  name\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "242dbe4964aaa187d69fb7abdf4c7a0d";

export default node;

/**
 * @generated SignedSource<<376bd813c1c8b2b61977b032390a40e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type districtPlotsQuery$variables = {
  adcode: number;
};
export type districtPlotsQuery$data = {
  readonly districts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
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
};
export type districtPlotsQuery = {
  response: districtPlotsQuery$data;
  variables: districtPlotsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "adcode"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "adcode",
        "variableName": "adcode"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
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
    "name": "districtPlotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "districtPlotsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "8e2b60aa80bb91697fc103df1f486b43",
    "id": null,
    "metadata": {},
    "name": "districtPlotsQuery",
    "operationKind": "query",
    "text": "query districtPlotsQuery(\n  $adcode: Int!\n) {\n  districts(where: {adcode: $adcode}) {\n    edges {\n      node {\n        plots {\n          edges {\n            node {\n              id\n              name\n              geoBounds\n              colorHex\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "823838f3ebe2fe443b1f31e4e19db63d";

export default node;

/**
 * @generated SignedSource<<62ea9c7dd19fc9791929a87d92ab9d9f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type v1MapIndexPageDistrictQuery$variables = {
  adcode: number;
};
export type v1MapIndexPageDistrictQuery$data = {
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
export type v1MapIndexPageDistrictQuery = {
  response: v1MapIndexPageDistrictQuery$data;
  variables: v1MapIndexPageDistrictQuery$variables;
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
    "name": "v1MapIndexPageDistrictQuery",
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
    "name": "v1MapIndexPageDistrictQuery",
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
    "cacheID": "6594687b08a3b2f1f7b9a4e8815a2d8e",
    "id": null,
    "metadata": {},
    "name": "v1MapIndexPageDistrictQuery",
    "operationKind": "query",
    "text": "query v1MapIndexPageDistrictQuery(\n  $adcode: Int!\n) {\n  districts(where: {adcode: $adcode}) {\n    edges {\n      node {\n        plots {\n          edges {\n            node {\n              id\n              name\n              geoBounds\n              colorHex\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1498619507245af99159b48e1ca25774";

export default node;

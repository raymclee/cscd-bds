/**
 * @generated SignedSource<<1147fb434fab4a2c7bf5c57bb0a15de1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MapIndexPageDistrictQuery$variables = {
  adcode: number;
};
export type MapIndexPageDistrictQuery$data = {
  readonly districts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly plots: ReadonlyArray<{
          readonly colorHex: string;
          readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type MapIndexPageDistrictQuery = {
  response: MapIndexPageDistrictQuery$data;
  variables: MapIndexPageDistrictQuery$variables;
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
  "concreteType": "Plot",
  "kind": "LinkedField",
  "name": "plots",
  "plural": true,
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MapIndexPageDistrictQuery",
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
    "name": "MapIndexPageDistrictQuery",
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
    "cacheID": "176dac56823832b93eb15e5031d57737",
    "id": null,
    "metadata": {},
    "name": "MapIndexPageDistrictQuery",
    "operationKind": "query",
    "text": "query MapIndexPageDistrictQuery(\n  $adcode: Int!\n) {\n  districts(where: {adcode: $adcode}) {\n    edges {\n      node {\n        plots {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f9789c111b3e6042a26848b143cb452";

export default node;
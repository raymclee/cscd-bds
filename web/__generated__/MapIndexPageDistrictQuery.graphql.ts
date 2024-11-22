/**
 * @generated SignedSource<<eb40afc5df5e098dbd26db3cee2957fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MapIndexPageDistrictQuery$variables = Record<PropertyKey, never>;
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
    "kind": "Literal",
    "name": "where",
    "value": {
      "adcode": 1
    }
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapIndexPageDistrictQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "districts(where:{\"adcode\":1})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapIndexPageDistrictQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "districts(where:{\"adcode\":1})"
      }
    ]
  },
  "params": {
    "cacheID": "41c96192cdfde26919ed971c08e42d7c",
    "id": null,
    "metadata": {},
    "name": "MapIndexPageDistrictQuery",
    "operationKind": "query",
    "text": "query MapIndexPageDistrictQuery {\n  districts(where: {adcode: 1}) {\n    edges {\n      node {\n        plots {\n          id\n          name\n          geoBounds\n          colorHex\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "71785a811fc54ed7238388e35b4f3e00";

export default node;

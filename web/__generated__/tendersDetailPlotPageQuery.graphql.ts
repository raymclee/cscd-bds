/**
 * @generated SignedSource<<853d7d2d60f75c41890f87bd74594ed0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tendersDetailPlotPageQuery$variables = {
  id: string;
};
export type tendersDetailPlotPageQuery$data = {
  readonly node: {
    readonly geoBounds?: ReadonlyArray<ReadonlyArray<number | null | undefined> | null | undefined> | null | undefined;
    readonly geoCoordinate?: {
      readonly coordinates: ReadonlyArray<number>;
    } | null | undefined;
    readonly id?: string;
    readonly name?: string;
  } | null | undefined;
};
export type tendersDetailPlotPageQuery = {
  response: tendersDetailPlotPageQuery$data;
  variables: tendersDetailPlotPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "geoCoordinate",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "coordinates",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoBounds",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersDetailPlotPageQuery",
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
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "type": "Tender",
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
    "name": "tendersDetailPlotPageQuery",
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
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "type": "Tender",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4647a4dd123d42e37e6046d9501767f6",
    "id": null,
    "metadata": {},
    "name": "tendersDetailPlotPageQuery",
    "operationKind": "query",
    "text": "query tendersDetailPlotPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Tender {\n      id\n      name\n      geoCoordinate {\n        coordinates\n      }\n      geoBounds\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "09b9dca3b2fe0a88d2d98583fb3d8b20";

export default node;

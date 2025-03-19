/**
 * @generated SignedSource<<5fa11dcf58b1b439c401ca85d81dcd76>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tendersDashboardDetailPageQuery$variables = {
  id: string;
};
export type tendersDashboardDetailPageQuery$data = {
  readonly node: {
    readonly geoCoordinate?: {
      readonly coordinates: ReadonlyArray<number>;
    } | null | undefined;
    readonly id?: string;
    readonly name?: string;
  } | null | undefined;
};
export type tendersDashboardDetailPageQuery = {
  response: tendersDashboardDetailPageQuery$data;
  variables: tendersDashboardDetailPageQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersDashboardDetailPageQuery",
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
              (v4/*: any*/)
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
    "name": "tendersDashboardDetailPageQuery",
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
              (v4/*: any*/)
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
    "cacheID": "1fb69b88cd7c2a23c6dda416b75ba9b9",
    "id": null,
    "metadata": {},
    "name": "tendersDashboardDetailPageQuery",
    "operationKind": "query",
    "text": "query tendersDashboardDetailPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Tender {\n      id\n      name\n      geoCoordinate {\n        coordinates\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "dcfc714a87fe20150846f7d37d6e583b";

export default node;

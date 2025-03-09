/**
 * @generated SignedSource<<a4ddb364846517f741c2d8c2d47090b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type searchLocationSelectQuery$variables = {
  areaId: string;
  keyword: string;
};
export type searchLocationSelectQuery$data = {
  readonly inputtips: ReadonlyArray<{
    readonly address: string;
    readonly city: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly district: {
      readonly id: string;
      readonly name: string;
    };
    readonly id: string;
    readonly lat: number;
    readonly lng: number;
    readonly name: string;
    readonly province: {
      readonly area: {
        readonly id: string;
      } | null | undefined;
      readonly id: string;
      readonly name: string;
    };
  }>;
};
export type searchLocationSelectQuery = {
  response: searchLocationSelectQuery$data;
  variables: searchLocationSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "areaId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword"
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "areaId",
        "variableName": "areaId"
      },
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      }
    ],
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "inputtips",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "address",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Province",
        "kind": "LinkedField",
        "name": "province",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "District",
        "kind": "LinkedField",
        "name": "district",
        "plural": false,
        "selections": (v3/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lng",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lat",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "searchLocationSelectQuery",
    "selections": (v4/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "searchLocationSelectQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "0ae8b1f96a9f9e9ad86fd8fac8cf696c",
    "id": null,
    "metadata": {},
    "name": "searchLocationSelectQuery",
    "operationKind": "query",
    "text": "query searchLocationSelectQuery(\n  $areaId: ID!\n  $keyword: String!\n) {\n  inputtips(areaId: $areaId, keyword: $keyword) {\n    id\n    name\n    address\n    province {\n      area {\n        id\n      }\n      id\n      name\n    }\n    city {\n      id\n      name\n    }\n    district {\n      id\n      name\n    }\n    lng\n    lat\n  }\n}\n"
  }
};
})();

(node as any).hash = "09e27a15c58cb4f7ff304b945566a63c";

export default node;

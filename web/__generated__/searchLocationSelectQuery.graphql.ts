/**
 * @generated SignedSource<<cbaea71497b1e3946fceaf39a27579ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type searchLocationSelectQuery$variables = {
  keyword: string;
};
export type searchLocationSelectQuery$data = {
  readonly searchLocation: ReadonlyArray<{
    readonly city: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly district: {
      readonly id: string;
      readonly name: string;
    };
    readonly fullAddress: string;
    readonly id: string;
    readonly province: {
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
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      }
    ],
    "concreteType": "Location",
    "kind": "LinkedField",
    "name": "searchLocation",
    "plural": true,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "fullAddress",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Province",
        "kind": "LinkedField",
        "name": "province",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "City",
        "kind": "LinkedField",
        "name": "city",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "District",
        "kind": "LinkedField",
        "name": "district",
        "plural": false,
        "selections": (v2/*: any*/),
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
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "searchLocationSelectQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "3c5dd4d3d8d356042d0cfd12847505ac",
    "id": null,
    "metadata": {},
    "name": "searchLocationSelectQuery",
    "operationKind": "query",
    "text": "query searchLocationSelectQuery(\n  $keyword: String!\n) {\n  searchLocation(keyword: $keyword) {\n    id\n    fullAddress\n    province {\n      id\n      name\n    }\n    city {\n      id\n      name\n    }\n    district {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8932439a5e399f81101e34455e0c8cdc";

export default node;

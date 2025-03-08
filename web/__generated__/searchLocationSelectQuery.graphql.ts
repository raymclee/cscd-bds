/**
 * @generated SignedSource<<8ba0c2c3c1b2e00d70a47bfcc3b9cc71>>
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
    readonly lat: number;
    readonly lng: number;
    readonly name: string;
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
v1 = [
  {
    "kind": "Variable",
    "name": "keyword",
    "variableName": "keyword"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Province",
  "kind": "LinkedField",
  "name": "province",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "City",
  "kind": "LinkedField",
  "name": "city",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "district",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lng",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lat",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "searchLocationSelectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "inputtips",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/)
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
    "name": "searchLocationSelectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "inputtips",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6f76ee996f9719d5af415f54c83ff88e",
    "id": null,
    "metadata": {},
    "name": "searchLocationSelectQuery",
    "operationKind": "query",
    "text": "query searchLocationSelectQuery(\n  $keyword: String!\n) {\n  inputtips(keyword: $keyword) {\n    name\n    address\n    province {\n      id\n      name\n    }\n    city {\n      id\n      name\n    }\n    district {\n      id\n      name\n    }\n    lng\n    lat\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1bc693f6b99d61c2281e7689e4f580f";

export default node;

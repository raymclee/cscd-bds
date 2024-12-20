/**
 * @generated SignedSource<<3119dd390e4c40ef1a6b652c4a57efd8>>
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
      readonly name: string;
    } | null | undefined;
    readonly district: {
      readonly name: string;
    };
    readonly fullAddress: string;
    readonly province: {
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
  "name": "fullAddress",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
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
        "name": "searchLocation",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Province",
            "kind": "LinkedField",
            "name": "province",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "city",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "District",
            "kind": "LinkedField",
            "name": "district",
            "plural": false,
            "selections": (v4/*: any*/),
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
    "name": "searchLocationSelectQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "searchLocation",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Province",
            "kind": "LinkedField",
            "name": "province",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "City",
            "kind": "LinkedField",
            "name": "city",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "District",
            "kind": "LinkedField",
            "name": "district",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3959266b1953316e784f1fc5d5eb6c18",
    "id": null,
    "metadata": {},
    "name": "searchLocationSelectQuery",
    "operationKind": "query",
    "text": "query searchLocationSelectQuery(\n  $keyword: String!\n) {\n  searchLocation(keyword: $keyword) {\n    fullAddress\n    province {\n      name\n      id\n    }\n    city {\n      name\n      id\n    }\n    district {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b4bbcf09594d4646efe5239820535082";

export default node;

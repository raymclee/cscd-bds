/**
 * @generated SignedSource<<df8e7abf036b8393872901c58ec1568a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tendersIdPageQuery$variables = {
  id: string;
};
export type tendersIdPageQuery$data = {
  readonly node: {
    readonly id?: string;
  } | null | undefined;
};
export type tendersIdPageQuery = {
  response: tendersIdPageQuery$data;
  variables: tendersIdPageQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersIdPageQuery",
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
              (v2/*: any*/)
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
    "name": "tendersIdPageQuery",
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aac591b6c9f8b5cf95eaebf7be3cbb77",
    "id": null,
    "metadata": {},
    "name": "tendersIdPageQuery",
    "operationKind": "query",
    "text": "query tendersIdPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Tender {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff9420f3297b9a48b71aa4b4a6bb69d5";

export default node;

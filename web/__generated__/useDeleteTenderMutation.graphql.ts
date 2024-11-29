/**
 * @generated SignedSource<<d1cc5de04900c8eac3766002a7de1a11>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteTenderMutation$variables = {
  id: string;
};
export type useDeleteTenderMutation$data = {
  readonly deleteTender: {
    readonly id: string;
  };
};
export type useDeleteTenderMutation = {
  response: useDeleteTenderMutation$data;
  variables: useDeleteTenderMutation$variables;
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
    "name": "useDeleteTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "deleteTender",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "deleteTender",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "64bbb7fde8cc5e20b44dc83881133a1b",
    "id": null,
    "metadata": {},
    "name": "useDeleteTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteTenderMutation(\n  $id: ID!\n) {\n  deleteTender(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "304c898c48cfd35e8a4ff3c30ce779a2";

export default node;

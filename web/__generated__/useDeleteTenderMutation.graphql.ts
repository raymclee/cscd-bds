/**
 * @generated SignedSource<<c52b9b3c1c48b9e0a2dc61f89042a705>>
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
    readonly createdAt: any;
    readonly discoveryDate: any;
    readonly fullAddress: string | null | undefined;
    readonly id: string;
    readonly name: string;
    readonly status: number;
    readonly tenderDate: any | null | undefined;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Tender",
    "kind": "LinkedField",
    "name": "deleteTender",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
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
        "kind": "ScalarField",
        "name": "tenderDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "discoveryDate",
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
    "name": "useDeleteTenderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteTenderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "238b11024fc19c6a38b7b11e13457a42",
    "id": null,
    "metadata": {},
    "name": "useDeleteTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteTenderMutation(\n  $id: ID!\n) {\n  deleteTender(id: $id) {\n    id\n    name\n    status\n    createdAt\n    fullAddress\n    tenderDate\n    discoveryDate\n  }\n}\n"
  }
};
})();

(node as any).hash = "d7d0a4f92df6333549fc44f8d47c7379";

export default node;

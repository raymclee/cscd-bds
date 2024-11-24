/**
 * @generated SignedSource<<faeaa53e47d00fa4139b75d3eb660766>>
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
    "cacheID": "64bbb7fde8cc5e20b44dc83881133a1b",
    "id": null,
    "metadata": {},
    "name": "useDeleteTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteTenderMutation(\n  $id: ID!\n) {\n  deleteTender(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "797a0dc698973a1b636f12b79ee30d65";

export default node;

/**
 * @generated SignedSource<<080c8cfb8b54bbd765a713a03de93720>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteUserMutation$variables = {
  id: string;
};
export type useDeleteUserMutation$data = {
  readonly deleteUser: {
    readonly id: string;
  };
};
export type useDeleteUserMutation = {
  response: useDeleteUserMutation$data;
  variables: useDeleteUserMutation$variables;
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
    "name": "useDeleteUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "deleteUser",
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
    "name": "useDeleteUserMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "deleteUser",
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
    "cacheID": "ed8c6918e318db31ca9a8feb6c849a2b",
    "id": null,
    "metadata": {},
    "name": "useDeleteUserMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteUserMutation(\n  $id: ID!\n) {\n  deleteUser(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "28d6c7590c43e2826d07294c5fa4aa92";

export default node;

/**
 * @generated SignedSource<<fea56cea100f09c9290bc2f68bd94d94>>
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "deleteUser",
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
    "name": "useDeleteUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteUserMutation",
    "selections": (v1/*: any*/)
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

(node as any).hash = "29161588b86fedde5e53cbb93f7aace1";

export default node;

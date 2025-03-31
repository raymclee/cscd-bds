/**
 * @generated SignedSource<<db71d69027cab5363001fc76188c8917>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useVoidTenderMutation$variables = {
  id: string;
};
export type useVoidTenderMutation$data = {
  readonly voidTender: {
    readonly id: string;
    readonly status: number;
  };
};
export type useVoidTenderMutation = {
  response: useVoidTenderMutation$data;
  variables: useVoidTenderMutation$variables;
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
    "name": "voidTender",
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
        "name": "status",
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
    "name": "useVoidTenderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useVoidTenderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8cbfeba301ada19ff63df29ce8ffe401",
    "id": null,
    "metadata": {},
    "name": "useVoidTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useVoidTenderMutation(\n  $id: ID!\n) {\n  voidTender(id: $id) {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "78e41141c2af1f49432378a00eaadf21";

export default node;

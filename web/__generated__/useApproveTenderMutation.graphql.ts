/**
 * @generated SignedSource<<ca3858960fd32fa182b7cd8761575fac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useApproveTenderMutation$variables = {
  id: string;
};
export type useApproveTenderMutation$data = {
  readonly approveTender: {
    readonly id: string;
  };
};
export type useApproveTenderMutation = {
  response: useApproveTenderMutation$data;
  variables: useApproveTenderMutation$variables;
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
    "name": "approveTender",
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
    "name": "useApproveTenderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useApproveTenderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bdf9f00bdfeaefb36dfde64574afe739",
    "id": null,
    "metadata": {},
    "name": "useApproveTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useApproveTenderMutation(\n  $id: ID!\n) {\n  approveTender(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7cac16b58421852bd68fc9b54b15d219";

export default node;

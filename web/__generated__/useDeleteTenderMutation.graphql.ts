/**
 * @generated SignedSource<<c60db319df83f12252bb657042a9df3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteTenderMutation$variables = {
  connections: ReadonlyArray<string>;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "deleteTender",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useDeleteTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "deleteTender",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
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

(node as any).hash = "1d4479552786700011d5a23c5a80eee6";

export default node;

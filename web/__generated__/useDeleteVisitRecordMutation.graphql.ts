/**
 * @generated SignedSource<<64d1899e2cb671d8aa68175a24b2478f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteVisitRecordMutation$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type useDeleteVisitRecordMutation$data = {
  readonly deleteVisitRecord: {
    readonly id: string;
  };
};
export type useDeleteVisitRecordMutation = {
  response: useDeleteVisitRecordMutation$data;
  variables: useDeleteVisitRecordMutation$variables;
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
    "name": "useDeleteVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "VisitRecord",
        "kind": "LinkedField",
        "name": "deleteVisitRecord",
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
    "name": "useDeleteVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "VisitRecord",
        "kind": "LinkedField",
        "name": "deleteVisitRecord",
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
    "cacheID": "4e75e90f6564afe8b964c17387012b53",
    "id": null,
    "metadata": {},
    "name": "useDeleteVisitRecordMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteVisitRecordMutation(\n  $id: ID!\n) {\n  deleteVisitRecord(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d932182d2825495ea687208069fa9dc3";

export default node;

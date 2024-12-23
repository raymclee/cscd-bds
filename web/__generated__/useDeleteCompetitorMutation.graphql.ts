/**
 * @generated SignedSource<<e8ca30dc379f9233c6b34ef3ca0729f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useDeleteCompetitorMutation$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type useDeleteCompetitorMutation$data = {
  readonly deleteCompetitor: {
    readonly id: string;
  };
};
export type useDeleteCompetitorMutation = {
  response: useDeleteCompetitorMutation$data;
  variables: useDeleteCompetitorMutation$variables;
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
    "name": "useDeleteCompetitorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Competitor",
        "kind": "LinkedField",
        "name": "deleteCompetitor",
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
    "name": "useDeleteCompetitorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Competitor",
        "kind": "LinkedField",
        "name": "deleteCompetitor",
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
    "cacheID": "43c0041ed32cdd96c3e52af95190a9e3",
    "id": null,
    "metadata": {},
    "name": "useDeleteCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteCompetitorMutation(\n  $id: ID!\n) {\n  deleteCompetitor(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6e698fd8a3fb0a105e33ad3613f75971";

export default node;

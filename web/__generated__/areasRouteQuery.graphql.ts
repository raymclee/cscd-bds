/**
 * @generated SignedSource<<748b4d83e4ae4f559066a86a7b6d0e3e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type areasRouteQuery$variables = Record<PropertyKey, never>;
export type areasRouteQuery$data = {
  readonly areas: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type areasRouteQuery = {
  response: areasRouteQuery$data;
  variables: areasRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AreaConnection",
    "kind": "LinkedField",
    "name": "areas",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AreaEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "node",
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
                "name": "code",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "areasRouteQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "areasRouteQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d4c38968c836d875f8961de705b838c3",
    "id": null,
    "metadata": {},
    "name": "areasRouteQuery",
    "operationKind": "query",
    "text": "query areasRouteQuery {\n  areas {\n    edges {\n      node {\n        id\n        name\n        code\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "46534710c0ac60e4d6b37c643d4ee7d6";

export default node;

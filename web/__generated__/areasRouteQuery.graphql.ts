/**
 * @generated SignedSource<<e20d8caddefe0abe1da9fa5702f5edd3>>
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
        readonly leaderChatID: string | null | undefined;
        readonly name: string;
        readonly salesChatID: string | null | undefined;
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "leaderChatID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "salesChatID",
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
    "cacheID": "1a4fd04728e49efd612daab48016a5ef",
    "id": null,
    "metadata": {},
    "name": "areasRouteQuery",
    "operationKind": "query",
    "text": "query areasRouteQuery {\n  areas {\n    edges {\n      node {\n        id\n        name\n        code\n        leaderChatID\n        salesChatID\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ff69be7c0a502fefe9f34eef64d9211";

export default node;

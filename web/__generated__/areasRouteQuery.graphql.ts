/**
 * @generated SignedSource<<a0ca74c85a4bbac8ace52f9cc30265a0>>
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
    "cacheID": "dfbb6931184901cf8859df1e10d16098",
    "id": null,
    "metadata": {},
    "name": "areasRouteQuery",
    "operationKind": "query",
    "text": "query areasRouteQuery {\n  areas {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9f279b2c38630afac2cbba7fee25b6eb";

export default node;

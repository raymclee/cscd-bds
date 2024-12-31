/**
 * @generated SignedSource<<b328582e90fac0da25282f1854fccc8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type operationsPageQuery$variables = Record<PropertyKey, never>;
export type operationsPageQuery$data = {
  readonly operations: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly cjeLj: number | null | undefined;
        readonly cjeYs: number | null | undefined;
        readonly id: string;
        readonly xjlLj: number | null | undefined;
        readonly xjlYs: number | null | undefined;
        readonly xmglf: number | null | undefined;
        readonly xmsjf: number | null | undefined;
        readonly yyeLj: number | null | undefined;
        readonly yyeYs: number | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type operationsPageQuery = {
  response: operationsPageQuery$data;
  variables: operationsPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "last",
        "value": 1
      },
      {
        "kind": "Literal",
        "name": "orderBy",
        "value": {
          "direction": "DESC",
          "field": "CREATED_AT"
        }
      }
    ],
    "concreteType": "OperationConnection",
    "kind": "LinkedField",
    "name": "operations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "OperationEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Operation",
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
                "name": "cjeYs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cjeLj",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "yyeYs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "yyeLj",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "xjlYs",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "xjlLj",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "xmglf",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "xmsjf",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "operations(last:1,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "operationsPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "operationsPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e89d658a9bd9d4650ac1131f9f1706de",
    "id": null,
    "metadata": {},
    "name": "operationsPageQuery",
    "operationKind": "query",
    "text": "query operationsPageQuery {\n  operations(last: 1, orderBy: {field: CREATED_AT, direction: DESC}) {\n    edges {\n      node {\n        id\n        cjeYs\n        cjeLj\n        yyeYs\n        yyeLj\n        xjlYs\n        xjlLj\n        xmglf\n        xmsjf\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "88c7aae2d83c6cdc2e6f5113714face7";

export default node;

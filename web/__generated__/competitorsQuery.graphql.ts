/**
 * @generated SignedSource<<43c7dfe5a67ddd2d05c04328ffea422f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type competitorsQuery$variables = Record<PropertyKey, never>;
export type competitorsQuery$data = {
  readonly competitors: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly shortName: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type competitorsQuery = {
  response: competitorsQuery$data;
  variables: competitorsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "CompetitorConnection",
    "kind": "LinkedField",
    "name": "competitors",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CompetitorEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Competitor",
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
                "name": "shortName",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__id",
            "storageKey": null
          }
        ]
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
    "name": "competitorsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "competitorsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "86a90556e72a56acfca3702bd5123388",
    "id": null,
    "metadata": {},
    "name": "competitorsQuery",
    "operationKind": "query",
    "text": "query competitorsQuery {\n  competitors {\n    edges {\n      node {\n        id\n        name\n        shortName\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9977c219066f88711709e66fad75913";

export default node;

/**
 * @generated SignedSource<<99f027ee83f26a9fecf96c96f9a68ee5>>
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
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
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
    "cacheID": "e6fa8fae90bbeeecfaa8767c5b7082e8",
    "id": null,
    "metadata": {},
    "name": "competitorsQuery",
    "operationKind": "query",
    "text": "query competitorsQuery {\n  competitors {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "02f2a1bb5d6ac07fc7bd4148832bd134";

export default node;

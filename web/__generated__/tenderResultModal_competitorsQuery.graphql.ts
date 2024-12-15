/**
 * @generated SignedSource<<7f599425071fa55658a7cf5d15878c21>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tenderResultModal_competitorsQuery$variables = Record<PropertyKey, never>;
export type tenderResultModal_competitorsQuery$data = {
  readonly competitors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly shortName: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type tenderResultModal_competitorsQuery = {
  response: tenderResultModal_competitorsQuery$data;
  variables: tenderResultModal_competitorsQuery$variables;
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
                "name": "shortName",
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
    "name": "tenderResultModal_competitorsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "tenderResultModal_competitorsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b8fbca81921ffb4bfb4f80aa24797949",
    "id": null,
    "metadata": {},
    "name": "tenderResultModal_competitorsQuery",
    "operationKind": "query",
    "text": "query tenderResultModal_competitorsQuery {\n  competitors {\n    edges {\n      node {\n        id\n        shortName\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "43215ada3e2be33118a9ab4a189edd41";

export default node;

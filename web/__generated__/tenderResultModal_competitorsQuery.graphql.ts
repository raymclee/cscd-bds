/**
 * @generated SignedSource<<1c2b2945f91e318a0ac6528fae970402>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderResultModal_competitorsQuery$variables = Record<PropertyKey, never>;
export type tenderResultModal_competitorsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"tenderResultModal_competitors">;
};
export type tenderResultModal_competitorsQuery = {
  response: tenderResultModal_competitorsQuery$data;
  variables: tenderResultModal_competitorsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "tenderResultModal_competitorsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "tenderResultModal_competitors"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "tenderResultModal_competitorsQuery",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "750c2f353bc2a08dbd52b009585bca8a",
    "id": null,
    "metadata": {},
    "name": "tenderResultModal_competitorsQuery",
    "operationKind": "query",
    "text": "query tenderResultModal_competitorsQuery {\n  ...tenderResultModal_competitors\n}\n\nfragment tenderResultModal_competitors on Query {\n  competitors {\n    edges {\n      node {\n        id\n        shortName\n        name\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "b21ed01e17f11f544afedddd21b76d99";

export default node;

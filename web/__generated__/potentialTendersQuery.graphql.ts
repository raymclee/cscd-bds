/**
 * @generated SignedSource<<c07bb3463287f9d47988d814ddbb23d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type potentialTendersQuery$variables = Record<PropertyKey, never>;
export type potentialTendersQuery$data = {
  readonly potentialTenders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type potentialTendersQuery = {
  response: potentialTendersQuery$data;
  variables: potentialTendersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PotentialTenderConnection",
    "kind": "LinkedField",
    "name": "potentialTenders",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PotentialTenderEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PotentialTender",
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
    "name": "potentialTendersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "potentialTendersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "993dc2e3498d57f3357da971890d5088",
    "id": null,
    "metadata": {},
    "name": "potentialTendersQuery",
    "operationKind": "query",
    "text": "query potentialTendersQuery {\n  potentialTenders {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dc985393fa9893968c591be8ed9578e8";

export default node;

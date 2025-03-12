/**
 * @generated SignedSource<<b3c402cac54b0542594e0c08235f8c29>>
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
        readonly amount: string | null | undefined;
        readonly contact: string | null | undefined;
        readonly contactEmail: string | null | undefined;
        readonly contactPhone: string | null | undefined;
        readonly date: string | null | undefined;
        readonly description: string | null | undefined;
        readonly id: string;
        readonly location: string | null | undefined;
        readonly refURL: string;
        readonly requirement: string | null | undefined;
        readonly size: string | null | undefined;
        readonly status: string | null | undefined;
        readonly title: string;
        readonly type: string | null | undefined;
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
    "args": [
      {
        "kind": "Literal",
        "name": "where",
        "value": {
          "dateGTE": "2025-01-01"
        }
      }
    ],
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "refURL",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requirement",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "date",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "size",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "location",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contact",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactPhone",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contactEmail",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "potentialTenders(where:{\"dateGTE\":\"2025-01-01\"})"
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
    "cacheID": "141144bfe1b3438dcbd68ac0967ef85b",
    "id": null,
    "metadata": {},
    "name": "potentialTendersQuery",
    "operationKind": "query",
    "text": "query potentialTendersQuery {\n  potentialTenders(where: {dateGTE: \"2025-01-01\"}) {\n    edges {\n      node {\n        id\n        refURL\n        title\n        description\n        requirement\n        date\n        type\n        status\n        amount\n        size\n        location\n        contact\n        contactPhone\n        contactEmail\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dbd4af67f39b650a857ab84f18debea8";

export default node;

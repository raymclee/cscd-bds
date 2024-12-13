/**
 * @generated SignedSource<<a7bb328c3926626785b9b7db45203fc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useSetCompetitorMutation$variables = {
  competitorId: string;
  tenderId: string;
  won: boolean;
};
export type useSetCompetitorMutation$data = {
  readonly setTenderCompetitor: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
  };
};
export type useSetCompetitorMutation = {
  response: useSetCompetitorMutation$data;
  variables: useSetCompetitorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "competitorId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tenderId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "won"
},
v3 = [
  {
    "kind": "Variable",
    "name": "competitorId",
    "variableName": "competitorId"
  },
  {
    "kind": "Variable",
    "name": "tenderId",
    "variableName": "tenderId"
  },
  {
    "kind": "Variable",
    "name": "won",
    "variableName": "won"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSetCompetitorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "setTenderCompetitor",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tenderListItemFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "useSetCompetitorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "setTenderCompetitor",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
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
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "estimatedAmount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Customer",
            "kind": "LinkedField",
            "name": "customer",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "images",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullAddress",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tenderDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "discoveryDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "tenderClosingDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "followingSales",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a87f7238c43c445ab7e8eb5b3ec4c947",
    "id": null,
    "metadata": {},
    "name": "useSetCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useSetCompetitorMutation(\n  $tenderId: ID!\n  $competitorId: ID!\n  $won: Boolean!\n) {\n  setTenderCompetitor(tenderId: $tenderId, competitorId: $competitorId, won: $won) {\n    ...tenderListItemFragment\n    id\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  name\n  status\n  createdAt\n  estimatedAmount\n  customer {\n    id\n    name\n  }\n  images\n  fullAddress\n  tenderDate\n  discoveryDate\n  tenderClosingDate\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  createdBy {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "755fe640ce4881b4df33f55de2ae66e8";

export default node;

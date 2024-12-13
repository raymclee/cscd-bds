/**
 * @generated SignedSource<<c7d6e2c56548f57db5fd2fdc4c0c01db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useSetCompetitorMutation$variables = {
  competitorId: string;
  tenderId: string;
  won: boolean;
};
export type useSetCompetitorMutation$data = {
  readonly setTenderCompetitor: {
    readonly id: string;
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
    "alias": null,
    "args": [
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
    "concreteType": "Tender",
    "kind": "LinkedField",
    "name": "setTenderCompetitor",
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
    "selections": (v3/*: any*/),
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
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "fe4aadcaf35c396dd93de396108382ca",
    "id": null,
    "metadata": {},
    "name": "useSetCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useSetCompetitorMutation(\n  $tenderId: ID!\n  $competitorId: ID!\n  $won: Boolean!\n) {\n  setTenderCompetitor(tenderId: $tenderId, competitorId: $competitorId, won: $won) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f1b68776c8194056e283eca1f3d3252";

export default node;

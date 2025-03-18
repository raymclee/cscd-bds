/**
 * @generated SignedSource<<01a32058ccd767c2ac62ec3ec3a1aa0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateCompetitorInput = {
  createdAt?: any | null | undefined;
  name: string;
  shortName: string;
  tenderIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useCreateCompetitorMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCompetitorInput;
};
export type useCreateCompetitorMutation$data = {
  readonly createCompetitor: {
    readonly id: string;
    readonly name: string;
    readonly shortName: string;
  };
};
export type useCreateCompetitorMutation = {
  response: useCreateCompetitorMutation$data;
  variables: useCreateCompetitorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "concreteType": "Competitor",
  "kind": "LinkedField",
  "name": "createCompetitor",
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
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateCompetitorMutation",
    "selections": [
      (v3/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateCompetitorMutation",
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": null,
        "handle": "appendNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createCompetitor",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "CompetitorEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "6fb45cb63767e9995568e7675801f8e6",
    "id": null,
    "metadata": {},
    "name": "useCreateCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateCompetitorMutation(\n  $input: CreateCompetitorInput!\n) {\n  createCompetitor(input: $input) {\n    id\n    name\n    shortName\n  }\n}\n"
  }
};
})();

(node as any).hash = "3bf2f66492daa1dcf70bc2f9d76645da";

export default node;

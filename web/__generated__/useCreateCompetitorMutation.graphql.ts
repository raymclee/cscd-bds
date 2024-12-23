/**
 * @generated SignedSource<<a693e7d46d7a17685ee09d20a203a66f>>
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
  updatedAt?: any | null | undefined;
  wonTenderIDs?: ReadonlyArray<string> | null | undefined;
};
export type useCreateCompetitorMutation$variables = {
  input: CreateCompetitorInput;
};
export type useCreateCompetitorMutation$data = {
  readonly createCompetitor: {
    readonly id: string;
  };
};
export type useCreateCompetitorMutation = {
  response: useCreateCompetitorMutation$data;
  variables: useCreateCompetitorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateCompetitorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateCompetitorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3677fb06d7aad6bdf42d38793468e0dc",
    "id": null,
    "metadata": {},
    "name": "useCreateCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateCompetitorMutation(\n  $input: CreateCompetitorInput!\n) {\n  createCompetitor(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9c962b14a0e42c56b98228fd2a33589";

export default node;

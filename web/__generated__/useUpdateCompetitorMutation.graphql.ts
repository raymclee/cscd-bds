/**
 * @generated SignedSource<<97f2cbf6d2ab66049c2344c93bb5d9a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateCompetitorInput = {
  addTenderIDs?: ReadonlyArray<string> | null | undefined;
  clearTenders?: boolean | null | undefined;
  name?: string | null | undefined;
  removeTenderIDs?: ReadonlyArray<string> | null | undefined;
  shortName?: string | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useUpdateCompetitorMutation$variables = {
  id: string;
  input: UpdateCompetitorInput;
};
export type useUpdateCompetitorMutation$data = {
  readonly updateCompetitor: {
    readonly id: string;
    readonly name: string;
    readonly shortName: string;
  };
};
export type useUpdateCompetitorMutation = {
  response: useUpdateCompetitorMutation$data;
  variables: useUpdateCompetitorMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Competitor",
    "kind": "LinkedField",
    "name": "updateCompetitor",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCompetitorMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateCompetitorMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "382a85fdf8579113b911bea8fada1a1b",
    "id": null,
    "metadata": {},
    "name": "useUpdateCompetitorMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCompetitorMutation(\n  $id: ID!\n  $input: UpdateCompetitorInput!\n) {\n  updateCompetitor(id: $id, input: $input) {\n    id\n    shortName\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "91342c12ca8e8fd4d86dbfa9db11d7e1";

export default node;

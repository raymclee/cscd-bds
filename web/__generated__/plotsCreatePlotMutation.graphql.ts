/**
 * @generated SignedSource<<3660b3caafd07e4793fbc9c5abdf7111>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreatePlotInput = {
  createdAt?: any | null | undefined;
  districtID: string;
  name: string;
  updatedAt?: any | null | undefined;
};
export type plotsCreatePlotMutation$variables = {
  geoBounds?: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
  input: CreatePlotInput;
};
export type plotsCreatePlotMutation$data = {
  readonly createPlot: {
    readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
    readonly id: string;
    readonly name: string;
  };
};
export type plotsCreatePlotMutation = {
  response: plotsCreatePlotMutation$data;
  variables: plotsCreatePlotMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "geoBounds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "geoBounds",
        "variableName": "geoBounds"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Plot",
    "kind": "LinkedField",
    "name": "createPlot",
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
        "name": "geoBounds",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsCreatePlotMutation",
    "selections": (v2/*: any*/),
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
    "name": "plotsCreatePlotMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "811ebecd56efb741b413b6fca37ed9ed",
    "id": null,
    "metadata": {},
    "name": "plotsCreatePlotMutation",
    "operationKind": "mutation",
    "text": "mutation plotsCreatePlotMutation(\n  $input: CreatePlotInput!\n  $geoBounds: [[Float!]!]\n) {\n  createPlot(input: $input, geoBounds: $geoBounds) {\n    id\n    name\n    geoBounds\n  }\n}\n"
  }
};
})();

(node as any).hash = "6588423d908db49cfd4c54320ecf9d73";

export default node;

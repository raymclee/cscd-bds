/**
 * @generated SignedSource<<ff01a1c9784d7ba8f35337933e8d968d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type plotsDeletePlotMutation$variables = {
  id: string;
};
export type plotsDeletePlotMutation$data = {
  readonly deletePlot: {
    readonly id: string;
  };
};
export type plotsDeletePlotMutation = {
  response: plotsDeletePlotMutation$data;
  variables: plotsDeletePlotMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
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
      }
    ],
    "concreteType": "Plot",
    "kind": "LinkedField",
    "name": "deletePlot",
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
    "name": "plotsDeletePlotMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "plotsDeletePlotMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cc7db8419017d3ffa31bb016c049fe84",
    "id": null,
    "metadata": {},
    "name": "plotsDeletePlotMutation",
    "operationKind": "mutation",
    "text": "mutation plotsDeletePlotMutation(\n  $id: ID!\n) {\n  deletePlot(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "182a7140b0f4a80dea691bb2317f755f";

export default node;

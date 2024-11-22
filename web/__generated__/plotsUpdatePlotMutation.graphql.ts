/**
 * @generated SignedSource<<5fee9f8dd9dbfb42aa095a24af354482>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdatePlotInput = {
  colorHex?: string | null | undefined;
  districtID?: string | null | undefined;
  name?: string | null | undefined;
  updatedAt?: any | null | undefined;
};
export type plotsUpdatePlotMutation$variables = {
  geoBounds?: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
  id: string;
  input: UpdatePlotInput;
};
export type plotsUpdatePlotMutation$data = {
  readonly updatePlot: {
    readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
    readonly id: string;
    readonly name: string;
  };
};
export type plotsUpdatePlotMutation = {
  response: plotsUpdatePlotMutation$data;
  variables: plotsUpdatePlotMutation$variables;
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
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = [
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
        "name": "id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Plot",
    "kind": "LinkedField",
    "name": "updatePlot",
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsUpdatePlotMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "plotsUpdatePlotMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "357888576f1ad4d5dc718c3bd4188d92",
    "id": null,
    "metadata": {},
    "name": "plotsUpdatePlotMutation",
    "operationKind": "mutation",
    "text": "mutation plotsUpdatePlotMutation(\n  $id: ID!\n  $input: UpdatePlotInput!\n  $geoBounds: [[Float!]!]\n) {\n  updatePlot(id: $id, input: $input, geoBounds: $geoBounds) {\n    id\n    name\n    geoBounds\n  }\n}\n"
  }
};
})();

(node as any).hash = "124fed813b8a5a278d0851758c37b782";

export default node;

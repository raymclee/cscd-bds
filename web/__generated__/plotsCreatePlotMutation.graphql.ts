/**
 * @generated SignedSource<<3030cc6b7f6ed09af2f2f309aecccb27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreatePlotInput = {
  colorHex: string;
  createdAt?: any | null | undefined;
  districtID: string;
  name: string;
  updatedAt?: any | null | undefined;
};
export type plotsCreatePlotMutation$variables = {
  connections: ReadonlyArray<string>;
  geoBounds?: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
  input: CreatePlotInput;
};
export type plotsCreatePlotMutation$data = {
  readonly createPlot: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly colorHex: string;
        readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
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
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "geoBounds"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "PlotEdge",
  "kind": "LinkedField",
  "name": "edges",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Plot",
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "geoBounds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "colorHex",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "plotsCreatePlotMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "PlotConnection",
        "kind": "LinkedField",
        "name": "createPlot",
        "plural": false,
        "selections": [
          (v4/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "plotsCreatePlotMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "PlotConnection",
        "kind": "LinkedField",
        "name": "createPlot",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "PlotEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cfafc7942ab54564c852811a04a12019",
    "id": null,
    "metadata": {},
    "name": "plotsCreatePlotMutation",
    "operationKind": "mutation",
    "text": "mutation plotsCreatePlotMutation(\n  $input: CreatePlotInput!\n  $geoBounds: [[Float!]!]\n) {\n  createPlot(input: $input, geoBounds: $geoBounds) {\n    edges {\n      node {\n        id\n        name\n        geoBounds\n        colorHex\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f22a3c2df9a1856225dfb9760e19231c";

export default node;

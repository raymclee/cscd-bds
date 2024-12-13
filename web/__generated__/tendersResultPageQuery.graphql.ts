/**
 * @generated SignedSource<<d350d809d107e99476de987a60bd75d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersResultPageQuery$variables = {
  id: string;
};
export type tendersResultPageQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"tendersResultModal_tender">;
  } | null | undefined;
};
export type tendersResultPageQuery = {
  response: tendersResultPageQuery$data;
  variables: tendersResultPageQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersResultPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tendersResultModal_tender"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tendersResultPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "8ed795010ff676d1a0630a92db6f8207",
    "id": null,
    "metadata": {},
    "name": "tendersResultPageQuery",
    "operationKind": "query",
    "text": "query tendersResultPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...tendersResultModal_tender\n    id\n  }\n}\n\nfragment tendersResultModal_tender on Tender {\n  id\n}\n"
  }
};
})();

(node as any).hash = "fa6669ef458d2868cbd661ce9c451588";

export default node;

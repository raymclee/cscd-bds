/**
 * @generated SignedSource<<86305bde526fd37e2950096088fb54e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tendersDashboardDetailPageQuery$variables = {
  id: string;
};
export type tendersDashboardDetailPageQuery$data = {
  readonly node: {
    readonly id?: string;
  } | null | undefined;
};
export type tendersDashboardDetailPageQuery = {
  response: tendersDashboardDetailPageQuery$data;
  variables: tendersDashboardDetailPageQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersDashboardDetailPageQuery",
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
            "kind": "InlineFragment",
            "selections": [
              (v2/*: any*/)
            ],
            "type": "Tender",
            "abstractKey": null
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
    "name": "tendersDashboardDetailPageQuery",
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4f8928d4af96a84141298e5106d1bb0a",
    "id": null,
    "metadata": {},
    "name": "tendersDashboardDetailPageQuery",
    "operationKind": "query",
    "text": "query tendersDashboardDetailPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Tender {\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f6ac00c23dc38e0c53bf5577d17b43f";

export default node;

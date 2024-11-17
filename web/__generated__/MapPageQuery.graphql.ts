/**
 * @generated SignedSource<<989e6371b7b19561816d442677605f51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapPageQuery$variables = Record<PropertyKey, never>;
export type MapPageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MapTenderListFragment" | "MapUserFragment">;
};
export type MapPageQuery = {
  response: MapPageQuery$data;
  variables: MapPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapPageQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MapUserFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "MapTenderListFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "TenderConnection",
        "kind": "LinkedField",
        "name": "tenders",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Tender",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d1c3edef3b3c15408d48199186fd0310",
    "id": null,
    "metadata": {},
    "name": "MapPageQuery",
    "operationKind": "query",
    "text": "query MapPageQuery {\n  ...MapUserFragment\n  ...MapTenderListFragment\n}\n\nfragment MapTenderListFragment on Query {\n  tenders {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n}\n\nfragment MapUserFragment on Query {\n  users {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "baadec67a01e2667f40c5a9f7b137ec8";

export default node;

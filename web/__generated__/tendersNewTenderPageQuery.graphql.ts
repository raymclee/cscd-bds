/**
 * @generated SignedSource<<e86e916695f4a09a31b987f6231b1700>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersNewTenderPageQuery$variables = {
  userId: string;
};
export type tendersNewTenderPageQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderFormFragment">;
  } | null | undefined;
};
export type tendersNewTenderPageQuery = {
  response: tendersNewTenderPageQuery$data;
  variables: tendersNewTenderPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "districts",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersNewTenderPageQuery",
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
            "name": "tenderFormFragment"
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
    "name": "tendersNewTenderPageQuery",
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
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "areas",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "provinces",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "City",
                        "kind": "LinkedField",
                        "name": "cities",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a6b83a6d9ad2ff2ba6d6723d43fc6e5",
    "id": null,
    "metadata": {},
    "name": "tendersNewTenderPageQuery",
    "operationKind": "query",
    "text": "query tendersNewTenderPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ...tenderFormFragment\n    id\n  }\n}\n\nfragment tenderFormFragment on User {\n  areas {\n    id\n    name\n    provinces {\n      id\n      name\n      adcode\n      cities {\n        id\n        name\n        adcode\n        districts {\n          id\n          name\n          adcode\n        }\n      }\n      districts {\n        id\n        name\n        adcode\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b2a3b2fb1378fd70c8c2833f52a63217";

export default node;

/**
 * @generated SignedSource<<b6dd0ae21eac2e0045ce484899d32337>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetail_customerContactRefetchQuery$variables = {
  id: string;
  showContact?: boolean | null | undefined;
};
export type customerDetail_customerContactRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"customerDetail_customerContact">;
  } | null | undefined;
};
export type customerDetail_customerContactRefetchQuery = {
  response: customerDetail_customerContactRefetchQuery$data;
  variables: customerDetail_customerContactRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v1 = {
  "defaultValue": false,
  "kind": "LocalArgument",
  "name": "showContact"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
    "name": "customerDetail_customerContactRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "showContact",
                "variableName": "showContact"
              }
            ],
            "kind": "FragmentSpread",
            "name": "customerDetail_customerContact"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "customerDetail_customerContactRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "condition": "showContact",
                "kind": "Condition",
                "passingValue": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contactPerson",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contactPersonPosition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contactPersonPhone",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contactPersonEmail",
                    "storageKey": null
                  }
                ]
              }
            ],
            "type": "Customer",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3943d44872322d0fc418ef3698d765be",
    "id": null,
    "metadata": {},
    "name": "customerDetail_customerContactRefetchQuery",
    "operationKind": "query",
    "text": "query customerDetail_customerContactRefetchQuery(\n  $showContact: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...customerDetail_customerContact_41i1Y7\n    id\n  }\n}\n\nfragment customerDetail_customerContact_41i1Y7 on Customer {\n  contactPerson @include(if: $showContact)\n  contactPersonPosition @include(if: $showContact)\n  contactPersonPhone @include(if: $showContact)\n  contactPersonEmail @include(if: $showContact)\n  id\n}\n"
  }
};
})();

(node as any).hash = "0f7f67527151f9510496cc1d5c69dcd9";

export default node;

/**
 * @generated SignedSource<<ba004e6e4718c19e190a693081b069ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailContactFragmentRefetchQuery$variables = {
  id: string;
  showContact?: boolean | null | undefined;
};
export type customerDetailContactFragmentRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailContactFragment">;
  } | null | undefined;
};
export type customerDetailContactFragmentRefetchQuery = {
  response: customerDetailContactFragmentRefetchQuery$data;
  variables: customerDetailContactFragmentRefetchQuery$variables;
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
    "name": "customerDetailContactFragmentRefetchQuery",
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
            "name": "customerDetailContactFragment"
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
    "name": "customerDetailContactFragmentRefetchQuery",
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
    "cacheID": "dacfc07804a6d54e377f1f83e1de00c1",
    "id": null,
    "metadata": {},
    "name": "customerDetailContactFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query customerDetailContactFragmentRefetchQuery(\n  $showContact: Boolean = false\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...customerDetailContactFragment_41i1Y7\n    id\n  }\n}\n\nfragment customerDetailContactFragment_41i1Y7 on Customer {\n  contactPerson @include(if: $showContact)\n  contactPersonPosition @include(if: $showContact)\n  contactPersonPhone @include(if: $showContact)\n  contactPersonEmail @include(if: $showContact)\n  id\n}\n"
  }
};
})();

(node as any).hash = "02bc5009c9138540374c25072f3b046e";

export default node;

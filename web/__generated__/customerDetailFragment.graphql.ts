/**
 * @generated SignedSource<<c8f06f833d78d392aca1faa0e3e1e974>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailFragment$data = {
  readonly area: {
    readonly id: string;
    readonly name: string;
  };
  readonly contact: {
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailContactFragment">;
  };
  readonly createdBy: {
    readonly name: string;
  };
  readonly id: string;
  readonly industry: number | null | undefined;
  readonly name: string;
  readonly ownerType: number | null | undefined;
  readonly sales: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly size: number | null | undefined;
  readonly updatedAt: any;
  readonly " $fragmentType": "customerDetailFragment";
};
export type customerDetailFragment$key = {
  readonly " $data"?: customerDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customerDetailFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ownerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "industry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "size",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "sales",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "fragment": {
        "kind": "InlineFragment",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "customerDetailContactFragment"
          }
        ],
        "type": "Customer",
        "abstractKey": null
      },
      "kind": "AliasedInlineFragmentSpread",
      "name": "contact"
    }
  ],
  "type": "Customer",
  "abstractKey": null
};
})();

(node as any).hash = "13e84c96f05ee7d6fa2e0ba2fa1a4471";

export default node;

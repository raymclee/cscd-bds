/**
 * @generated SignedSource<<a91f88b2a0b2d72f74712655e157c649>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderListItemFragment$data = {
  readonly activeProfile: {
    readonly approvalStatus: number;
    readonly classify: number | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly id: string;
    } | null | undefined;
    readonly customer: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly discoveryDate: any | null | undefined;
    readonly estimatedAmount: number | null | undefined;
    readonly fullAddress: string | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string> | null | undefined;
    readonly name: string | null | undefined;
    readonly status: number;
    readonly tenderClosingDate: any | null | undefined;
    readonly tenderDate: any | null | undefined;
  } | null | undefined;
  readonly area: {
    readonly code: string;
    readonly id: string;
    readonly name: string;
  };
  readonly followingSales: ReadonlyArray<{
    readonly id: string;
  }> | null | undefined;
  readonly id: string;
  readonly pendingProfile: {
    readonly approvalStatus: number;
    readonly classify: number | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly id: string;
    } | null | undefined;
    readonly customer: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly discoveryDate: any | null | undefined;
    readonly estimatedAmount: number | null | undefined;
    readonly fullAddress: string | null | undefined;
    readonly id: string;
    readonly images: ReadonlyArray<string> | null | undefined;
    readonly name: string | null | undefined;
    readonly status: number;
    readonly tenderClosingDate: any | null | undefined;
    readonly tenderDate: any | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "tenderListItemFragment";
};
export type tenderListItemFragment$key = {
  readonly " $data"?: tenderListItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
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
  (v0/*: any*/)
],
v3 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "approvalStatus",
    "storageKey": null
  },
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "createdAt",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "estimatedAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "classify",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Customer",
    "kind": "LinkedField",
    "name": "customer",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "images",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fullAddress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "discoveryDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderClosingDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createdBy",
    "plural": false,
    "selections": (v2/*: any*/),
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderListItemFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "followingSales",
      "plural": true,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TenderProfile",
      "kind": "LinkedField",
      "name": "pendingProfile",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "TenderProfile",
      "kind": "LinkedField",
      "name": "activeProfile",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "ee85b914dc5e1ebd0d1bcbf5c9d553c4";

export default node;

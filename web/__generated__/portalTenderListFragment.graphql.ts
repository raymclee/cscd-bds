/**
 * @generated SignedSource<<94c0b1812646b03de2a0efd0ce404b75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type portalTenderListFragment$data = {
  readonly area: {
    readonly name: string;
  };
  readonly createdAt: any;
  readonly customer: {
    readonly name: string;
  };
  readonly discoveryDate: any;
  readonly estimatedAmount: number | null | undefined;
  readonly fullAddress: string | null | undefined;
  readonly id: string;
  readonly images: ReadonlyArray<string> | null | undefined;
  readonly name: string;
  readonly status: number;
  readonly tenderDate: any | null | undefined;
  readonly " $fragmentType": "portalTenderListFragment";
};
export type portalTenderListFragment$key = {
  readonly " $data"?: portalTenderListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"portalTenderListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "portalTenderListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
      "concreteType": "Customer",
      "kind": "LinkedField",
      "name": "customer",
      "plural": false,
      "selections": (v1/*: any*/),
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
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "6727c82bd7d2714130967e4cd14f563c";

export default node;

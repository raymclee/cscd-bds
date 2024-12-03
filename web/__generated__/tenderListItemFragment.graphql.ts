/**
 * @generated SignedSource<<b5ada7ca7bf8c9ff45800acda7645524>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderListItemFragment$data = {
  readonly area: {
    readonly code: string;
    readonly id: string;
    readonly name: string;
  };
  readonly createdAt: any;
  readonly customer: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly discoveryDate: any;
  readonly estimatedAmount: number | null | undefined;
  readonly fullAddress: string | null | undefined;
  readonly id: string;
  readonly images: ReadonlyArray<string> | null | undefined;
  readonly name: string;
  readonly status: number;
  readonly tenderClosingDate: any | null | undefined;
  readonly tenderDate: any | null | undefined;
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderListItemFragment",
  "selections": [
    (v0/*: any*/),
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
    }
  ],
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "eacd8b53ac0421eff6120886d9e53d3b";

export default node;

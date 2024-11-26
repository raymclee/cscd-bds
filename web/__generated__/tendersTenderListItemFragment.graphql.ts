/**
 * @generated SignedSource<<add86e4e5c828a23cb277b0f00eb6f22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersTenderListItemFragment$data = {
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
  readonly " $fragmentType": "tendersTenderListItemFragment";
};
export type tendersTenderListItemFragment$key = {
  readonly " $data"?: tendersTenderListItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tendersTenderListItemFragment">;
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
  "name": "tendersTenderListItemFragment",
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

(node as any).hash = "29dad7bfeb23f6e718cb25ee3e10be4b";

export default node;

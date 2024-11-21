/**
 * @generated SignedSource<<b92ac6c0a55a80f3ec00468c512c21f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersAreaTenderListFragment$data = {
  readonly areas: ReadonlyArray<{
    readonly tenders: ReadonlyArray<{
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
    }> | null | undefined;
  }> | null | undefined;
  readonly " $fragmentType": "tendersAreaTenderListFragment";
};
export type tendersAreaTenderListFragment$key = {
  readonly " $data"?: tendersAreaTenderListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tendersAreaTenderListFragment">;
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
  "name": "tendersAreaTenderListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "areas",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Tender",
          "kind": "LinkedField",
          "name": "tenders",
          "plural": true,
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "5cf56d7fdcd27162571bd0a82bf4f4f8";

export default node;

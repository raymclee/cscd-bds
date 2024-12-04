/**
 * @generated SignedSource<<a552f35117f82c3cdc3fdd6931f0c229>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderDetail_fragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"tenderListItemFragment">;
  readonly " $fragmentType": "tenderDetail_fragment";
};
export type tenderDetail_fragment$key = {
  readonly " $data"?: tenderDetail_fragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderDetail_fragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderDetail_fragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "tenderListItemFragment"
    }
  ],
  "type": "Tender",
  "abstractKey": null
};

(node as any).hash = "538cd501b14551a4b63719d7c4a72d68";

export default node;

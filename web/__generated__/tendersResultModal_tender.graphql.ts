/**
 * @generated SignedSource<<62712f87c63ce4f1901c3e9a6b8b5582>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersResultModal_tender$data = {
  readonly id: string;
  readonly " $fragmentType": "tendersResultModal_tender";
};
export type tendersResultModal_tender$key = {
  readonly " $data"?: tendersResultModal_tender$data;
  readonly " $fragmentSpreads": FragmentRefs<"tendersResultModal_tender">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tendersResultModal_tender",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};

(node as any).hash = "8b61c639142a214482c9dc0fbc87e972";

export default node;

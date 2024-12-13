/**
 * @generated SignedSource<<f51ffa60c872b1730c76ee6e405c0899>>
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
  readonly name: string;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};

(node as any).hash = "4437ba583c0e754ce9bbe3c3622fc2f4";

export default node;

/**
 * @generated SignedSource<<94e40250d1c0451db56688ceb29055d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type rankingListBoard_competitors$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "rankingListBoard_competitors";
};
export type rankingListBoard_competitors$key = {
  readonly " $data"?: rankingListBoard_competitors$data;
  readonly " $fragmentSpreads": FragmentRefs<"rankingListBoard_competitors">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "rankingListBoard_competitors",
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
  "type": "Competitor",
  "abstractKey": null
};

(node as any).hash = "d99c95da04e1999504f4574fd8b71563";

export default node;

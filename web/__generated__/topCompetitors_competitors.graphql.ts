/**
 * @generated SignedSource<<6926b05f846d71b48809b242c99248b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type topCompetitors_competitors$data = {
  readonly topCompetitors: ReadonlyArray<{
    readonly id: string;
    readonly shortName: string;
    readonly wonTendersCount: number;
  }>;
  readonly " $fragmentType": "topCompetitors_competitors";
};
export type topCompetitors_competitors$key = {
  readonly " $data"?: topCompetitors_competitors$data;
  readonly " $fragmentSpreads": FragmentRefs<"topCompetitors_competitors">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "topCompetitors_competitors",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TopCompetitor",
      "kind": "LinkedField",
      "name": "topCompetitors",
      "plural": true,
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
          "name": "shortName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "wonTendersCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8e142d26e18850517852b41c9a00d104";

export default node;

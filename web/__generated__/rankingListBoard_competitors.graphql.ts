/**
 * @generated SignedSource<<a3898b6400993edde39261b44dc5ba10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type rankingListBoard_competitors$data = {
  readonly topCompetitors: ReadonlyArray<{
    readonly id: string;
    readonly shortName: string;
    readonly wonTendersCount: number;
  }>;
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

(node as any).hash = "f23782bb0495449969e781781f0f3426";

export default node;

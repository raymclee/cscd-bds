/**
 * @generated SignedSource<<c0b62b15193db3ad0b368d3ce9284737>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderLoseModalFragment$data = {
  readonly competitors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "tenderLoseModalFragment";
};
export type tenderLoseModalFragment$key = {
  readonly " $data"?: tenderLoseModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderLoseModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderLoseModalFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CompetitorConnection",
      "kind": "LinkedField",
      "name": "competitors",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CompetitorEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Competitor",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "0a22039d9b3944fafcb6ba0731fc0812";

export default node;

/**
 * @generated SignedSource<<b95db282641d14dc2e0352903a9208b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderWinModalFragment$data = {
  readonly competitors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "tenderWinModalFragment";
};
export type tenderWinModalFragment$key = {
  readonly " $data"?: tenderWinModalFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderWinModalFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderWinModalFragment",
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

(node as any).hash = "0112a97f58250b01312d4cd977c10ca7";

export default node;

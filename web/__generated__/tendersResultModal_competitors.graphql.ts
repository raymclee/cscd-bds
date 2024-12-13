/**
 * @generated SignedSource<<c03899552602fac88368b8d88fb9cd62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tendersResultModal_competitors$data = {
  readonly competitors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "tendersResultModal_competitors";
};
export type tendersResultModal_competitors$key = {
  readonly " $data"?: tendersResultModal_competitors$data;
  readonly " $fragmentSpreads": FragmentRefs<"tendersResultModal_competitors">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tendersResultModal_competitors",
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

(node as any).hash = "0672f920bf6897758d2d12947db2cacc";

export default node;

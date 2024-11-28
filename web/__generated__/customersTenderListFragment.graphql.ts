/**
 * @generated SignedSource<<5e64b3bfcdd02419beba4a805dfc0ba9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customersTenderListFragment$data = {
  readonly tenders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly estimatedAmount: number | null | undefined;
        readonly id: string;
        readonly name: string;
        readonly status: number;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "customersTenderListFragment";
};
export type customersTenderListFragment$key = {
  readonly " $data"?: customersTenderListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customersTenderListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customersTenderListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TenderConnection",
      "kind": "LinkedField",
      "name": "tenders",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TenderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Tender",
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
                },
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
                  "name": "estimatedAmount",
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
  "type": "Customer",
  "abstractKey": null
};

(node as any).hash = "03185c4a4283c3159ccfb08edb9ea04d";

export default node;

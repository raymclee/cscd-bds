/**
 * @generated SignedSource<<a8b75e18a55779095e9aee3047470171>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MapTenderListFragment$data = {
  readonly tenders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "MapTenderListFragment";
};
export type MapTenderListFragment$key = {
  readonly " $data"?: MapTenderListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MapTenderListFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MapTenderListFragment",
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

(node as any).hash = "f8f97f6b121c222febb74730552fe419";

export default node;

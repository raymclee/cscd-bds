/**
 * @generated SignedSource<<8c7c0a4b68a17c2499b36860741d262d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type userFormFragment$data = {
  readonly areas: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "userFormFragment";
};
export type userFormFragment$key = {
  readonly " $data"?: userFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"userFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "userFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AreaConnection",
      "kind": "LinkedField",
      "name": "areas",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AreaEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Area",
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

(node as any).hash = "322af1cd6c209c70fa4ce16679bc4ead";

export default node;

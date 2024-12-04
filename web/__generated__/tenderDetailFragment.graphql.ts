/**
 * @generated SignedSource<<277fb1cb1099d85719a6bfa3a00addea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderDetailFragment$data = {
  readonly area: {
    readonly code: string;
    readonly name: string;
  };
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "tenderDetailFragment";
};
export type tenderDetailFragment$key = {
  readonly " $data"?: tenderDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderDetailFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Tender",
  "abstractKey": null
};
})();

(node as any).hash = "3249c0a671f02d90e40f96e9e5c6572b";

export default node;

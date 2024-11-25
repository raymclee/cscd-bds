/**
 * @generated SignedSource<<c8b839f79a74f2293ed4da00c0fd7788>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderFormFragment$data = {
  readonly areas: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly provinces: ReadonlyArray<{
      readonly adcode: number;
      readonly cities: ReadonlyArray<{
        readonly adcode: number;
        readonly districts: ReadonlyArray<{
          readonly adcode: number;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
        readonly id: string;
        readonly name: string;
      }> | null | undefined;
      readonly districts: ReadonlyArray<{
        readonly adcode: number;
        readonly id: string;
        readonly name: string;
      }> | null | undefined;
      readonly id: string;
      readonly name: string;
    }> | null | undefined;
  }> | null | undefined;
  readonly " $fragmentType": "tenderFormFragment";
};
export type tenderFormFragment$key = {
  readonly " $data"?: tenderFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderFormFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "districts",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "areas",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Province",
          "kind": "LinkedField",
          "name": "provinces",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "City",
              "kind": "LinkedField",
              "name": "cities",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                (v3/*: any*/)
              ],
              "storageKey": null
            },
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "75836724b4ac23434dec804bfe134813";

export default node;

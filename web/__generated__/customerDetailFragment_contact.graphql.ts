/**
 * @generated SignedSource<<f4f40085861e3e51f291536fc8a18878>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailFragment_contact$data = {
  readonly contactPerson: string | null | undefined;
  readonly contactPersonEmail: string | null | undefined;
  readonly contactPersonPhone: string | null | undefined;
  readonly contactPersonPosition: string | null | undefined;
  readonly " $fragmentType": "customerDetailFragment_contact";
};
export type customerDetailFragment_contact$key = {
  readonly " $data"?: customerDetailFragment_contact$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment_contact">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customerDetailFragment_contact",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPerson",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonPosition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonPhone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonEmail",
      "storageKey": null
    }
  ],
  "type": "Customer",
  "abstractKey": null
};

(node as any).hash = "5c9c0784bd1e2d9b19598b7da8bc098a";

export default node;

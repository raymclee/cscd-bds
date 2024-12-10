/**
 * @generated SignedSource<<b7bdeaf73e5e372f2e8da1a20079d415>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailContactFragment$data = {
  readonly contactPerson: string | null | undefined;
  readonly contactPersonEmail: string | null | undefined;
  readonly contactPersonPhone: string | null | undefined;
  readonly contactPersonPosition: string | null | undefined;
  readonly " $fragmentType": "customerDetailContactFragment";
};
export type customerDetailContactFragment$key = {
  readonly " $data"?: customerDetailContactFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetailContactFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customerDetailContactFragment",
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

(node as any).hash = "f5505f1d5349d90be213b4b316e323b1";

export default node;

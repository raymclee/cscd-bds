/**
 * @generated SignedSource<<fba84fb64333840bca8c08b9b8d7ab19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type visitRecordItemFragment$data = {
  readonly commContent: string;
  readonly commPeople: string;
  readonly date: any;
  readonly id: string;
  readonly nextStep: string | null | undefined;
  readonly visitType: number;
  readonly " $fragmentType": "visitRecordItemFragment";
};
export type visitRecordItemFragment$key = {
  readonly " $data"?: visitRecordItemFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"visitRecordItemFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "visitRecordItemFragment",
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
      "name": "date",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visitType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "commPeople",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "commContent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextStep",
      "storageKey": null
    }
  ],
  "type": "VisitRecord",
  "abstractKey": null
};

(node as any).hash = "8dfe6b4efdbe3a12233583ea1eb68229";

export default node;

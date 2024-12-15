/**
 * @generated SignedSource<<d9b033868d0e825bf7a4e2b383c60059>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetail_customerContact$data = {
  readonly contactPerson?: string | null | undefined;
  readonly contactPersonEmail?: string | null | undefined;
  readonly contactPersonPhone?: string | null | undefined;
  readonly contactPersonPosition?: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "customerDetail_customerContact";
};
export type customerDetail_customerContact$key = {
  readonly " $data"?: customerDetail_customerContact$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetail_customerContact">;
};

import customerDetail_customerContactRefetchQuery_graphql from './customerDetail_customerContactRefetchQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "showContact"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": customerDetail_customerContactRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "customerDetail_customerContact",
  "selections": [
    {
      "condition": "showContact",
      "kind": "Condition",
      "passingValue": true,
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
      ]
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Customer",
  "abstractKey": null
};

(node as any).hash = "0f7f67527151f9510496cc1d5c69dcd9";

export default node;

/**
 * @generated SignedSource<<9b53ec51148345e203a04ced48ebfa46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailContactFragment$data = {
  readonly contactPerson?: string | null | undefined;
  readonly contactPersonEmail?: string | null | undefined;
  readonly contactPersonPhone?: string | null | undefined;
  readonly contactPersonPosition?: string | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "customerDetailContactFragment";
};
export type customerDetailContactFragment$key = {
  readonly " $data"?: customerDetailContactFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetailContactFragment">;
};

import customerDetailContactFragmentRefetchQuery_graphql from './customerDetailContactFragmentRefetchQuery.graphql';

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
      "operation": customerDetailContactFragmentRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "customerDetailContactFragment",
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

(node as any).hash = "02bc5009c9138540374c25072f3b046e";

export default node;

/**
 * @generated SignedSource<<855ea75d6d6181710b7ef124e3a158c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateCustomerInput = {
  addTenderIDs?: ReadonlyArray<string> | null | undefined;
  addVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  approverID?: string | null | undefined;
  areaID?: string | null | undefined;
  clearApprover?: boolean | null | undefined;
  clearContactPerson?: boolean | null | undefined;
  clearContactPersonEmail?: boolean | null | undefined;
  clearContactPersonPhone?: boolean | null | undefined;
  clearContactPersonPosition?: boolean | null | undefined;
  clearCreatedBy?: boolean | null | undefined;
  clearIndustry?: boolean | null | undefined;
  clearOwnerType?: boolean | null | undefined;
  clearSales?: boolean | null | undefined;
  clearSize?: boolean | null | undefined;
  clearTenders?: boolean | null | undefined;
  clearVisitRecords?: boolean | null | undefined;
  contactPerson?: string | null | undefined;
  contactPersonEmail?: string | null | undefined;
  contactPersonPhone?: string | null | undefined;
  contactPersonPosition?: string | null | undefined;
  createdByID?: string | null | undefined;
  industry?: number | null | undefined;
  isApproved?: boolean | null | undefined;
  name?: string | null | undefined;
  ownerType?: number | null | undefined;
  removeTenderIDs?: ReadonlyArray<string> | null | undefined;
  removeVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  salesID?: string | null | undefined;
  size?: number | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useUpdateCustomerRequestMutation$variables = {
  id: string;
  input: UpdateCustomerInput;
};
export type useUpdateCustomerRequestMutation$data = {
  readonly updateCustomerRequest: {
    readonly draft: {
      readonly areaId: string | null | undefined;
      readonly contactPerson: string | null | undefined;
      readonly contactPersonEmail: string | null | undefined;
      readonly contactPersonPhone: string | null | undefined;
      readonly contactPersonPosition: string | null | undefined;
      readonly industry: number | null | undefined;
      readonly name: string | null | undefined;
      readonly ownerType: number | null | undefined;
      readonly salesId: string | null | undefined;
      readonly size: number | null | undefined;
    } | null | undefined;
  };
};
export type useUpdateCustomerRequestMutation = {
  response: useUpdateCustomerRequestMutation$data;
  variables: useUpdateCustomerRequestMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomerDraft",
  "kind": "LinkedField",
  "name": "draft",
  "plural": false,
  "selections": [
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
      "name": "ownerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "industry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "size",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "areaId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "salesId",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCustomerRequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "updateCustomerRequest",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateCustomerRequestMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "updateCustomerRequest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e949b24b4a652856fe126e8cdcdf6b3f",
    "id": null,
    "metadata": {},
    "name": "useUpdateCustomerRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCustomerRequestMutation(\n  $id: ID!\n  $input: UpdateCustomerInput!\n) {\n  updateCustomerRequest(id: $id, input: $input) {\n    draft {\n      name\n      ownerType\n      industry\n      size\n      contactPerson\n      contactPersonPosition\n      contactPersonPhone\n      contactPersonEmail\n      areaId\n      salesId\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "dcd9e9bbc07b6166a2f95e144144038b";

export default node;

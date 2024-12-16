/**
 * @generated SignedSource<<8a2b9de08d2c11bc542a15e5c355536a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCustomerInput = {
  addTenderIDs?: ReadonlyArray<string> | null | undefined;
  addVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  areaID?: string | null | undefined;
  clearContactPerson?: boolean | null | undefined;
  clearContactPersonEmail?: boolean | null | undefined;
  clearContactPersonPhone?: boolean | null | undefined;
  clearContactPersonPosition?: boolean | null | undefined;
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
  name?: string | null | undefined;
  ownerType?: number | null | undefined;
  removeTenderIDs?: ReadonlyArray<string> | null | undefined;
  removeVisitRecordIDs?: ReadonlyArray<string> | null | undefined;
  salesID?: string | null | undefined;
  size?: number | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useUpdateCustomerMutation$variables = {
  id: string;
  input: UpdateCustomerInput;
};
export type useUpdateCustomerMutation$data = {
  readonly updateCustomer: {
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
  };
};
export type useUpdateCustomerMutation = {
  response: useUpdateCustomerMutation$data;
  variables: useUpdateCustomerMutation$variables;
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
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateCustomerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "updateCustomer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "customerDetailFragment"
          }
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
    "name": "useUpdateCustomerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "updateCustomer",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updatedAt",
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
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "sales",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": (v4/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b4f0e01f53b2cf037292ba35a448a0b6",
    "id": null,
    "metadata": {},
    "name": "useUpdateCustomerMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCustomerMutation(\n  $id: ID!\n  $input: UpdateCustomerInput!\n) {\n  updateCustomer(id: $id, input: $input) {\n    ...customerDetailFragment\n    id\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  name\n  createdBy {\n    name\n    id\n  }\n  updatedAt\n  ownerType\n  industry\n  size\n  sales {\n    id\n    name\n  }\n  area {\n    id\n    name\n  }\n  contactPerson\n  contactPersonPosition\n  contactPersonPhone\n  contactPersonEmail\n}\n"
  }
};
})();

(node as any).hash = "409cb914a3eb31be394ed2c41a8583c5";

export default node;

/**
 * @generated SignedSource<<a9affffe9271c47fdf2934e58c455f64>>
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
],
v5 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
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
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
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
            "name": "isApproved",
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
            "alias": "lastVisitRecord",
            "args": (v5/*: any*/),
            "concreteType": "VisitRecordConnection",
            "kind": "LinkedField",
            "name": "visitRecords",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "VisitRecordEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "VisitRecord",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "visitRecords(last:1)"
          },
          {
            "alias": "lastVisitRecord",
            "args": (v5/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "customerDetailFragment_lastVisitRecord",
            "kind": "LinkedHandle",
            "name": "visitRecords"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9edf1761c08453b962f73aae8dd02282",
    "id": null,
    "metadata": {},
    "name": "useUpdateCustomerMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCustomerMutation(\n  $id: ID!\n  $input: UpdateCustomerInput!\n) {\n  updateCustomer(id: $id, input: $input) {\n    ...customerDetailFragment\n    id\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  name\n  createdAt\n  createdBy {\n    name\n    id\n  }\n  updatedAt\n  ownerType\n  industry\n  size\n  sales {\n    id\n    name\n  }\n  area {\n    id\n    name\n  }\n  isApproved\n  contactPerson\n  contactPersonPosition\n  contactPersonPhone\n  contactPersonEmail\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "409cb914a3eb31be394ed2c41a8583c5";

export default node;

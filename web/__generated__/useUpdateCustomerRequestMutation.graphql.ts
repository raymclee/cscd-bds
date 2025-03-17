/**
 * @generated SignedSource<<de3b1c2df7f088b6bc3286b5a2e9fe20>>
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
  approvalStatus?: number | null | undefined;
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
  clearUpdatedBy?: boolean | null | undefined;
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
  updatedByID?: string | null | undefined;
};
export type useUpdateCustomerRequestMutation$variables = {
  id: string;
  input: UpdateCustomerInput;
};
export type useUpdateCustomerRequestMutation$data = {
  readonly updateCustomerRequest: {
    readonly draft: {
      readonly area: {
        readonly code: string;
        readonly id: string;
        readonly name: string;
      } | null | undefined;
      readonly contactPerson: string | null | undefined;
      readonly contactPersonEmail: string | null | undefined;
      readonly contactPersonPhone: string | null | undefined;
      readonly contactPersonPosition: string | null | undefined;
      readonly industry: number | null | undefined;
      readonly name: string | null | undefined;
      readonly ownerType: number | null | undefined;
      readonly sales: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly size: number | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": [
    (v10/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomerDraft",
  "kind": "LinkedField",
  "name": "draft",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/),
    (v5/*: any*/),
    (v6/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/),
    (v9/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": [
        (v10/*: any*/),
        (v11/*: any*/),
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v14 = [
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "customerDetailFragment"
          },
          (v13/*: any*/)
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
          (v10/*: any*/),
          (v2/*: any*/),
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
              (v2/*: any*/),
              (v10/*: any*/)
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
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v10/*: any*/),
              (v2/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "approvalStatus",
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": "lastVisitRecord",
            "args": (v14/*: any*/),
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
                      (v10/*: any*/),
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
            "args": (v14/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "customerDetailFragment_lastVisitRecord",
            "kind": "LinkedHandle",
            "name": "visitRecords"
          },
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2578b03f71a511639aebf29b8fc37660",
    "id": null,
    "metadata": {},
    "name": "useUpdateCustomerRequestMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateCustomerRequestMutation(\n  $id: ID!\n  $input: UpdateCustomerInput!\n) {\n  updateCustomerRequest(id: $id, input: $input) {\n    ...customerDetailFragment\n    draft {\n      name\n      ownerType\n      industry\n      size\n      contactPerson\n      contactPersonPosition\n      contactPersonPhone\n      contactPersonEmail\n      area {\n        id\n        code\n        name\n      }\n      sales {\n        id\n        name\n      }\n    }\n    id\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  name\n  createdAt\n  createdBy {\n    name\n    id\n  }\n  updatedAt\n  ownerType\n  industry\n  size\n  sales {\n    id\n    name\n  }\n  area {\n    id\n    name\n    code\n  }\n  approvalStatus\n  contactPerson\n  contactPersonPosition\n  contactPersonPhone\n  contactPersonEmail\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n  draft {\n    name\n    ownerType\n    industry\n    size\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    area {\n      id\n      code\n      name\n    }\n    sales {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b901bf16d77b30ec188491158df35f9";

export default node;

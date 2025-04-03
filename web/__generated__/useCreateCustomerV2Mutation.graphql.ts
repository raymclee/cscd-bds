/**
 * @generated SignedSource<<2a5185b505b6263e40acc8d295b04c42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateCustomerInput = {
  activeProfileID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  areaID: string;
  contactPerson?: string | null | undefined;
  contactPersonEmail?: string | null | undefined;
  contactPersonPhone?: string | null | undefined;
  contactPersonPosition?: string | null | undefined;
  createdAt?: any | null | undefined;
  createdByID?: string | null | undefined;
  industry?: number | null | undefined;
  name: string;
  ownerType?: number | null | undefined;
  pendingProfileID?: string | null | undefined;
  profileIDs?: ReadonlyArray<string> | null | undefined;
  salesID?: string | null | undefined;
  size?: number | null | undefined;
  tenderIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  updatedByID?: string | null | undefined;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
};
export type CreateCustomerProfileInput = {
  approvalDate?: any | null | undefined;
  approvalMsgID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  contactPerson?: string | null | undefined;
  contactPersonEmail?: string | null | undefined;
  contactPersonPhone?: string | null | undefined;
  contactPersonPosition?: string | null | undefined;
  createdAt?: any | null | undefined;
  createdByID?: string | null | undefined;
  customerID: string;
  industry?: number | null | undefined;
  name: string;
  ownerType?: number | null | undefined;
  salesID?: string | null | undefined;
  size?: number | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useCreateCustomerV2Mutation$variables = {
  connections: ReadonlyArray<string>;
  customerInput: CreateCustomerInput;
  profileInput: CreateCustomerProfileInput;
};
export type useCreateCustomerV2Mutation$data = {
  readonly createCustomerV2: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
  };
};
export type useCreateCustomerV2Mutation = {
  response: useCreateCustomerV2Mutation$data;
  variables: useCreateCustomerV2Mutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "customerInput"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "profileInput"
},
v3 = [
  {
    "kind": "Variable",
    "name": "customerInput",
    "variableName": "customerInput"
  },
  {
    "kind": "Variable",
    "name": "profileInput",
    "variableName": "profileInput"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v4/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v19 = [
  (v4/*: any*/),
  (v6/*: any*/),
  (v5/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/)
],
v20 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateCustomerV2Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "createCustomerV2",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateCustomerV2Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Customer",
        "kind": "LinkedField",
        "name": "createCustomerV2",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "code",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomerProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
              (v5/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "approver",
                "plural": false,
                "selections": (v7/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomerProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": (v19/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "orderBy",
                "value": [
                  {
                    "direction": "DESC",
                    "field": "CREATED_AT"
                  }
                ]
              }
            ],
            "concreteType": "CustomerProfileConnection",
            "kind": "LinkedField",
            "name": "profiles",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomerProfileEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CustomerProfile",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": (v19/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
          },
          {
            "alias": "lastVisitRecord",
            "args": (v20/*: any*/),
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
                      (v4/*: any*/),
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
            "args": (v20/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "customerDetailFragment_lastVisitRecord",
            "kind": "LinkedHandle",
            "name": "visitRecords"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": null,
        "handle": "appendNode",
        "key": "",
        "kind": "LinkedHandle",
        "name": "createCustomerV2",
        "handleArgs": [
          {
            "kind": "Variable",
            "name": "connections",
            "variableName": "connections"
          },
          {
            "kind": "Literal",
            "name": "edgeTypeName",
            "value": "CustomerEdge"
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "666ce0e95fe3937f5f747f82311288bf",
    "id": null,
    "metadata": {},
    "name": "useCreateCustomerV2Mutation",
    "operationKind": "mutation",
    "text": "mutation useCreateCustomerV2Mutation(\n  $customerInput: CreateCustomerInput!\n  $profileInput: CreateCustomerProfileInput!\n) {\n  createCustomerV2(customerInput: $customerInput, profileInput: $profileInput) {\n    id\n    ...customerDetailFragment\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  createdAt\n  createdBy {\n    id\n    name\n  }\n  area {\n    id\n    name\n    code\n  }\n  activeProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      name\n      id\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n    approver {\n      id\n      name\n    }\n  }\n  pendingProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      name\n      id\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        createdBy {\n          name\n          id\n        }\n        updatedAt\n        ownerType\n        industry\n        size\n        approvalStatus\n        contactPerson\n        contactPersonPosition\n        contactPersonPhone\n        contactPersonEmail\n        sales {\n          id\n          name\n        }\n      }\n    }\n  }\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dedd68b726a00e23a266786f507f469c";

export default node;

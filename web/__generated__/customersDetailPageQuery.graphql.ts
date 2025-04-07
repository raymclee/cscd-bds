/**
 * @generated SignedSource<<b0a49f616514c452b8ecb3fad21b5d64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customersDetailPageQuery$variables = {
  first?: number | null | undefined;
  id: string;
  last?: number | null | undefined;
  userId: string;
};
export type customersDetailPageQuery$data = {
  readonly node: {
    readonly activeProfile?: {
      readonly approvalStatus: number;
      readonly contactPerson: string | null | undefined;
      readonly contactPersonEmail: string | null | undefined;
      readonly contactPersonPhone: string | null | undefined;
      readonly contactPersonPosition: string | null | undefined;
      readonly createdAt: any;
      readonly createdBy: {
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly industry: number | null | undefined;
      readonly name: string;
      readonly ownerType: number | null | undefined;
      readonly size: number | null | undefined;
      readonly updatedAt: any;
    } | null | undefined;
    readonly id?: string;
    readonly pendingProfile?: {
      readonly approvalStatus: number;
      readonly contactPerson: string | null | undefined;
      readonly contactPersonEmail: string | null | undefined;
      readonly contactPersonPhone: string | null | undefined;
      readonly contactPersonPosition: string | null | undefined;
      readonly createdAt: any;
      readonly createdBy: {
        readonly name: string | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly industry: number | null | undefined;
      readonly name: string;
      readonly ownerType: number | null | undefined;
      readonly size: number | null | undefined;
      readonly updatedAt: any;
    } | null | undefined;
    readonly profiles?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly approvalDate: any | null | undefined;
          readonly approvalStatus: number;
          readonly approver: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly contactPerson: string | null | undefined;
          readonly contactPersonEmail: string | null | undefined;
          readonly contactPersonPhone: string | null | undefined;
          readonly contactPersonPosition: string | null | undefined;
          readonly createdAt: any;
          readonly createdBy: {
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly id: string;
          readonly industry: number | null | undefined;
          readonly name: string;
          readonly ownerType: number | null | undefined;
          readonly size: number | null | undefined;
          readonly updatedAt: any;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
    readonly sales?: {
      readonly id: string;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment" | "customerTenderListFragment">;
  } | null | undefined;
  readonly user: {
    readonly tenders?: {
      readonly edges: ReadonlyArray<{
        readonly __id: string;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type customersDetailPageQuery = {
  response: customersDetailPageQuery$data;
  variables: customersDetailPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v8/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v20 = [
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
  (v19/*: any*/)
],
v21 = [
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
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalDate",
  "storageKey": null
},
v23 = [
  (v5/*: any*/),
  (v8/*: any*/)
],
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v25 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v26 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v27 = [
  (v25/*: any*/),
  (v26/*: any*/)
],
v28 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v29 = {
  "fields": [
    {
      "fields": (v4/*: any*/),
      "kind": "ObjectValue",
      "name": "hasCustomerWith"
    }
  ],
  "kind": "ObjectValue",
  "name": "where"
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v32 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasPreviousPage",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startCursor",
  "storageKey": null
},
v35 = {
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
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    (v33/*: any*/),
    (v34/*: any*/)
  ],
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": (v23/*: any*/),
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "concreteType": "Area",
  "kind": "LinkedField",
  "name": "area",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v8/*: any*/),
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
v39 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 1
  }
],
v40 = [
  (v5/*: any*/),
  (v15/*: any*/),
  (v8/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  },
  (v9/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "estimatedAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "classify",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Customer",
    "kind": "LinkedField",
    "name": "customer",
    "plural": false,
    "selections": (v23/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "images",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fullAddress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "discoveryDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderClosingDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createdBy",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  }
],
v41 = [
  (v25/*: any*/),
  (v26/*: any*/),
  (v29/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomerProfile",
                "kind": "LinkedField",
                "name": "activeProfile",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomerProfile",
                "kind": "LinkedField",
                "name": "pendingProfile",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v21/*: any*/),
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
                        "selections": [
                          (v5/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v22/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v24/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "customerDetailFragment"
              },
              {
                "args": (v27/*: any*/),
                "kind": "FragmentSpread",
                "name": "customerTenderListFragment"
              }
            ],
            "type": "Customer",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "user",
        "args": (v28/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "tenders",
                "args": [
                  (v29/*: any*/)
                ],
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "__customerTenderListFragment_tenders_connection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v31/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v32/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v35/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "customersDetailPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v31/*: any*/),
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CustomerProfile",
                "kind": "LinkedField",
                "name": "activeProfile",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v36/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v37/*: any*/),
                  (v24/*: any*/)
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
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "leader",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v37/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v21/*: any*/),
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
                        "selections": [
                          (v5/*: any*/),
                          (v8/*: any*/),
                          (v9/*: any*/),
                          (v36/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v22/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v24/*: any*/),
                          (v37/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": (v23/*: any*/),
                "storageKey": null
              },
              (v38/*: any*/),
              {
                "alias": "lastVisitRecord",
                "args": (v39/*: any*/),
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
                          (v5/*: any*/),
                          (v31/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v30/*: any*/)
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
                      (v33/*: any*/),
                      (v34/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "visitRecords(last:1)"
              },
              {
                "alias": "lastVisitRecord",
                "args": (v39/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "customerDetailFragment_lastVisitRecord",
                "kind": "LinkedHandle",
                "name": "visitRecords"
              },
              {
                "alias": null,
                "args": (v27/*: any*/),
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "tenders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v38/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "followingSales",
                            "plural": true,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TenderProfile",
                            "kind": "LinkedField",
                            "name": "pendingProfile",
                            "plural": false,
                            "selections": (v40/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "TenderProfile",
                            "kind": "LinkedField",
                            "name": "activeProfile",
                            "plural": false,
                            "selections": (v40/*: any*/),
                            "storageKey": null
                          },
                          (v31/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v30/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v35/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v27/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "customerTenderListFragment_tenders",
                "kind": "LinkedHandle",
                "name": "tenders"
              }
            ],
            "type": "Customer",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "user",
        "args": (v28/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v31/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": "tenders",
                "args": (v41/*: any*/),
                "concreteType": "TenderConnection",
                "kind": "LinkedField",
                "name": "myTenders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v30/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Tender",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v31/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v32/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v35/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": "tenders",
                "args": (v41/*: any*/),
                "filters": [
                  "where"
                ],
                "handle": "connection",
                "key": "customerTenderListFragment_tenders",
                "kind": "LinkedHandle",
                "name": "myTenders"
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a48317d51d9247b6573d71da52da3b39",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": [
            "user",
            "tenders"
          ]
        }
      ]
    },
    "name": "customersDetailPageQuery",
    "operationKind": "query",
    "text": "query customersDetailPageQuery(\n  $id: ID!\n  $first: Int\n  $last: Int\n  $userId: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Customer {\n      id\n      sales {\n        id\n      }\n      activeProfile {\n        id\n        name\n        createdAt\n        createdBy {\n          name\n          id\n        }\n        updatedAt\n        ownerType\n        industry\n        size\n        approvalStatus\n        contactPerson\n        contactPersonPosition\n        contactPersonPhone\n        contactPersonEmail\n      }\n      pendingProfile {\n        id\n        name\n        createdAt\n        createdBy {\n          name\n          id\n        }\n        updatedAt\n        ownerType\n        industry\n        size\n        approvalStatus\n        contactPerson\n        contactPersonPosition\n        contactPersonPhone\n        contactPersonEmail\n      }\n      profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n        edges {\n          node {\n            id\n            name\n            createdAt\n            createdBy {\n              name\n              id\n            }\n            updatedAt\n            ownerType\n            industry\n            size\n            approvalDate\n            approvalStatus\n            contactPerson\n            contactPersonPosition\n            contactPersonPhone\n            contactPersonEmail\n            approver {\n              id\n              name\n            }\n          }\n        }\n      }\n      ...customerDetailFragment\n      ...customerTenderListFragment_2pIUTM\n    }\n    id\n  }\n  user: node(id: $userId) {\n    __typename\n    ... on User {\n      tenders: myTenders(first: $first, last: $last, where: {hasCustomerWith: {id: $id}}) {\n        edges {\n          cursor\n          node {\n            __typename\n            id\n          }\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  createdBy {\n    id\n    name\n  }\n  area {\n    id\n    name\n    code\n  }\n  activeProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      name\n      id\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n    approver {\n      id\n      name\n    }\n  }\n  pendingProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      id\n      leader {\n        id\n      }\n      name\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        createdBy {\n          name\n          id\n        }\n        updatedAt\n        ownerType\n        industry\n        size\n        approvalStatus\n        approvalDate\n        approver {\n          id\n          name\n        }\n        contactPerson\n        contactPersonPosition\n        contactPersonPhone\n        contactPersonEmail\n        sales {\n          id\n          name\n        }\n      }\n    }\n  }\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment customerTenderListFragment_2pIUTM on Customer {\n  tenders(first: $first, last: $last) {\n    edges {\n      node {\n        id\n        ...tenderListItemFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment tenderListItemFragment on Tender {\n  id\n  area {\n    id\n    name\n    code\n  }\n  followingSales {\n    id\n  }\n  pendingProfile {\n    id\n    approvalStatus\n    name\n    status\n    createdAt\n    estimatedAmount\n    classify\n    customer {\n      id\n      name\n    }\n    images\n    fullAddress\n    tenderDate\n    discoveryDate\n    tenderClosingDate\n    createdBy {\n      id\n    }\n  }\n  activeProfile {\n    id\n    approvalStatus\n    name\n    status\n    createdAt\n    estimatedAmount\n    classify\n    customer {\n      id\n      name\n    }\n    images\n    fullAddress\n    tenderDate\n    discoveryDate\n    tenderClosingDate\n    createdBy {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fa253fca655ca6fca9d3b9c3bea01784";

export default node;

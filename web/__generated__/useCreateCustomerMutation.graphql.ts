/**
 * @generated SignedSource<<c3d16ebc5c615c867dd0971beadc3018>>
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
export type useCreateCustomerMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCustomerInput;
};
export type useCreateCustomerMutation$data = {
  readonly createCustomer: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type useCreateCustomerMutation = {
  response: useCreateCustomerMutation$data;
  variables: useCreateCustomerMutation$variables;
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
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v19 = [
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateCustomerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CustomerConnection",
        "kind": "LinkedField",
        "name": "createCustomer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Customer",
                "kind": "LinkedField",
                "name": "node",
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
            "storageKey": null
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateCustomerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CustomerConnection",
        "kind": "LinkedField",
        "name": "createCustomer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CustomerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Customer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "createdBy",
                    "plural": false,
                    "selections": (v5/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "createdBy",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "leader",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/)
                    ],
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
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "approvalDate",
                                "storageKey": null
                              },
                              (v18/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/)
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
                    "alias": "lastVisitRecord",
                    "args": (v19/*: any*/),
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
                              (v3/*: any*/),
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
                    "args": (v19/*: any*/),
                    "filters": null,
                    "handle": "connection",
                    "key": "customerDetailFragment_lastVisitRecord",
                    "kind": "LinkedHandle",
                    "name": "visitRecords"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aec6f6127602bb8f283eff51a65210a1",
    "id": null,
    "metadata": {},
    "name": "useCreateCustomerMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateCustomerMutation(\n  $input: CreateCustomerInput!\n) {\n  createCustomer(input: $input) {\n    edges {\n      node {\n        ...customerDetailFragment\n        id\n      }\n    }\n  }\n}\n\nfragment customerDetailFragment on Customer {\n  id\n  createdBy {\n    id\n    name\n  }\n  area {\n    id\n    name\n    code\n  }\n  activeProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      name\n      id\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n    approver {\n      id\n      name\n    }\n  }\n  pendingProfile {\n    id\n    name\n    createdAt\n    createdBy {\n      id\n      leader {\n        id\n      }\n      name\n    }\n    updatedAt\n    ownerType\n    industry\n    size\n    approvalStatus\n    contactPerson\n    contactPersonPosition\n    contactPersonPhone\n    contactPersonEmail\n    sales {\n      id\n      name\n    }\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        name\n        createdAt\n        createdBy {\n          name\n          id\n        }\n        updatedAt\n        ownerType\n        industry\n        size\n        approvalStatus\n        approvalDate\n        approver {\n          id\n          name\n        }\n        contactPerson\n        contactPersonPosition\n        contactPersonPhone\n        contactPersonEmail\n        sales {\n          id\n          name\n        }\n      }\n    }\n  }\n  lastVisitRecord: visitRecords(last: 1) {\n    edges {\n      node {\n        date\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4f7e3e4d0e73c45bc31ad7f23d255dfc";

export default node;

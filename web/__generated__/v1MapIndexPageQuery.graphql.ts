/**
 * @generated SignedSource<<0c578eb64fe41fe88255534ae4b20d73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type TenderOrderField = "APPROVAL_STATUS" | "CLOSING_DATE" | "CREATED_AT" | "NAME" | "TENDER_DATE" | "%future added value";
export type TenderOrder = {
  direction?: OrderDirection;
  field: TenderOrderField;
};
export type v1MapIndexPageQuery$variables = {
  first?: number | null | undefined;
  last?: number | null | undefined;
  orderBy?: ReadonlyArray<TenderOrder> | null | undefined;
  userId: string;
};
export type v1MapIndexPageQuery$data = {
  readonly customers: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly ownerType: number | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly node: {
    readonly areas?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly center: {
            readonly coordinates: ReadonlyArray<number>;
          } | null | undefined;
          readonly code: string;
          readonly createdAt: any;
          readonly id: string;
          readonly name: string;
          readonly provinces: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly adcode: number;
                readonly center: {
                  readonly coordinates: ReadonlyArray<number>;
                } | null | undefined;
                readonly id: string;
                readonly name: string;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
          readonly tenders: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly architect: string | null | undefined;
                readonly area: {
                  readonly code: string;
                  readonly name: string;
                };
                readonly city: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly competitivePartnershipRating: number | null | undefined;
                readonly competitivePartnershipRatingOverview: string | null | undefined;
                readonly constructionArea: string | null | undefined;
                readonly consultingFirm: string | null | undefined;
                readonly contractForm: string | null | undefined;
                readonly contractor: string | null | undefined;
                readonly createdAt: any;
                readonly creditAndPaymentRating: number | null | undefined;
                readonly creditAndPaymentRatingOverview: string | null | undefined;
                readonly customer: {
                  readonly area: {
                    readonly id: string;
                    readonly name: string;
                  };
                  readonly id: string;
                  readonly name: string;
                  readonly ownerType: number | null | undefined;
                } | null | undefined;
                readonly customerRelationshipRating: number | null | undefined;
                readonly customerRelationshipRatingOverview: string | null | undefined;
                readonly designUnit: string | null | undefined;
                readonly developer: string | null | undefined;
                readonly discoveryDate: any;
                readonly district: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly estimatedAmount: number | null | undefined;
                readonly facadeConsultant: string | null | undefined;
                readonly followingSales: ReadonlyArray<{
                  readonly id: string;
                  readonly name: string | null | undefined;
                }> | null | undefined;
                readonly fullAddress: string | null | undefined;
                readonly geoBounds: ReadonlyArray<ReadonlyArray<number | null | undefined> | null | undefined> | null | undefined;
                readonly geoCoordinate: {
                  readonly coordinates: ReadonlyArray<number>;
                } | null | undefined;
                readonly id: string;
                readonly images: ReadonlyArray<string> | null | undefined;
                readonly keyProject: boolean;
                readonly name: string;
                readonly province: {
                  readonly adcode: number;
                  readonly name: string;
                } | null | undefined;
                readonly sizeAndValueRating: number | null | undefined;
                readonly sizeAndValueRatingOverview: string | null | undefined;
                readonly status: number;
                readonly tenderClosingDate: any | null | undefined;
                readonly tenderCode: string | null | undefined;
                readonly tenderDate: any | null | undefined;
                readonly tenderForm: string | null | undefined;
                readonly tenderWinAmount: number | null | undefined;
                readonly tenderWinCompany: string | null | undefined;
                readonly tenderWinDate: any | null | undefined;
                readonly tenderingAgency: string | null | undefined;
                readonly timeLimitRating: number | null | undefined;
                readonly timeLimitRatingOverview: string | null | undefined;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
  readonly topCompetitors: ReadonlyArray<{
    readonly id: string;
    readonly shortName: string;
    readonly wonTendersCount: number;
  }>;
  readonly users: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type v1MapIndexPageQuery = {
  response: v1MapIndexPageQuery$data;
  variables: v1MapIndexPageQuery$variables;
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
  "name": "last"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "orderBy"
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
    "variableName": "userId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "coordinates",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "center",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "ProvinceConnection",
  "kind": "LinkedField",
  "name": "provinces",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ProvinceEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Province",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v6/*: any*/),
            (v11/*: any*/),
            (v10/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v14 = {
  "kind": "Literal",
  "name": "where",
  "value": {
    "approvalStatus": 2,
    "statusNEQ": 7
  }
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v18 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/),
    (v17/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": (v18/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "followingSales",
  "plural": true,
  "selections": (v18/*: any*/),
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keyProject",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRatingOverview",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinCompany",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderCode",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "developer",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "architect",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constructionArea",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinAmount",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinDate",
  "storageKey": null
},
v51 = [
  (v6/*: any*/),
  (v11/*: any*/)
],
v52 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "geoCoordinate",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoBounds",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v56 = {
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
},
v57 = {
  "alias": null,
  "args": null,
  "concreteType": "TopCompetitor",
  "kind": "LinkedField",
  "name": "topCompetitors",
  "plural": true,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "shortName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "wonTendersCount",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "concreteType": "UserConnection",
  "kind": "LinkedField",
  "name": "users",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": (v18/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "concreteType": "CustomerConnection",
  "kind": "LinkedField",
  "name": "customers",
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
            (v5/*: any*/),
            (v6/*: any*/),
            (v17/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v60 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  (v13/*: any*/),
  (v14/*: any*/)
],
v61 = [
  (v6/*: any*/),
  (v11/*: any*/),
  (v5/*: any*/)
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
    "name": "v1MapIndexPageQuery",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "AreaConnection",
                "kind": "LinkedField",
                "name": "areas",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AreaEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "kind": "RequiredField",
                            "field": (v6/*: any*/),
                            "action": "NONE",
                            "path": "node.areas.edges.node.name"
                          },
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v10/*: any*/),
                          (v12/*: any*/),
                          {
                            "alias": "tenders",
                            "args": [
                              (v13/*: any*/),
                              (v14/*: any*/)
                            ],
                            "concreteType": "TenderConnection",
                            "kind": "LinkedField",
                            "name": "__MapIndexPageQuery_tenders_connection",
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
                                      (v6/*: any*/),
                                      (v15/*: any*/),
                                      (v8/*: any*/),
                                      (v16/*: any*/),
                                      (v19/*: any*/),
                                      (v20/*: any*/),
                                      (v21/*: any*/),
                                      (v22/*: any*/),
                                      (v23/*: any*/),
                                      (v24/*: any*/),
                                      (v25/*: any*/),
                                      (v26/*: any*/),
                                      (v27/*: any*/),
                                      (v28/*: any*/),
                                      (v29/*: any*/),
                                      (v30/*: any*/),
                                      (v31/*: any*/),
                                      (v32/*: any*/),
                                      (v33/*: any*/),
                                      (v34/*: any*/),
                                      (v35/*: any*/),
                                      (v36/*: any*/),
                                      (v37/*: any*/),
                                      (v38/*: any*/),
                                      (v39/*: any*/),
                                      (v40/*: any*/),
                                      (v41/*: any*/),
                                      (v42/*: any*/),
                                      (v43/*: any*/),
                                      (v44/*: any*/),
                                      (v45/*: any*/),
                                      (v46/*: any*/),
                                      (v47/*: any*/),
                                      (v48/*: any*/),
                                      (v49/*: any*/),
                                      (v50/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": [
                                          (v7/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Province",
                                        "kind": "LinkedField",
                                        "name": "province",
                                        "plural": false,
                                        "selections": [
                                          (v11/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "City",
                                        "kind": "LinkedField",
                                        "name": "city",
                                        "plural": false,
                                        "selections": (v51/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "District",
                                        "kind": "LinkedField",
                                        "name": "district",
                                        "plural": false,
                                        "selections": (v51/*: any*/),
                                        "storageKey": null
                                      },
                                      (v52/*: any*/),
                                      (v53/*: any*/),
                                      (v54/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v55/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v56/*: any*/)
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
                "storageKey": null
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      (v57/*: any*/),
      (v58/*: any*/),
      (v59/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "v1MapIndexPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v54/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AreaConnection",
                "kind": "LinkedField",
                "name": "areas",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AreaEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v10/*: any*/),
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": (v60/*: any*/),
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
                                      (v6/*: any*/),
                                      (v15/*: any*/),
                                      (v8/*: any*/),
                                      (v16/*: any*/),
                                      (v19/*: any*/),
                                      (v20/*: any*/),
                                      (v21/*: any*/),
                                      (v22/*: any*/),
                                      (v23/*: any*/),
                                      (v24/*: any*/),
                                      (v25/*: any*/),
                                      (v26/*: any*/),
                                      (v27/*: any*/),
                                      (v28/*: any*/),
                                      (v29/*: any*/),
                                      (v30/*: any*/),
                                      (v31/*: any*/),
                                      (v32/*: any*/),
                                      (v33/*: any*/),
                                      (v34/*: any*/),
                                      (v35/*: any*/),
                                      (v36/*: any*/),
                                      (v37/*: any*/),
                                      (v38/*: any*/),
                                      (v39/*: any*/),
                                      (v40/*: any*/),
                                      (v41/*: any*/),
                                      (v42/*: any*/),
                                      (v43/*: any*/),
                                      (v44/*: any*/),
                                      (v45/*: any*/),
                                      (v46/*: any*/),
                                      (v47/*: any*/),
                                      (v48/*: any*/),
                                      (v49/*: any*/),
                                      (v50/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Area",
                                        "kind": "LinkedField",
                                        "name": "area",
                                        "plural": false,
                                        "selections": [
                                          (v7/*: any*/),
                                          (v6/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Province",
                                        "kind": "LinkedField",
                                        "name": "province",
                                        "plural": false,
                                        "selections": [
                                          (v11/*: any*/),
                                          (v6/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "City",
                                        "kind": "LinkedField",
                                        "name": "city",
                                        "plural": false,
                                        "selections": (v61/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "District",
                                        "kind": "LinkedField",
                                        "name": "district",
                                        "plural": false,
                                        "selections": (v61/*: any*/),
                                        "storageKey": null
                                      },
                                      (v52/*: any*/),
                                      (v53/*: any*/),
                                      (v54/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v55/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v56/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v60/*: any*/),
                            "filters": [
                              "orderBy",
                              "where"
                            ],
                            "handle": "connection",
                            "key": "MapIndexPageQuery_tenders",
                            "kind": "LinkedHandle",
                            "name": "tenders"
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
            "type": "User",
            "abstractKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      (v57/*: any*/),
      (v58/*: any*/),
      (v59/*: any*/)
    ]
  },
  "params": {
    "cacheID": "c34cc26693c1324303ab4d9124a1ef00",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "bidirectional",
          "path": null
        }
      ]
    },
    "name": "v1MapIndexPageQuery",
    "operationKind": "query",
    "text": "query v1MapIndexPageQuery(\n  $userId: ID!\n  $orderBy: [TenderOrder!]\n  $first: Int\n  $last: Int\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        edges {\n          node {\n            id\n            name\n            code\n            createdAt\n            center {\n              coordinates\n            }\n            provinces {\n              edges {\n                node {\n                  id\n                  name\n                  adcode\n                  center {\n                    coordinates\n                  }\n                }\n              }\n            }\n            tenders(orderBy: $orderBy, first: $first, last: $last, where: {statusNEQ: 7, approvalStatus: 2}) {\n              edges {\n                node {\n                  id\n                  name\n                  status\n                  createdAt\n                  estimatedAmount\n                  customer {\n                    id\n                    name\n                    ownerType\n                    area {\n                      id\n                      name\n                    }\n                  }\n                  followingSales {\n                    id\n                    name\n                  }\n                  images\n                  fullAddress\n                  tenderDate\n                  discoveryDate\n                  contractor\n                  designUnit\n                  tenderForm\n                  keyProject\n                  contractForm\n                  tenderingAgency\n                  consultingFirm\n                  facadeConsultant\n                  timeLimitRating\n                  sizeAndValueRating\n                  creditAndPaymentRating\n                  customerRelationshipRating\n                  competitivePartnershipRating\n                  timeLimitRatingOverview\n                  sizeAndValueRatingOverview\n                  creditAndPaymentRatingOverview\n                  customerRelationshipRatingOverview\n                  competitivePartnershipRatingOverview\n                  tenderWinCompany\n                  tenderCode\n                  developer\n                  architect\n                  tenderClosingDate\n                  constructionArea\n                  tenderWinAmount\n                  tenderWinDate\n                  area {\n                    code\n                    name\n                    id\n                  }\n                  province {\n                    adcode\n                    name\n                    id\n                  }\n                  city {\n                    name\n                    adcode\n                    id\n                  }\n                  district {\n                    name\n                    adcode\n                    id\n                  }\n                  geoCoordinate {\n                    coordinates\n                  }\n                  geoBounds\n                  __typename\n                }\n                cursor\n              }\n              pageInfo {\n                endCursor\n                hasNextPage\n                hasPreviousPage\n                startCursor\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n  topCompetitors {\n    id\n    shortName\n    wonTendersCount\n  }\n  users {\n    edges {\n      node {\n        id\n        name\n      }\n    }\n  }\n  customers {\n    edges {\n      node {\n        id\n        name\n        ownerType\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f456ab5a2e8b23c94d60714c1d7fad95";

export default node;

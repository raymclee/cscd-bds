/**
 * @generated SignedSource<<61b80c2923201d0a5ce29fe25407bdcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type portalTendersPageQuery$variables = {
  userId: string;
};
export type portalTendersPageQuery$data = {
  readonly node: {
    readonly areas?: ReadonlyArray<{
      readonly id: string;
      readonly tenders: ReadonlyArray<{
        readonly area: {
          readonly name: string;
        };
        readonly city: {
          readonly adcode: number;
        } | null | undefined;
        readonly competitivePartnershipRating: number | null | undefined;
        readonly competitivePartnershipRatingOverview: string | null | undefined;
        readonly consultingFirm: string | null | undefined;
        readonly contractForm: string | null | undefined;
        readonly contractor: string | null | undefined;
        readonly createdAt: any;
        readonly creditAndPaymentRating: number | null | undefined;
        readonly creditAndPaymentRatingOverview: string | null | undefined;
        readonly customer: {
          readonly ownerType: number | null | undefined;
        };
        readonly customerRelationshipRating: number | null | undefined;
        readonly customerRelationshipRatingOverview: string | null | undefined;
        readonly designUnit: string | null | undefined;
        readonly discoveryDate: any;
        readonly district: {
          readonly adcode: number;
        };
        readonly estimatedAmount: number | null | undefined;
        readonly facadeConsultant: string | null | undefined;
        readonly fullAddress: string | null | undefined;
        readonly geoCoordinate: {
          readonly coordinates: ReadonlyArray<number>;
        } | null | undefined;
        readonly id: string;
        readonly images: ReadonlyArray<string> | null | undefined;
        readonly name: string;
        readonly province: {
          readonly adcode: number;
        };
        readonly sizeAndValueRating: number | null | undefined;
        readonly sizeAndValueRatingOverview: string | null | undefined;
        readonly status: number;
        readonly tenderDate: any | null | undefined;
        readonly tenderForm: string | null | undefined;
        readonly tenderingAgency: string | null | undefined;
        readonly timeLimitRating: number | null | undefined;
        readonly timeLimitRatingOverview: string | null | undefined;
        readonly visitRecords: ReadonlyArray<{
          readonly commContent: string;
          readonly commPeople: string;
          readonly customer: {
            readonly name: string;
          } | null | undefined;
          readonly date: any;
          readonly nextStep: string | null | undefined;
          readonly visitType: number;
        }> | null | undefined;
      }> | null | undefined;
    }> | null | undefined;
  } | null | undefined;
};
export type portalTendersPageQuery = {
  response: portalTendersPageQuery$data;
  variables: portalTendersPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
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
  "name": "estimatedAmount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRatingOverview",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v29 = [
  (v3/*: any*/)
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v31 = [
  (v30/*: any*/)
],
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "geoCoordinate",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "coordinates",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visitType",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nextStep",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commPeople",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commContent",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v38 = [
  (v3/*: any*/),
  (v2/*: any*/)
],
v39 = [
  (v30/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "portalTendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "areas",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tender",
                    "kind": "LinkedField",
                    "name": "tenders",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Customer",
                        "kind": "LinkedField",
                        "name": "customer",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/)
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
                      (v17/*: any*/),
                      (v18/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "area",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Province",
                        "kind": "LinkedField",
                        "name": "province",
                        "plural": false,
                        "selections": (v31/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "City",
                        "kind": "LinkedField",
                        "name": "city",
                        "plural": false,
                        "selections": (v31/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "District",
                        "kind": "LinkedField",
                        "name": "district",
                        "plural": false,
                        "selections": (v31/*: any*/),
                        "storageKey": null
                      },
                      (v32/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "VisitRecord",
                        "kind": "LinkedField",
                        "name": "visitRecords",
                        "plural": true,
                        "selections": [
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v37/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Customer",
                            "kind": "LinkedField",
                            "name": "customer",
                            "plural": false,
                            "selections": (v29/*: any*/),
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "portalTendersPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Area",
                "kind": "LinkedField",
                "name": "areas",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tender",
                    "kind": "LinkedField",
                    "name": "tenders",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Customer",
                        "kind": "LinkedField",
                        "name": "customer",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v2/*: any*/)
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
                      (v17/*: any*/),
                      (v18/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "area",
                        "plural": false,
                        "selections": (v38/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Province",
                        "kind": "LinkedField",
                        "name": "province",
                        "plural": false,
                        "selections": (v39/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "City",
                        "kind": "LinkedField",
                        "name": "city",
                        "plural": false,
                        "selections": (v39/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "District",
                        "kind": "LinkedField",
                        "name": "district",
                        "plural": false,
                        "selections": (v39/*: any*/),
                        "storageKey": null
                      },
                      (v32/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "VisitRecord",
                        "kind": "LinkedField",
                        "name": "visitRecords",
                        "plural": true,
                        "selections": [
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v37/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Customer",
                            "kind": "LinkedField",
                            "name": "customer",
                            "plural": false,
                            "selections": (v38/*: any*/),
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bf87859bccb2837b0977d8c99f58bfca",
    "id": null,
    "metadata": {},
    "name": "portalTendersPageQuery",
    "operationKind": "query",
    "text": "query portalTendersPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      areas {\n        id\n        tenders {\n          id\n          name\n          status\n          createdAt\n          estimatedAmount\n          customer {\n            ownerType\n            id\n          }\n          images\n          fullAddress\n          tenderDate\n          discoveryDate\n          contractor\n          designUnit\n          tenderForm\n          contractForm\n          tenderingAgency\n          consultingFirm\n          facadeConsultant\n          timeLimitRating\n          sizeAndValueRating\n          creditAndPaymentRating\n          customerRelationshipRating\n          competitivePartnershipRating\n          timeLimitRatingOverview\n          sizeAndValueRatingOverview\n          creditAndPaymentRatingOverview\n          customerRelationshipRatingOverview\n          competitivePartnershipRatingOverview\n          area {\n            name\n            id\n          }\n          province {\n            adcode\n            id\n          }\n          city {\n            adcode\n            id\n          }\n          district {\n            adcode\n            id\n          }\n          geoCoordinate {\n            coordinates\n          }\n          visitRecords {\n            visitType\n            nextStep\n            commPeople\n            commContent\n            date\n            customer {\n              name\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "593771b47417a72a5c3c1b1d15ebad8e";

export default node;

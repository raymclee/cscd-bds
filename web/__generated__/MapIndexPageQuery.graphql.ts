/**
 * @generated SignedSource<<228295e64404fae0268323503a3eb6d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MapIndexPageQuery$variables = Record<PropertyKey, never>;
export type MapIndexPageQuery$data = {
  readonly areas: {
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
              readonly area: {
                readonly name: string;
              };
              readonly city: {
                readonly adcode: number;
                readonly name: string;
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
                readonly name: string;
              };
              readonly estimatedAmount: number | null | undefined;
              readonly facadeConsultant: string | null | undefined;
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
              };
              readonly sizeAndValueRating: number | null | undefined;
              readonly sizeAndValueRatingOverview: string | null | undefined;
              readonly status: number;
              readonly tenderDate: any | null | undefined;
              readonly tenderForm: string | null | undefined;
              readonly tenderingAgency: string | null | undefined;
              readonly timeLimitRating: number | null | undefined;
              readonly timeLimitRatingOverview: string | null | undefined;
              readonly visitRecords: {
                readonly edges: ReadonlyArray<{
                  readonly node: {
                    readonly commContent: string;
                    readonly commPeople: string;
                    readonly customer: {
                      readonly name: string;
                    } | null | undefined;
                    readonly date: any;
                    readonly nextStep: string | null | undefined;
                    readonly visitType: number;
                  } | null | undefined;
                } | null | undefined> | null | undefined;
              };
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type MapIndexPageQuery = {
  response: MapIndexPageQuery$data;
  variables: MapIndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "coordinates",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "center",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v7 = {
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
            (v0/*: any*/),
            (v1/*: any*/),
            (v6/*: any*/),
            (v5/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
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
  "name": "images",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keyProject",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRatingOverview",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v33 = [
  (v1/*: any*/)
],
v34 = [
  (v1/*: any*/),
  (v6/*: any*/)
],
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "geoCoordinate",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoBounds",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visitType",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nextStep",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commPeople",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "commContent",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v42 = [
  (v1/*: any*/),
  (v0/*: any*/)
],
v43 = [
  (v1/*: any*/),
  (v6/*: any*/),
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MapIndexPageQuery",
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
                  (v0/*: any*/),
                  {
                    "kind": "RequiredField",
                    "field": (v1/*: any*/),
                    "action": "NONE",
                    "path": "areas.edges.node.name"
                  },
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
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
                              (v0/*: any*/),
                              (v1/*: any*/),
                              (v8/*: any*/),
                              (v3/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Customer",
                                "kind": "LinkedField",
                                "name": "customer",
                                "plural": false,
                                "selections": [
                                  (v10/*: any*/)
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
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Area",
                                "kind": "LinkedField",
                                "name": "area",
                                "plural": false,
                                "selections": (v33/*: any*/),
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
                                  (v6/*: any*/),
                                  (v1/*: any*/)
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
                                "selections": (v34/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "District",
                                "kind": "LinkedField",
                                "name": "district",
                                "plural": false,
                                "selections": (v34/*: any*/),
                                "storageKey": null
                              },
                              (v35/*: any*/),
                              (v36/*: any*/),
                              {
                                "alias": null,
                                "args": null,
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
                                          (v37/*: any*/),
                                          (v38/*: any*/),
                                          (v39/*: any*/),
                                          (v40/*: any*/),
                                          (v41/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Customer",
                                            "kind": "LinkedField",
                                            "name": "customer",
                                            "plural": false,
                                            "selections": (v33/*: any*/),
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
            "storageKey": null
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapIndexPageQuery",
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
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
                              (v0/*: any*/),
                              (v1/*: any*/),
                              (v8/*: any*/),
                              (v3/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Customer",
                                "kind": "LinkedField",
                                "name": "customer",
                                "plural": false,
                                "selections": [
                                  (v10/*: any*/),
                                  (v0/*: any*/)
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
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Area",
                                "kind": "LinkedField",
                                "name": "area",
                                "plural": false,
                                "selections": (v42/*: any*/),
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
                                  (v6/*: any*/),
                                  (v1/*: any*/),
                                  (v0/*: any*/)
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
                                "selections": (v43/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "District",
                                "kind": "LinkedField",
                                "name": "district",
                                "plural": false,
                                "selections": (v43/*: any*/),
                                "storageKey": null
                              },
                              (v35/*: any*/),
                              (v36/*: any*/),
                              {
                                "alias": null,
                                "args": null,
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
                                          (v37/*: any*/),
                                          (v38/*: any*/),
                                          (v39/*: any*/),
                                          (v40/*: any*/),
                                          (v41/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Customer",
                                            "kind": "LinkedField",
                                            "name": "customer",
                                            "plural": false,
                                            "selections": (v42/*: any*/),
                                            "storageKey": null
                                          },
                                          (v0/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dc365032dab3a82d799a212d4824aa20",
    "id": null,
    "metadata": {},
    "name": "MapIndexPageQuery",
    "operationKind": "query",
    "text": "query MapIndexPageQuery {\n  areas {\n    edges {\n      node {\n        id\n        name\n        code\n        createdAt\n        center {\n          coordinates\n        }\n        provinces {\n          edges {\n            node {\n              id\n              name\n              adcode\n              center {\n                coordinates\n              }\n            }\n          }\n        }\n        tenders {\n          edges {\n            node {\n              id\n              name\n              status\n              createdAt\n              estimatedAmount\n              customer {\n                ownerType\n                id\n              }\n              images\n              fullAddress\n              tenderDate\n              discoveryDate\n              contractor\n              designUnit\n              tenderForm\n              keyProject\n              contractForm\n              tenderingAgency\n              consultingFirm\n              facadeConsultant\n              timeLimitRating\n              sizeAndValueRating\n              creditAndPaymentRating\n              customerRelationshipRating\n              competitivePartnershipRating\n              timeLimitRatingOverview\n              sizeAndValueRatingOverview\n              creditAndPaymentRatingOverview\n              customerRelationshipRatingOverview\n              competitivePartnershipRatingOverview\n              area {\n                name\n                id\n              }\n              province {\n                adcode\n                name\n                id\n              }\n              city {\n                name\n                adcode\n                id\n              }\n              district {\n                name\n                adcode\n                id\n              }\n              geoCoordinate {\n                coordinates\n              }\n              geoBounds\n              visitRecords {\n                edges {\n                  node {\n                    visitType\n                    nextStep\n                    commPeople\n                    commContent\n                    date\n                    customer {\n                      name\n                      id\n                    }\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f6fa043093eaaaa495c8ec8bb0c533f";

export default node;

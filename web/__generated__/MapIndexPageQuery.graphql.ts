/**
 * @generated SignedSource<<68c0f96d5a192a90b9a193afd7112aca>>
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
        readonly provinces: ReadonlyArray<{
          readonly adcode: number;
          readonly center: {
            readonly coordinates: ReadonlyArray<number>;
          };
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
        readonly tenders: ReadonlyArray<{
          readonly area: {
            readonly name: string;
          };
          readonly city: {
            readonly adcode: number;
          } | null | undefined;
          readonly competitivePartnershipRating: number | null | undefined;
          readonly consultingFirm: string | null | undefined;
          readonly contractForm: string | null | undefined;
          readonly contractor: string | null | undefined;
          readonly createdAt: any;
          readonly creditAndPaymentRating: number | null | undefined;
          readonly customer: {
            readonly ownerType: number | null | undefined;
          };
          readonly customerRelationshipRating: number | null | undefined;
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
          readonly name: string;
          readonly province: {
            readonly adcode: number;
          };
          readonly sizeAndValueRating: number | null | undefined;
          readonly status: number;
          readonly tenderDate: any | null | undefined;
          readonly tenderForm: string | null | undefined;
          readonly tenderingAgency: string | null | undefined;
          readonly timeLimitRating: number | null | undefined;
        }> | null | undefined;
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
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
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
  "name": "fullAddress",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderDate",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "discoveryDate",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractor",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sizeAndValueRating",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v25 = [
  (v6/*: any*/)
],
v26 = {
  "alias": null,
  "args": null,
  "concreteType": "GeoJson",
  "kind": "LinkedField",
  "name": "geoCoordinate",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v27 = [
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
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "provinces",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v6/*: any*/),
                      {
                        "kind": "RequiredField",
                        "field": (v5/*: any*/),
                        "action": "THROW",
                        "path": "areas.edges.node.provinces.center"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tender",
                    "kind": "LinkedField",
                    "name": "tenders",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v7/*: any*/),
                      (v3/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Customer",
                        "kind": "LinkedField",
                        "name": "customer",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "area",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/)
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
                        "selections": (v25/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "City",
                        "kind": "LinkedField",
                        "name": "city",
                        "plural": false,
                        "selections": (v25/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "District",
                        "kind": "LinkedField",
                        "name": "district",
                        "plural": false,
                        "selections": (v25/*: any*/),
                        "storageKey": null
                      },
                      (v26/*: any*/)
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "provinces",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v6/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Tender",
                    "kind": "LinkedField",
                    "name": "tenders",
                    "plural": true,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      (v7/*: any*/),
                      (v3/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Customer",
                        "kind": "LinkedField",
                        "name": "customer",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Area",
                        "kind": "LinkedField",
                        "name": "area",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v0/*: any*/)
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
                        "selections": (v27/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "City",
                        "kind": "LinkedField",
                        "name": "city",
                        "plural": false,
                        "selections": (v27/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "District",
                        "kind": "LinkedField",
                        "name": "district",
                        "plural": false,
                        "selections": (v27/*: any*/),
                        "storageKey": null
                      },
                      (v26/*: any*/)
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
    "cacheID": "7f01bdb763d9a47c2a340fe73aaf4642",
    "id": null,
    "metadata": {},
    "name": "MapIndexPageQuery",
    "operationKind": "query",
    "text": "query MapIndexPageQuery {\n  areas {\n    edges {\n      node {\n        id\n        name\n        code\n        createdAt\n        center {\n          coordinates\n        }\n        provinces {\n          id\n          name\n          adcode\n          center {\n            coordinates\n          }\n        }\n        tenders {\n          id\n          name\n          status\n          createdAt\n          estimatedAmount\n          customer {\n            ownerType\n            id\n          }\n          fullAddress\n          tenderDate\n          discoveryDate\n          contractor\n          designUnit\n          tenderForm\n          contractForm\n          tenderingAgency\n          consultingFirm\n          facadeConsultant\n          timeLimitRating\n          sizeAndValueRating\n          creditAndPaymentRating\n          customerRelationshipRating\n          competitivePartnershipRating\n          area {\n            name\n            id\n          }\n          province {\n            adcode\n            id\n          }\n          city {\n            adcode\n            id\n          }\n          district {\n            adcode\n            id\n          }\n          geoCoordinate {\n            coordinates\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a26a2fad4303ad32bbc7b9126634dace";

export default node;

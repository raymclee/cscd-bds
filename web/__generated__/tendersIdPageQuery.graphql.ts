/**
 * @generated SignedSource<<c056e7833a829c8a4063df0b0306fb73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tendersIdPageQuery$variables = {
  id: string;
};
export type tendersIdPageQuery$data = {
  readonly node: {
    readonly activeProfile?: {
      readonly architect: string | null | undefined;
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
      readonly discoveryDate: any | null | undefined;
      readonly district: {
        readonly adcode: number;
        readonly name: string;
      } | null | undefined;
      readonly estimatedAmount: number | null | undefined;
      readonly facadeConsultant: string | null | undefined;
      readonly fullAddress: string | null | undefined;
      readonly geoCoordinate: ReadonlyArray<number> | null | undefined;
      readonly images: ReadonlyArray<string> | null | undefined;
      readonly keyProject: boolean;
      readonly name: string | null | undefined;
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
    readonly area?: {
      readonly code: string;
      readonly id: string;
      readonly name: string;
    };
    readonly followingSales?: ReadonlyArray<{
      readonly id: string;
      readonly name: string | null | undefined;
    }> | null | undefined;
    readonly id?: string;
  } | null | undefined;
};
export type tendersIdPageQuery = {
  response: tendersIdPageQuery$data;
  variables: tendersIdPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "concreteType": "Area",
  "kind": "LinkedField",
  "name": "area",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
},
v5 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "followingSales",
  "plural": true,
  "selections": (v5/*: any*/),
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
  "name": "createdAt",
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
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
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
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    }
  ],
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
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinCompany",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderCode",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "developer",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "architect",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constructionArea",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinAmount",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinDate",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v42 = [
  (v3/*: any*/),
  (v41/*: any*/)
],
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoCoordinate",
  "storageKey": null
},
v44 = [
  (v3/*: any*/),
  (v41/*: any*/),
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tendersIdPageQuery",
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
              (v2/*: any*/),
              (v4/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TenderProfile",
                "kind": "LinkedField",
                "name": "activeProfile",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                  (v33/*: any*/),
                  (v34/*: any*/),
                  (v35/*: any*/),
                  (v36/*: any*/),
                  (v37/*: any*/),
                  (v38/*: any*/),
                  (v39/*: any*/),
                  (v40/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "province",
                    "plural": false,
                    "selections": [
                      (v41/*: any*/),
                      (v3/*: any*/)
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
                    "selections": (v42/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "District",
                    "kind": "LinkedField",
                    "name": "district",
                    "plural": false,
                    "selections": (v42/*: any*/),
                    "storageKey": null
                  },
                  (v43/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Tender",
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
    "name": "tendersIdPageQuery",
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
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "TenderProfile",
                "kind": "LinkedField",
                "name": "activeProfile",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
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
                  (v33/*: any*/),
                  (v34/*: any*/),
                  (v35/*: any*/),
                  (v36/*: any*/),
                  (v37/*: any*/),
                  (v38/*: any*/),
                  (v39/*: any*/),
                  (v40/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Province",
                    "kind": "LinkedField",
                    "name": "province",
                    "plural": false,
                    "selections": [
                      (v41/*: any*/),
                      (v3/*: any*/),
                      (v2/*: any*/)
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
                    "selections": (v44/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "District",
                    "kind": "LinkedField",
                    "name": "district",
                    "plural": false,
                    "selections": (v44/*: any*/),
                    "storageKey": null
                  },
                  (v43/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Tender",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "54711585823931c1171338863cec2d53",
    "id": null,
    "metadata": {},
    "name": "tendersIdPageQuery",
    "operationKind": "query",
    "text": "query tendersIdPageQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on Tender {\n      id\n      area {\n        id\n        code\n        name\n      }\n      followingSales {\n        id\n        name\n      }\n      activeProfile {\n        name\n        status\n        createdAt\n        estimatedAmount\n        customer {\n          id\n          name\n          ownerType\n          area {\n            id\n            name\n          }\n        }\n        images\n        fullAddress\n        tenderDate\n        discoveryDate\n        contractor\n        designUnit\n        tenderForm\n        keyProject\n        contractForm\n        tenderingAgency\n        consultingFirm\n        facadeConsultant\n        timeLimitRating\n        sizeAndValueRating\n        creditAndPaymentRating\n        customerRelationshipRating\n        competitivePartnershipRating\n        timeLimitRatingOverview\n        sizeAndValueRatingOverview\n        creditAndPaymentRatingOverview\n        customerRelationshipRatingOverview\n        competitivePartnershipRatingOverview\n        tenderWinCompany\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        tenderWinAmount\n        tenderWinDate\n        province {\n          adcode\n          name\n          id\n        }\n        city {\n          name\n          adcode\n          id\n        }\n        district {\n          name\n          adcode\n          id\n        }\n        geoCoordinate\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5fc9ce7c6b246da4fdd590f6886c715";

export default node;

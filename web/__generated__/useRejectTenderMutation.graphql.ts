/**
 * @generated SignedSource<<d36f3652e1a1a03f9c5d916b0887dde5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useRejectTenderMutation$variables = {
  id: string;
};
export type useRejectTenderMutation$data = {
  readonly rejectTender: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
  };
};
export type useRejectTenderMutation = {
  response: useRejectTenderMutation$data;
  variables: useRejectTenderMutation$variables;
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
  "name": "code",
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
  (v2/*: any*/),
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
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedAmount",
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
  "name": "address",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fullAddress",
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
  "name": "prepareToBid",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectCode",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectDefinition",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "projectType",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectStartDate",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "estimatedProjectEndDate",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "levelInvolved",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "costEngineer",
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
  "name": "sizeAndValueRatingOverview",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRating",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creditAndPaymentRatingOverview",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRating",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeLimitRatingOverview",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "customerRelationshipRating",
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
  "name": "competitivePartnershipRating",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitivePartnershipRatingOverview",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderSituations",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerSituations",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingInstructions",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "competitorSituations",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderForm",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractForm",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "managementCompany",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderingAgency",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "biddingDate",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "facadeConsultant",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designUnit",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultingFirm",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "keyProject",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentProgress",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinCompany",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinDate",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderWinAmount",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderAmount",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastTenderAmount",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "attachments",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderCode",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "developer",
  "storageKey": null
},
v56 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "architect",
  "storageKey": null
},
v57 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tenderClosingDate",
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "constructionArea",
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "remark",
  "storageKey": null
},
v60 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "images",
  "storageKey": null
},
v61 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "geoCoordinate",
  "storageKey": null
},
v62 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v63 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "finder",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v64 = {
  "alias": null,
  "args": null,
  "concreteType": "Customer",
  "kind": "LinkedField",
  "name": "customer",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ownerType",
      "storageKey": null
    },
    (v4/*: any*/)
  ],
  "storageKey": null
},
v65 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v4/*: any*/)
],
v66 = {
  "alias": null,
  "args": null,
  "concreteType": "Province",
  "kind": "LinkedField",
  "name": "province",
  "plural": false,
  "selections": (v65/*: any*/),
  "storageKey": null
},
v67 = {
  "alias": null,
  "args": null,
  "concreteType": "City",
  "kind": "LinkedField",
  "name": "city",
  "plural": false,
  "selections": (v65/*: any*/),
  "storageKey": null
},
v68 = {
  "alias": null,
  "args": null,
  "concreteType": "District",
  "kind": "LinkedField",
  "name": "district",
  "plural": false,
  "selections": (v65/*: any*/),
  "storageKey": null
},
v69 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "classify",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useRejectTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "rejectTender",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "tenderDetailFragment"
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
    "name": "useRejectTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "rejectTender",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "followingSales",
            "plural": true,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderCompetitor",
            "kind": "LinkedField",
            "name": "competitors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Competitor",
                "kind": "LinkedField",
                "name": "competitor",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v4/*: any*/),
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
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v62/*: any*/),
              (v63/*: any*/),
              (v64/*: any*/),
              (v66/*: any*/),
              (v67/*: any*/),
              (v68/*: any*/),
              (v69/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "createdBy",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "leader",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/),
              (v4/*: any*/),
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
              (v51/*: any*/),
              (v52/*: any*/),
              (v53/*: any*/),
              (v54/*: any*/),
              (v55/*: any*/),
              (v56/*: any*/),
              (v57/*: any*/),
              (v58/*: any*/),
              (v59/*: any*/),
              (v60/*: any*/),
              (v61/*: any*/),
              (v63/*: any*/),
              (v64/*: any*/),
              (v66/*: any*/),
              (v67/*: any*/),
              (v68/*: any*/),
              (v69/*: any*/)
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
            "concreteType": "TenderProfileConnection",
            "kind": "LinkedField",
            "name": "profiles",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TenderProfileEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TenderProfile",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "approvalDate",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v4/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v51/*: any*/),
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
                      (v52/*: any*/),
                      (v53/*: any*/),
                      (v54/*: any*/),
                      (v55/*: any*/),
                      (v56/*: any*/),
                      (v57/*: any*/),
                      (v58/*: any*/),
                      (v59/*: any*/),
                      (v60/*: any*/),
                      (v61/*: any*/),
                      (v62/*: any*/),
                      (v63/*: any*/),
                      (v64/*: any*/),
                      (v66/*: any*/),
                      (v67/*: any*/),
                      (v68/*: any*/),
                      (v69/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f6b73d1ffc4730c2a9581760192f22b",
    "id": null,
    "metadata": {},
    "name": "useRejectTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useRejectTenderMutation(\n  $id: ID!\n) {\n  rejectTender(id: $id) {\n    ...tenderDetailFragment\n    id\n  }\n}\n\nfragment tenderDetailFragment on Tender {\n  id\n  code\n  area {\n    id\n    code\n    name\n  }\n  followingSales {\n    id\n    name\n  }\n  competitors {\n    amount\n    competitor {\n      id\n      name\n    }\n    id\n  }\n  activeProfile {\n    id\n    createdAt\n    updatedAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectDefinition\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    tenderAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  pendingProfile {\n    id\n    createdAt\n    createdBy {\n      id\n      leader {\n        id\n      }\n      name\n    }\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectDefinition\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    tenderAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        createdAt\n        approvalStatus\n        approvalDate\n        approver {\n          id\n          name\n        }\n        name\n        status\n        estimatedAmount\n        tenderDate\n        discoveryDate\n        address\n        fullAddress\n        contractor\n        prepareToBid\n        tenderAmount\n        projectCode\n        projectDefinition\n        projectType\n        estimatedProjectStartDate\n        estimatedProjectEndDate\n        levelInvolved\n        costEngineer\n        sizeAndValueRating\n        sizeAndValueRatingOverview\n        creditAndPaymentRating\n        creditAndPaymentRatingOverview\n        timeLimitRating\n        timeLimitRatingOverview\n        customerRelationshipRating\n        customerRelationshipRatingOverview\n        competitivePartnershipRating\n        competitivePartnershipRatingOverview\n        tenderSituations\n        ownerSituations\n        biddingInstructions\n        competitorSituations\n        tenderForm\n        contractForm\n        managementCompany\n        tenderingAgency\n        biddingDate\n        facadeConsultant\n        designUnit\n        consultingFirm\n        keyProject\n        currentProgress\n        tenderWinCompany\n        tenderWinDate\n        tenderWinAmount\n        lastTenderAmount\n        attachments\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        remark\n        images\n        geoCoordinate\n        createdBy {\n          id\n          name\n        }\n        finder {\n          id\n          name\n        }\n        customer {\n          id\n          ownerType\n          name\n        }\n        province {\n          id\n          adcode\n          name\n        }\n        city {\n          id\n          adcode\n          name\n        }\n        district {\n          id\n          adcode\n          name\n        }\n        classify\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ff4016894eae26e3fddfdd1eacb9f3e6";

export default node;

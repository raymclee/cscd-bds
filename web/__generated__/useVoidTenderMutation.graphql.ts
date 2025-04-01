/**
 * @generated SignedSource<<713e986cb5d4ba137b9e072a3e48980e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useVoidTenderMutation$variables = {
  id: string;
};
export type useVoidTenderMutation$data = {
  readonly voidTender: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
  };
};
export type useVoidTenderMutation = {
  response: useVoidTenderMutation$data;
  variables: useVoidTenderMutation$variables;
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
v6 = [
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
v7 = [
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
    "kind": "ScalarField",
    "name": "approvalStatus",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "approver",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  },
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  },
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
    "name": "address",
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
    "name": "contractor",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "prepareToBid",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "projectCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "projectType",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "estimatedProjectStartDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "estimatedProjectEndDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "levelInvolved",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "costEngineer",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "sizeAndValueRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "sizeAndValueRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "creditAndPaymentRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "creditAndPaymentRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timeLimitRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "timeLimitRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "customerRelationshipRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "customerRelationshipRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitivePartnershipRating",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitivePartnershipRatingOverview",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ownerSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "biddingInstructions",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "competitorSituations",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderForm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "contractForm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "managementCompany",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderingAgency",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "biddingDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "facadeConsultant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "designUnit",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "consultingFirm",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "keyProject",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currentProgress",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinCompany",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinDate",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderWinAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastTenderAmount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "attachments",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "tenderCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "developer",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "architect",
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
    "kind": "ScalarField",
    "name": "constructionArea",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "remark",
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
    "name": "geoCoordinate",
    "storageKey": null
  },
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "finder",
    "plural": false,
    "selections": (v5/*: any*/),
    "storageKey": null
  },
  {
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
  {
    "alias": null,
    "args": null,
    "concreteType": "Province",
    "kind": "LinkedField",
    "name": "province",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "City",
    "kind": "LinkedField",
    "name": "city",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "District",
    "kind": "LinkedField",
    "name": "district",
    "plural": false,
    "selections": (v6/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "classify",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useVoidTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "voidTender",
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
    "name": "useVoidTenderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "voidTender",
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
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": (v7/*: any*/),
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
                    "selections": (v7/*: any*/),
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
    "cacheID": "8801e53741b9f4bd2907b0c63af959b7",
    "id": null,
    "metadata": {},
    "name": "useVoidTenderMutation",
    "operationKind": "mutation",
    "text": "mutation useVoidTenderMutation(\n  $id: ID!\n) {\n  voidTender(id: $id) {\n    ...tenderDetailFragment\n    id\n  }\n}\n\nfragment tenderDetailFragment on Tender {\n  id\n  code\n  area {\n    id\n    code\n    name\n  }\n  followingSales {\n    id\n    name\n  }\n  activeProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  pendingProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        createdAt\n        approvalStatus\n        approver {\n          id\n          name\n        }\n        name\n        status\n        estimatedAmount\n        tenderDate\n        discoveryDate\n        address\n        fullAddress\n        contractor\n        prepareToBid\n        projectCode\n        projectType\n        estimatedProjectStartDate\n        estimatedProjectEndDate\n        levelInvolved\n        costEngineer\n        sizeAndValueRating\n        sizeAndValueRatingOverview\n        creditAndPaymentRating\n        creditAndPaymentRatingOverview\n        timeLimitRating\n        timeLimitRatingOverview\n        customerRelationshipRating\n        customerRelationshipRatingOverview\n        competitivePartnershipRating\n        competitivePartnershipRatingOverview\n        tenderSituations\n        ownerSituations\n        biddingInstructions\n        competitorSituations\n        tenderForm\n        contractForm\n        managementCompany\n        tenderingAgency\n        biddingDate\n        facadeConsultant\n        designUnit\n        consultingFirm\n        keyProject\n        currentProgress\n        tenderWinCompany\n        tenderWinDate\n        tenderWinAmount\n        lastTenderAmount\n        attachments\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        remark\n        images\n        geoCoordinate\n        createdBy {\n          id\n          name\n        }\n        finder {\n          id\n          name\n        }\n        customer {\n          id\n          ownerType\n          name\n        }\n        province {\n          id\n          adcode\n          name\n        }\n        city {\n          id\n          adcode\n          name\n        }\n        district {\n          id\n          adcode\n          name\n        }\n        classify\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9700b1bcb80dfd90434387df546a9e7d";

export default node;

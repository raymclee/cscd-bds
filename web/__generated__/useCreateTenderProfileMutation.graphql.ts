/**
 * @generated SignedSource<<d739118472006a928dfd1013c0765297>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateTenderProfileInput = {
  address?: string | null | undefined;
  approvalMsgID?: string | null | undefined;
  approvalStatus?: number | null | undefined;
  approverID?: string | null | undefined;
  architect?: string | null | undefined;
  attachments?: ReadonlyArray<string> | null | undefined;
  biddingDate?: any | null | undefined;
  biddingInstructions?: string | null | undefined;
  cityID?: string | null | undefined;
  classify?: number | null | undefined;
  competitivePartnershipRating?: number | null | undefined;
  competitivePartnershipRatingOverview?: string | null | undefined;
  competitorSituations?: string | null | undefined;
  constructionArea?: string | null | undefined;
  consultingFirm?: string | null | undefined;
  contractForm?: string | null | undefined;
  contractor?: string | null | undefined;
  costEngineer?: string | null | undefined;
  createdAt?: any | null | undefined;
  createdByID?: string | null | undefined;
  creditAndPaymentRating?: number | null | undefined;
  creditAndPaymentRatingOverview?: string | null | undefined;
  currentProgress?: string | null | undefined;
  customerID?: string | null | undefined;
  customerRelationshipRating?: number | null | undefined;
  customerRelationshipRatingOverview?: string | null | undefined;
  designUnit?: string | null | undefined;
  developer?: string | null | undefined;
  discoveryDate: any;
  districtID?: string | null | undefined;
  estimatedAmount?: number | null | undefined;
  estimatedProjectEndDate?: any | null | undefined;
  estimatedProjectStartDate?: any | null | undefined;
  facadeConsultant?: string | null | undefined;
  finderID?: string | null | undefined;
  fullAddress?: string | null | undefined;
  geoCoordinate?: ReadonlyArray<number> | null | undefined;
  images?: ReadonlyArray<string> | null | undefined;
  keyProject?: boolean | null | undefined;
  lastTenderAmount?: number | null | undefined;
  levelInvolved?: number | null | undefined;
  managementCompany?: string | null | undefined;
  name: string;
  ownerSituations?: string | null | undefined;
  prepareToBid?: boolean | null | undefined;
  projectCode?: string | null | undefined;
  projectDefinition?: string | null | undefined;
  projectType?: string | null | undefined;
  provinceID?: string | null | undefined;
  remark?: string | null | undefined;
  sizeAndValueRating?: number | null | undefined;
  sizeAndValueRatingOverview?: string | null | undefined;
  status?: number | null | undefined;
  tenderClosingDate?: any | null | undefined;
  tenderCode?: string | null | undefined;
  tenderDate?: any | null | undefined;
  tenderForm?: string | null | undefined;
  tenderID: string;
  tenderSituations?: string | null | undefined;
  tenderWinAmount?: number | null | undefined;
  tenderWinCompany?: string | null | undefined;
  tenderWinDate?: any | null | undefined;
  tenderingAgency?: string | null | undefined;
  timeLimitRating?: number | null | undefined;
  timeLimitRatingOverview?: string | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useCreateTenderProfileMutation$variables = {
  attachmentFileNames: ReadonlyArray<string>;
  id: string;
  imageFileNames: ReadonlyArray<string>;
  input: CreateTenderProfileInput;
};
export type useCreateTenderProfileMutation$data = {
  readonly createTenderProfile: {
    readonly " $fragmentSpreads": FragmentRefs<"tenderDetailFragment">;
  };
};
export type useCreateTenderProfileMutation = {
  response: useCreateTenderProfileMutation$data;
  variables: useCreateTenderProfileMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "attachmentFileNames"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "imageFileNames"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v4 = [
  {
    "kind": "Variable",
    "name": "attachmentFileNames",
    "variableName": "attachmentFileNames"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "imageFileNames",
    "variableName": "imageFileNames"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "code",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = [
  (v5/*: any*/),
  (v7/*: any*/)
],
v9 = [
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "adcode",
    "storageKey": null
  },
  (v7/*: any*/)
],
v10 = [
  (v5/*: any*/),
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
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  (v7/*: any*/),
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
    "selections": (v8/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "finder",
    "plural": false,
    "selections": (v8/*: any*/),
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
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownerType",
        "storageKey": null
      },
      (v7/*: any*/)
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
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "City",
    "kind": "LinkedField",
    "name": "city",
    "plural": false,
    "selections": (v9/*: any*/),
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "District",
    "kind": "LinkedField",
    "name": "district",
    "plural": false,
    "selections": (v9/*: any*/),
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateTenderProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "createTenderProfile",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateTenderProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Tender",
        "kind": "LinkedField",
        "name": "createTenderProfile",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "area",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
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
            "selections": (v8/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "activeProfile",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "TenderProfile",
            "kind": "LinkedField",
            "name": "pendingProfile",
            "plural": false,
            "selections": (v10/*: any*/),
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
                    "selections": (v10/*: any*/),
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
    "cacheID": "ca7424e4306e453c7b20f31fd5194f8b",
    "id": null,
    "metadata": {},
    "name": "useCreateTenderProfileMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateTenderProfileMutation(\n  $id: ID!\n  $input: CreateTenderProfileInput!\n  $imageFileNames: [String!]!\n  $attachmentFileNames: [String!]!\n) {\n  createTenderProfile(id: $id, input: $input, imageFileNames: $imageFileNames, attachmentFileNames: $attachmentFileNames) {\n    ...tenderDetailFragment\n    id\n  }\n}\n\nfragment tenderDetailFragment on Tender {\n  id\n  code\n  area {\n    id\n    code\n    name\n  }\n  followingSales {\n    id\n    name\n  }\n  activeProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  pendingProfile {\n    id\n    createdAt\n    approvalStatus\n    approver {\n      id\n      name\n    }\n    name\n    status\n    estimatedAmount\n    tenderDate\n    discoveryDate\n    address\n    fullAddress\n    contractor\n    prepareToBid\n    projectCode\n    projectType\n    estimatedProjectStartDate\n    estimatedProjectEndDate\n    levelInvolved\n    costEngineer\n    sizeAndValueRating\n    sizeAndValueRatingOverview\n    creditAndPaymentRating\n    creditAndPaymentRatingOverview\n    timeLimitRating\n    timeLimitRatingOverview\n    customerRelationshipRating\n    customerRelationshipRatingOverview\n    competitivePartnershipRating\n    competitivePartnershipRatingOverview\n    tenderSituations\n    ownerSituations\n    biddingInstructions\n    competitorSituations\n    tenderForm\n    contractForm\n    managementCompany\n    tenderingAgency\n    biddingDate\n    facadeConsultant\n    designUnit\n    consultingFirm\n    keyProject\n    currentProgress\n    tenderWinCompany\n    tenderWinDate\n    tenderWinAmount\n    lastTenderAmount\n    attachments\n    tenderCode\n    developer\n    architect\n    tenderClosingDate\n    constructionArea\n    remark\n    images\n    geoCoordinate\n    createdBy {\n      id\n      name\n    }\n    finder {\n      id\n      name\n    }\n    customer {\n      id\n      ownerType\n      name\n    }\n    province {\n      id\n      adcode\n      name\n    }\n    city {\n      id\n      adcode\n      name\n    }\n    district {\n      id\n      adcode\n      name\n    }\n    classify\n  }\n  profiles(orderBy: [{field: CREATED_AT, direction: DESC}]) {\n    edges {\n      node {\n        id\n        createdAt\n        approvalStatus\n        approver {\n          id\n          name\n        }\n        name\n        status\n        estimatedAmount\n        tenderDate\n        discoveryDate\n        address\n        fullAddress\n        contractor\n        prepareToBid\n        projectCode\n        projectType\n        estimatedProjectStartDate\n        estimatedProjectEndDate\n        levelInvolved\n        costEngineer\n        sizeAndValueRating\n        sizeAndValueRatingOverview\n        creditAndPaymentRating\n        creditAndPaymentRatingOverview\n        timeLimitRating\n        timeLimitRatingOverview\n        customerRelationshipRating\n        customerRelationshipRatingOverview\n        competitivePartnershipRating\n        competitivePartnershipRatingOverview\n        tenderSituations\n        ownerSituations\n        biddingInstructions\n        competitorSituations\n        tenderForm\n        contractForm\n        managementCompany\n        tenderingAgency\n        biddingDate\n        facadeConsultant\n        designUnit\n        consultingFirm\n        keyProject\n        currentProgress\n        tenderWinCompany\n        tenderWinDate\n        tenderWinAmount\n        lastTenderAmount\n        attachments\n        tenderCode\n        developer\n        architect\n        tenderClosingDate\n        constructionArea\n        remark\n        images\n        geoCoordinate\n        createdBy {\n          id\n          name\n        }\n        finder {\n          id\n          name\n        }\n        customer {\n          id\n          ownerType\n          name\n        }\n        province {\n          id\n          adcode\n          name\n        }\n        city {\n          id\n          adcode\n          name\n        }\n        district {\n          id\n          adcode\n          name\n        }\n        classify\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b81a211ab9a26c42709e9fc1c3685fc";

export default node;

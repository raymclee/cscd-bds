/**
 * @generated SignedSource<<da68cc526be3696f8412c18abf344993>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type operationsIndexPageQuery$variables = {
  userId: string;
};
export type operationsIndexPageQuery$data = {
  readonly node: {
    readonly projects?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly accumulatedNonStatutoryDeductions: number | null | undefined;
          readonly accumulatedNonStatutoryDeductionsPeriod: number | null | undefined;
          readonly accumulatedStatutoryDeductions: number | null | undefined;
          readonly aluminumBudgetPercentage: number | null | undefined;
          readonly aluminumPlateBudgetPercentage: number | null | undefined;
          readonly areas: string | null | undefined;
          readonly bulkMaterialsCompletedQuantity: number | null | undefined;
          readonly bulkMaterialsTotalOrderQuantity: number | null | undefined;
          readonly bulkMaterialsUncompletedQuantity: number | null | undefined;
          readonly cje: number | null | undefined;
          readonly code: string;
          readonly conType: string | null | undefined;
          readonly consultant: string | null | undefined;
          readonly contractorApplyAmount: number | null | undefined;
          readonly contractorApplyCount: number | null | undefined;
          readonly contractorApproveAmount: number | null | undefined;
          readonly contractorApproveCount: number | null | undefined;
          readonly designRatedWeight: number | null | undefined;
          readonly diagramBdFinishCount: number | null | undefined;
          readonly diagramBdTotalCount: number | null | undefined;
          readonly diagramCApprovalRatioDenominator: number | null | undefined;
          readonly diagramCApprovalRatioNumerator: number | null | undefined;
          readonly diagramConstructionFinishCount: number | null | undefined;
          readonly diagramConstructionTotalCount: number | null | undefined;
          readonly diagramProcessingFinishCount: number | null | undefined;
          readonly diagramProcessingTotalCount: number | null | undefined;
          readonly effectiveContractAmount: number | null | undefined;
          readonly endDate: any | null | undefined;
          readonly fsDate: any | null | undefined;
          readonly glassBudgetPercentage: number | null | undefined;
          readonly id: string;
          readonly installProgress: number | null | undefined;
          readonly ironBudgetPercentage: number | null | undefined;
          readonly itemStockWeight: number | null | undefined;
          readonly jzs: string | null | undefined;
          readonly manager: string | null | undefined;
          readonly materialLoss: number | null | undefined;
          readonly mcn: string | null | undefined;
          readonly milestoneDoneMonth: number | null | undefined;
          readonly milestoneDoneYear: number | null | undefined;
          readonly milestonePlanMonth: number | null | undefined;
          readonly milestonePlanYear: number | null | undefined;
          readonly mntyr: string | null | undefined;
          readonly name: string | null | undefined;
          readonly opDate: any | null | undefined;
          readonly owner: string | null | undefined;
          readonly ownerApplyAmount: number | null | undefined;
          readonly ownerApplyCount: number | null | undefined;
          readonly ownerApproveAmount: number | null | undefined;
          readonly ownerApproveCount: number | null | undefined;
          readonly palletsInStock: number | null | undefined;
          readonly partsInStock: number | null | undefined;
          readonly planOverdueCount: number | null | undefined;
          readonly planOverdueMonthCount: number | null | undefined;
          readonly planTotalCount: number | null | undefined;
          readonly pmArea: number | null | undefined;
          readonly pmMonthActual: number | null | undefined;
          readonly pmMonthTarget: number | null | undefined;
          readonly pmTotal: number | null | undefined;
          readonly pmYearActual: number | null | undefined;
          readonly pmYearTarget: number | null | undefined;
          readonly pmYesterday: number | null | undefined;
          readonly processingWeight: number | null | undefined;
          readonly projectStaffs: {
            readonly edges: ReadonlyArray<{
              readonly node: {
                readonly createdAt: any;
                readonly design: number | null | undefined;
                readonly installation: number | null | undefined;
                readonly management: number | null | undefined;
              } | null | undefined;
            } | null | undefined> | null | undefined;
          };
          readonly qualityRanking: number | null | undefined;
          readonly qualityScore: number | null | undefined;
          readonly startDate: any | null | undefined;
          readonly totalContractAmount: number | null | undefined;
          readonly unitComponentInstallation: number | null | undefined;
          readonly unitComponentProduction: number | null | undefined;
          readonly unitComponentTotal: number | null | undefined;
          readonly unitInventoryTotal: number | null | undefined;
          readonly vaApplyAmount: number | null | undefined;
          readonly vaApproveAmount: number | null | undefined;
          readonly xjl: number | null | undefined;
          readonly xmglfLj: number | null | undefined;
          readonly xmglfYs: number | null | undefined;
          readonly xmsjf: number | null | undefined;
          readonly yye: number | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    };
  } | null | undefined;
};
export type operationsIndexPageQuery = {
  response: operationsIndexPageQuery$data;
  variables: operationsIndexPageQuery$variables;
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
v2 = [
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": [
      {
        "field": "CODE"
      }
    ]
  },
  {
    "kind": "Literal",
    "name": "where",
    "value": {
      "isFinishedNEQ": true
    }
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "manager",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "owner",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jzs",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mcn",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultant",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "areas",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fsDate",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "opDate",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mntyr",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conType",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cje",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "yye",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "xjl",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "xmglfYs",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "xmglfLj",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "xmsjf",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApplyCount",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApplyAmount",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveCount",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveAmount",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyCount",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyAmount",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveCount",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveAmount",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "installProgress",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "effectiveContractAmount",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApplyAmount",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApproveAmount",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedStatutoryDeductions",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductions",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductionsPeriod",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalContractAmount",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aluminumPlateBudgetPercentage",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aluminumBudgetPercentage",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "glassBudgetPercentage",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ironBudgetPercentage",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "milestonePlanYear",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "milestonePlanMonth",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "milestoneDoneYear",
  "storageKey": null
},
v47 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "milestoneDoneMonth",
  "storageKey": null
},
v48 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmArea",
  "storageKey": null
},
v49 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmYearTarget",
  "storageKey": null
},
v50 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmMonthTarget",
  "storageKey": null
},
v51 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmYearActual",
  "storageKey": null
},
v52 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmMonthActual",
  "storageKey": null
},
v53 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmTotal",
  "storageKey": null
},
v54 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "pmYesterday",
  "storageKey": null
},
v55 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitInventoryTotal",
  "storageKey": null
},
v56 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitComponentTotal",
  "storageKey": null
},
v57 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitComponentProduction",
  "storageKey": null
},
v58 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unitComponentInstallation",
  "storageKey": null
},
v59 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "materialLoss",
  "storageKey": null
},
v60 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "designRatedWeight",
  "storageKey": null
},
v61 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "processingWeight",
  "storageKey": null
},
v62 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "itemStockWeight",
  "storageKey": null
},
v63 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "palletsInStock",
  "storageKey": null
},
v64 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "partsInStock",
  "storageKey": null
},
v65 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualityScore",
  "storageKey": null
},
v66 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qualityRanking",
  "storageKey": null
},
v67 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bulkMaterialsTotalOrderQuantity",
  "storageKey": null
},
v68 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bulkMaterialsCompletedQuantity",
  "storageKey": null
},
v69 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bulkMaterialsUncompletedQuantity",
  "storageKey": null
},
v70 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "planTotalCount",
  "storageKey": null
},
v71 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "planOverdueCount",
  "storageKey": null
},
v72 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "planOverdueMonthCount",
  "storageKey": null
},
v73 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramBdTotalCount",
  "storageKey": null
},
v74 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramBdFinishCount",
  "storageKey": null
},
v75 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramConstructionTotalCount",
  "storageKey": null
},
v76 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramConstructionFinishCount",
  "storageKey": null
},
v77 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramProcessingFinishCount",
  "storageKey": null
},
v78 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramProcessingTotalCount",
  "storageKey": null
},
v79 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramCApprovalRatioNumerator",
  "storageKey": null
},
v80 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "diagramCApprovalRatioDenominator",
  "storageKey": null
},
v81 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  {
    "kind": "Literal",
    "name": "orderBy",
    "value": {
      "direction": "DESC",
      "field": "CREATED_AT"
    }
  }
],
v82 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "installation",
  "storageKey": null
},
v83 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "management",
  "storageKey": null
},
v84 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "design",
  "storageKey": null
},
v85 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "operationsIndexPageQuery",
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
                "args": (v2/*: any*/),
                "concreteType": "ProjectConnection",
                "kind": "LinkedField",
                "name": "projects",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Project",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                          (v65/*: any*/),
                          (v66/*: any*/),
                          (v67/*: any*/),
                          (v68/*: any*/),
                          (v69/*: any*/),
                          (v70/*: any*/),
                          (v71/*: any*/),
                          (v72/*: any*/),
                          (v73/*: any*/),
                          (v74/*: any*/),
                          (v75/*: any*/),
                          (v76/*: any*/),
                          (v77/*: any*/),
                          (v78/*: any*/),
                          (v79/*: any*/),
                          (v80/*: any*/),
                          {
                            "alias": null,
                            "args": (v81/*: any*/),
                            "concreteType": "ProjectStaffConnection",
                            "kind": "LinkedField",
                            "name": "projectStaffs",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ProjectStaffEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ProjectStaff",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v82/*: any*/),
                                      (v83/*: any*/),
                                      (v84/*: any*/),
                                      (v85/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "projectStaffs(first:3,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "projects(orderBy:[{\"field\":\"CODE\"}],where:{\"isFinishedNEQ\":true})"
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
    "name": "operationsIndexPageQuery",
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
                "args": (v2/*: any*/),
                "concreteType": "ProjectConnection",
                "kind": "LinkedField",
                "name": "projects",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ProjectEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Project",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/),
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
                          (v65/*: any*/),
                          (v66/*: any*/),
                          (v67/*: any*/),
                          (v68/*: any*/),
                          (v69/*: any*/),
                          (v70/*: any*/),
                          (v71/*: any*/),
                          (v72/*: any*/),
                          (v73/*: any*/),
                          (v74/*: any*/),
                          (v75/*: any*/),
                          (v76/*: any*/),
                          (v77/*: any*/),
                          (v78/*: any*/),
                          (v79/*: any*/),
                          (v80/*: any*/),
                          {
                            "alias": null,
                            "args": (v81/*: any*/),
                            "concreteType": "ProjectStaffConnection",
                            "kind": "LinkedField",
                            "name": "projectStaffs",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ProjectStaffEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ProjectStaff",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v82/*: any*/),
                                      (v83/*: any*/),
                                      (v84/*: any*/),
                                      (v85/*: any*/),
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "projectStaffs(first:3,orderBy:{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"})"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "projects(orderBy:[{\"field\":\"CODE\"}],where:{\"isFinishedNEQ\":true})"
              }
            ],
            "type": "User",
            "abstractKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a243c83b068cc27bfd14b5e4aa7a3925",
    "id": null,
    "metadata": {},
    "name": "operationsIndexPageQuery",
    "operationKind": "query",
    "text": "query operationsIndexPageQuery(\n  $userId: ID!\n) {\n  node(id: $userId) {\n    __typename\n    ... on User {\n      projects(where: {isFinishedNEQ: true}, orderBy: [{field: CODE}]) {\n        edges {\n          node {\n            id\n            name\n            code\n            manager\n            owner\n            jzs\n            mcn\n            consultant\n            areas\n            fsDate\n            opDate\n            startDate\n            endDate\n            mntyr\n            conType\n            cje\n            yye\n            xjl\n            xmglfYs\n            xmglfLj\n            xmsjf\n            ownerApplyCount\n            ownerApplyAmount\n            ownerApproveCount\n            ownerApproveAmount\n            contractorApplyCount\n            contractorApplyAmount\n            contractorApproveCount\n            contractorApproveAmount\n            installProgress\n            effectiveContractAmount\n            vaApplyAmount\n            vaApproveAmount\n            accumulatedStatutoryDeductions\n            accumulatedNonStatutoryDeductions\n            accumulatedNonStatutoryDeductionsPeriod\n            totalContractAmount\n            aluminumPlateBudgetPercentage\n            aluminumBudgetPercentage\n            glassBudgetPercentage\n            ironBudgetPercentage\n            milestonePlanYear\n            milestonePlanMonth\n            milestoneDoneYear\n            milestoneDoneMonth\n            pmArea\n            pmYearTarget\n            pmMonthTarget\n            pmYearActual\n            pmMonthActual\n            pmTotal\n            pmYesterday\n            unitInventoryTotal\n            unitComponentTotal\n            unitComponentProduction\n            unitComponentInstallation\n            materialLoss\n            designRatedWeight\n            processingWeight\n            itemStockWeight\n            palletsInStock\n            partsInStock\n            qualityScore\n            qualityRanking\n            bulkMaterialsTotalOrderQuantity\n            bulkMaterialsCompletedQuantity\n            bulkMaterialsUncompletedQuantity\n            planTotalCount\n            planOverdueCount\n            planOverdueMonthCount\n            diagramBdTotalCount\n            diagramBdFinishCount\n            diagramConstructionTotalCount\n            diagramConstructionFinishCount\n            diagramProcessingFinishCount\n            diagramProcessingTotalCount\n            diagramCApprovalRatioNumerator\n            diagramCApprovalRatioDenominator\n            projectStaffs(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {\n              edges {\n                node {\n                  installation\n                  management\n                  design\n                  createdAt\n                  id\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c97d79588c075d0aecc001b8838409eb";

export default node;

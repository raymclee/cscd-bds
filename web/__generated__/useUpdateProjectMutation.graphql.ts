/**
 * @generated SignedSource<<f90a58b9f1fcea23ed4d3f9eea2376df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateProjectInput = {
  accumulatedNonStatutoryDeductions?: number | null | undefined;
  accumulatedNonStatutoryDeductionsPeriod?: number | null | undefined;
  accumulatedStatutoryDeductions?: number | null | undefined;
  accumulatedStatutoryDeductionsPeriod?: number | null | undefined;
  addProjectStaffIDs?: ReadonlyArray<string> | null | undefined;
  addVoIDs?: ReadonlyArray<string> | null | undefined;
  aluminumBudgetPercentage?: number | null | undefined;
  aluminumPlateBudgetPercentage?: number | null | undefined;
  areas?: string | null | undefined;
  bulkMaterialsCompletedQuantity?: number | null | undefined;
  bulkMaterialsTotalOrderQuantity?: number | null | undefined;
  bulkMaterialsUncompletedQuantity?: number | null | undefined;
  cje?: number | null | undefined;
  clearAccumulatedNonStatutoryDeductions?: boolean | null | undefined;
  clearAccumulatedNonStatutoryDeductionsPeriod?: boolean | null | undefined;
  clearAccumulatedStatutoryDeductions?: boolean | null | undefined;
  clearAccumulatedStatutoryDeductionsPeriod?: boolean | null | undefined;
  clearAluminumBudgetPercentage?: boolean | null | undefined;
  clearAluminumPlateBudgetPercentage?: boolean | null | undefined;
  clearAreas?: boolean | null | undefined;
  clearBulkMaterialsCompletedQuantity?: boolean | null | undefined;
  clearBulkMaterialsTotalOrderQuantity?: boolean | null | undefined;
  clearBulkMaterialsUncompletedQuantity?: boolean | null | undefined;
  clearCje?: boolean | null | undefined;
  clearConType?: boolean | null | undefined;
  clearConsultant?: boolean | null | undefined;
  clearContractorApplyAmount?: boolean | null | undefined;
  clearContractorApplyCount?: boolean | null | undefined;
  clearContractorApproveAmount?: boolean | null | undefined;
  clearContractorApproveCount?: boolean | null | undefined;
  clearDesignRatedWeight?: boolean | null | undefined;
  clearEffectiveContractAmount?: boolean | null | undefined;
  clearEndDate?: boolean | null | undefined;
  clearFsDate?: boolean | null | undefined;
  clearGlassBudgetPercentage?: boolean | null | undefined;
  clearInstallProgress?: boolean | null | undefined;
  clearIronBudgetPercentage?: boolean | null | undefined;
  clearItemStockWeight?: boolean | null | undefined;
  clearJzs?: boolean | null | undefined;
  clearManager?: boolean | null | undefined;
  clearMaterialLoss?: boolean | null | undefined;
  clearMcn?: boolean | null | undefined;
  clearMilestoneDoneMonth?: boolean | null | undefined;
  clearMilestoneDoneYear?: boolean | null | undefined;
  clearMilestonePlanMonth?: boolean | null | undefined;
  clearMilestonePlanYear?: boolean | null | undefined;
  clearMntyr?: boolean | null | undefined;
  clearName?: boolean | null | undefined;
  clearOpDate?: boolean | null | undefined;
  clearOwner?: boolean | null | undefined;
  clearOwnerApplyAmount?: boolean | null | undefined;
  clearOwnerApplyCount?: boolean | null | undefined;
  clearOwnerApproveAmount?: boolean | null | undefined;
  clearOwnerApproveCount?: boolean | null | undefined;
  clearPalletsInStock?: boolean | null | undefined;
  clearPartsInStock?: boolean | null | undefined;
  clearPlanOverdueCount?: boolean | null | undefined;
  clearPlanOverdueMonthCount?: boolean | null | undefined;
  clearPlanTotalCount?: boolean | null | undefined;
  clearPmArea?: boolean | null | undefined;
  clearPmMonthActual?: boolean | null | undefined;
  clearPmMonthTarget?: boolean | null | undefined;
  clearPmTotal?: boolean | null | undefined;
  clearPmYearActual?: boolean | null | undefined;
  clearPmYearTarget?: boolean | null | undefined;
  clearPmYesterday?: boolean | null | undefined;
  clearProcessingDiagramFinishCount?: boolean | null | undefined;
  clearProcessingWeight?: boolean | null | undefined;
  clearProjectStaffs?: boolean | null | undefined;
  clearQualityRanking?: boolean | null | undefined;
  clearQualityScore?: boolean | null | undefined;
  clearStartDate?: boolean | null | undefined;
  clearTotalContractAmount?: boolean | null | undefined;
  clearUnitComponentInstallation?: boolean | null | undefined;
  clearUnitComponentProduction?: boolean | null | undefined;
  clearUnitComponentTotal?: boolean | null | undefined;
  clearUnitInventoryTotal?: boolean | null | undefined;
  clearVaApplyAmount?: boolean | null | undefined;
  clearVaApproveAmount?: boolean | null | undefined;
  clearVos?: boolean | null | undefined;
  clearXjl?: boolean | null | undefined;
  clearXmfzr?: boolean | null | undefined;
  clearXmglfLj?: boolean | null | undefined;
  clearXmglfYs?: boolean | null | undefined;
  clearXmsjf?: boolean | null | undefined;
  clearYye?: boolean | null | undefined;
  code?: string | null | undefined;
  conType?: string | null | undefined;
  consultant?: string | null | undefined;
  contractorApplyAmount?: number | null | undefined;
  contractorApplyCount?: number | null | undefined;
  contractorApproveAmount?: number | null | undefined;
  contractorApproveCount?: number | null | undefined;
  designRatedWeight?: number | null | undefined;
  effectiveContractAmount?: number | null | undefined;
  endDate?: any | null | undefined;
  fsDate?: any | null | undefined;
  glassBudgetPercentage?: number | null | undefined;
  installProgress?: number | null | undefined;
  ironBudgetPercentage?: number | null | undefined;
  isFinished?: boolean | null | undefined;
  itemStockWeight?: number | null | undefined;
  jzs?: string | null | undefined;
  manager?: string | null | undefined;
  materialLoss?: number | null | undefined;
  mcn?: string | null | undefined;
  milestoneDoneMonth?: number | null | undefined;
  milestoneDoneYear?: number | null | undefined;
  milestonePlanMonth?: number | null | undefined;
  milestonePlanYear?: number | null | undefined;
  mntyr?: string | null | undefined;
  name?: string | null | undefined;
  opDate?: any | null | undefined;
  owner?: string | null | undefined;
  ownerApplyAmount?: number | null | undefined;
  ownerApplyCount?: number | null | undefined;
  ownerApproveAmount?: number | null | undefined;
  ownerApproveCount?: number | null | undefined;
  palletsInStock?: number | null | undefined;
  partsInStock?: number | null | undefined;
  planOverdueCount?: number | null | undefined;
  planOverdueMonthCount?: number | null | undefined;
  planTotalCount?: number | null | undefined;
  pmArea?: number | null | undefined;
  pmMonthActual?: number | null | undefined;
  pmMonthTarget?: number | null | undefined;
  pmTotal?: number | null | undefined;
  pmYearActual?: number | null | undefined;
  pmYearTarget?: number | null | undefined;
  pmYesterday?: number | null | undefined;
  processingDiagramFinishCount?: number | null | undefined;
  processingWeight?: number | null | undefined;
  qualityRanking?: number | null | undefined;
  qualityScore?: number | null | undefined;
  removeProjectStaffIDs?: ReadonlyArray<string> | null | undefined;
  removeVoIDs?: ReadonlyArray<string> | null | undefined;
  startDate?: any | null | undefined;
  totalContractAmount?: number | null | undefined;
  unitComponentInstallation?: number | null | undefined;
  unitComponentProduction?: number | null | undefined;
  unitComponentTotal?: number | null | undefined;
  unitInventoryTotal?: number | null | undefined;
  updatedAt?: any | null | undefined;
  vaApplyAmount?: number | null | undefined;
  vaApproveAmount?: number | null | undefined;
  xjl?: number | null | undefined;
  xmfzr?: string | null | undefined;
  xmglfLj?: number | null | undefined;
  xmglfYs?: number | null | undefined;
  xmsjf?: number | null | undefined;
  yye?: number | null | undefined;
};
export type useUpdateProjectMutation$variables = {
  id: string;
  input: UpdateProjectInput;
};
export type useUpdateProjectMutation$data = {
  readonly updateProject: {
    readonly fsDate: any | null | undefined;
    readonly opDate: any | null | undefined;
  };
};
export type useUpdateProjectMutation = {
  response: useUpdateProjectMutation$data;
  variables: useUpdateProjectMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fsDate",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "opDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateProjectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "updateProject",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "useUpdateProjectMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Project",
        "kind": "LinkedField",
        "name": "updateProject",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "21c4622d48729daec2244db667816f6e",
    "id": null,
    "metadata": {},
    "name": "useUpdateProjectMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateProjectMutation(\n  $id: ID!\n  $input: UpdateProjectInput!\n) {\n  updateProject(id: $id, input: $input) {\n    fsDate\n    opDate\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "702ff2f1cebd3bd232e55f463d59ac21";

export default node;

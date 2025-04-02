/**
 * @generated SignedSource<<e8fb099b0bba2786c20d854760094b42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UpdateProjectInput = {
  accumulateDeduction?: number | null | undefined;
  addUserIDs?: ReadonlyArray<string> | null | undefined;
  bulkMaterialsCompletedQuantity?: number | null | undefined;
  bulkMaterialsTotalOrderQuantity?: number | null | undefined;
  bulkMaterialsUncompletedQuantity?: number | null | undefined;
  clearAccumulateDeduction?: boolean | null | undefined;
  clearBulkMaterialsCompletedQuantity?: boolean | null | undefined;
  clearBulkMaterialsTotalOrderQuantity?: boolean | null | undefined;
  clearBulkMaterialsUncompletedQuantity?: boolean | null | undefined;
  clearContractSupplementaryCount?: boolean | null | undefined;
  clearContractorVoCount?: boolean | null | undefined;
  clearDiagramBdFinishCount?: boolean | null | undefined;
  clearDiagramBdTotalCount?: boolean | null | undefined;
  clearDiagramCApprovalRatioDenominator?: boolean | null | undefined;
  clearDiagramCApprovalRatioNumerator?: boolean | null | undefined;
  clearDiagramConstructionFinishCount?: boolean | null | undefined;
  clearDiagramConstructionTotalCount?: boolean | null | undefined;
  clearDiagramProcessingFinishCount?: boolean | null | undefined;
  clearDiagramProcessingTotalCount?: boolean | null | undefined;
  clearOwnerVoCount?: boolean | null | undefined;
  clearPayDate?: boolean | null | undefined;
  clearRepairFee?: boolean | null | undefined;
  clearRevenueAccumulatedCompleted?: boolean | null | undefined;
  clearRevenueCurrentYearCompleted?: boolean | null | undefined;
  clearRevenueKpi?: boolean | null | undefined;
  clearSubcontractorVaCount?: boolean | null | undefined;
  clearUnitComponentInstallation?: boolean | null | undefined;
  clearUnitComponentProduction?: boolean | null | undefined;
  clearUnitComponentTotal?: boolean | null | undefined;
  clearUnitInventoryTotal?: boolean | null | undefined;
  clearUsers?: boolean | null | undefined;
  code?: string | null | undefined;
  contractSupplementaryCount?: number | null | undefined;
  contractorVoCount?: number | null | undefined;
  diagramBdFinishCount?: number | null | undefined;
  diagramBdTotalCount?: number | null | undefined;
  diagramCApprovalRatioDenominator?: number | null | undefined;
  diagramCApprovalRatioNumerator?: number | null | undefined;
  diagramConstructionFinishCount?: number | null | undefined;
  diagramConstructionTotalCount?: number | null | undefined;
  diagramProcessingFinishCount?: number | null | undefined;
  diagramProcessingTotalCount?: number | null | undefined;
  isFinished?: boolean | null | undefined;
  ownerVoCount?: number | null | undefined;
  payDate?: any | null | undefined;
  removeUserIDs?: ReadonlyArray<string> | null | undefined;
  repairFee?: number | null | undefined;
  revenueAccumulatedCompleted?: number | null | undefined;
  revenueCurrentYearCompleted?: number | null | undefined;
  revenueKpi?: number | null | undefined;
  subcontractorVaCount?: number | null | undefined;
  unitComponentInstallation?: number | null | undefined;
  unitComponentProduction?: number | null | undefined;
  unitComponentTotal?: number | null | undefined;
  unitInventoryTotal?: number | null | undefined;
  updatedAt?: any | null | undefined;
};
export type useUpdateProjectMutation$variables = {
  id: string;
  input: UpdateProjectInput;
};
export type useUpdateProjectMutation$data = {
  readonly updateProject: {
    readonly id: string;
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
    "alias": null,
    "args": [
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
    "concreteType": "Project",
    "kind": "LinkedField",
    "name": "updateProject",
    "plural": false,
    "selections": [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateProjectMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateProjectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a690732346b29f3ef676f518130b68f4",
    "id": null,
    "metadata": {},
    "name": "useUpdateProjectMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateProjectMutation(\n  $id: ID!\n  $input: UpdateProjectInput!\n) {\n  updateProject(id: $id, input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4dc8950a306e953c1a020cc66ecd8a74";

export default node;

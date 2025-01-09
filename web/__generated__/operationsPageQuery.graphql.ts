/**
 * @generated SignedSource<<af784dd6dcc810c805ac65ab2c229fc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type operationsPageQuery$variables = Record<PropertyKey, never>;
export type operationsPageQuery$data = {
  readonly projects: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly accumulatedNonStatutoryDeductions: number | null | undefined;
        readonly accumulatedNonStatutoryDeductionsPeriod: number | null | undefined;
        readonly accumulatedStatutoryDeductions: number | null | undefined;
        readonly code: string;
        readonly contractorApplyAmount: number | null | undefined;
        readonly contractorApplyCount: number | null | undefined;
        readonly contractorApproveAmount: number | null | undefined;
        readonly contractorApproveCount: number | null | undefined;
        readonly effectiveContractAmount: number | null | undefined;
        readonly installProgress: number | null | undefined;
        readonly name: string | null | undefined;
        readonly ownerApplyAmount: number | null | undefined;
        readonly ownerApplyCount: number | null | undefined;
        readonly ownerApproveAmount: number | null | undefined;
        readonly ownerApproveCount: number | null | undefined;
        readonly totalContractAmount: number | null | undefined;
        readonly vaApplyAmount: number | null | undefined;
        readonly vaApproveAmount: number | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type operationsPageQuery = {
  response: operationsPageQuery$data;
  variables: operationsPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "where",
    "value": {
      "isFinishedNEQ": true
    }
  }
],
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
  "name": "ownerApplyCount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApplyAmount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveCount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveAmount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyAmount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveAmount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "installProgress",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "effectiveContractAmount",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApplyAmount",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApproveAmount",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedStatutoryDeductions",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductions",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductionsPeriod",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalContractAmount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "operationsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
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
                  (v18/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "projects(where:{\"isFinishedNEQ\":true})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "operationsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
                  (v1/*: any*/),
                  (v2/*: any*/),
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": "projects(where:{\"isFinishedNEQ\":true})"
      }
    ]
  },
  "params": {
    "cacheID": "2aefed98e6689b1e1304a7d107b76eac",
    "id": null,
    "metadata": {},
    "name": "operationsPageQuery",
    "operationKind": "query",
    "text": "query operationsPageQuery {\n  projects(where: {isFinishedNEQ: true}) {\n    edges {\n      node {\n        name\n        code\n        ownerApplyCount\n        ownerApplyAmount\n        ownerApproveCount\n        ownerApproveAmount\n        contractorApplyCount\n        contractorApplyAmount\n        contractorApproveCount\n        contractorApproveAmount\n        installProgress\n        effectiveContractAmount\n        vaApplyAmount\n        vaApproveAmount\n        accumulatedStatutoryDeductions\n        accumulatedNonStatutoryDeductions\n        accumulatedNonStatutoryDeductionsPeriod\n        totalContractAmount\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "80ed842b64fb6c6876351530e010f995";

export default node;

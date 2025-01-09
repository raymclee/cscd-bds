/**
 * @generated SignedSource<<539a7edfa56607d17184b08c890f8a47>>
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
        readonly areas: string | null | undefined;
        readonly cje: number | null | undefined;
        readonly code: string;
        readonly conType: string | null | undefined;
        readonly consultant: string | null | undefined;
        readonly contractorApplyAmount: number | null | undefined;
        readonly contractorApplyCount: number | null | undefined;
        readonly contractorApproveAmount: number | null | undefined;
        readonly contractorApproveCount: number | null | undefined;
        readonly effectiveContractAmount: number | null | undefined;
        readonly endDate: any | null | undefined;
        readonly fsDate: any | null | undefined;
        readonly installProgress: number | null | undefined;
        readonly jzs: string | null | undefined;
        readonly manager: string | null | undefined;
        readonly mcn: string | null | undefined;
        readonly mntyr: string | null | undefined;
        readonly name: string | null | undefined;
        readonly opDate: any | null | undefined;
        readonly owner: string | null | undefined;
        readonly ownerApplyAmount: number | null | undefined;
        readonly ownerApplyCount: number | null | undefined;
        readonly ownerApproveAmount: number | null | undefined;
        readonly ownerApproveCount: number | null | undefined;
        readonly startDate: any | null | undefined;
        readonly totalContractAmount: number | null | undefined;
        readonly vaApplyAmount: number | null | undefined;
        readonly vaApproveAmount: number | null | undefined;
        readonly yye: number | null | undefined;
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
  "name": "manager",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "owner",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "jzs",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mcn",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "consultant",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "areas",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fsDate",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "opDate",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startDate",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endDate",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mntyr",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "conType",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cje",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "yye",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApplyCount",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApplyAmount",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveCount",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerApproveAmount",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyCount",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApplyAmount",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveCount",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contractorApproveAmount",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "installProgress",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "effectiveContractAmount",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApplyAmount",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "vaApproveAmount",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedStatutoryDeductions",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductions",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accumulatedNonStatutoryDeductionsPeriod",
  "storageKey": null
},
v32 = {
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
                  (v32/*: any*/)
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
    "cacheID": "5518cca48abeb41c71ea7a5b74fa83f8",
    "id": null,
    "metadata": {},
    "name": "operationsPageQuery",
    "operationKind": "query",
    "text": "query operationsPageQuery {\n  projects(where: {isFinishedNEQ: true}) {\n    edges {\n      node {\n        name\n        code\n        manager\n        owner\n        jzs\n        mcn\n        consultant\n        areas\n        fsDate\n        opDate\n        startDate\n        endDate\n        mntyr\n        conType\n        cje\n        yye\n        ownerApplyCount\n        ownerApplyAmount\n        ownerApproveCount\n        ownerApproveAmount\n        contractorApplyCount\n        contractorApplyAmount\n        contractorApproveCount\n        contractorApproveAmount\n        installProgress\n        effectiveContractAmount\n        vaApplyAmount\n        vaApproveAmount\n        accumulatedStatutoryDeductions\n        accumulatedNonStatutoryDeductions\n        accumulatedNonStatutoryDeductionsPeriod\n        totalContractAmount\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0df452a46914a9d1c84f91dcb8efd7f5";

export default node;

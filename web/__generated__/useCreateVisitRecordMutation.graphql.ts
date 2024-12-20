/**
 * @generated SignedSource<<b29a707ed2286fc2383695ba6956c316>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateVisitRecordInput = {
  commContent: string;
  commPeople: string;
  createdAt?: any | null | undefined;
  customerID: string;
  date: any;
  followupbyIDs?: ReadonlyArray<string> | null | undefined;
  nextStep?: string | null | undefined;
  tenderID?: string | null | undefined;
  updatedAt?: any | null | undefined;
  visitType?: number | null | undefined;
};
export type useCreateVisitRecordMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateVisitRecordInput;
};
export type useCreateVisitRecordMutation$data = {
  readonly createVisitRecord: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly commContent: string;
        readonly commPeople: string;
        readonly date: any;
        readonly followupbys: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
        readonly id: string;
        readonly nextStep: string | null | undefined;
        readonly tender: {
          readonly id: string;
        } | null | undefined;
        readonly visitType: number;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type useCreateVisitRecordMutation = {
  response: useCreateVisitRecordMutation$data;
  variables: useCreateVisitRecordMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "VisitRecordEdge",
  "kind": "LinkedField",
  "name": "edges",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "VisitRecord",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "date",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "visitType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "commPeople",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "commContent",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nextStep",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserConnection",
          "kind": "LinkedField",
          "name": "followupbys",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": (v4/*: any*/),
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Tender",
          "kind": "LinkedField",
          "name": "tender",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "VisitRecordConnection",
        "kind": "LinkedField",
        "name": "createVisitRecord",
        "plural": false,
        "selections": [
          (v5/*: any*/)
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
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCreateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "VisitRecordConnection",
        "kind": "LinkedField",
        "name": "createVisitRecord",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "edges",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e6064458293448ecccf0e750911a5da9",
    "id": null,
    "metadata": {},
    "name": "useCreateVisitRecordMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateVisitRecordMutation(\n  $input: CreateVisitRecordInput!\n) {\n  createVisitRecord(input: $input) {\n    edges {\n      node {\n        id\n        date\n        visitType\n        commPeople\n        commContent\n        nextStep\n        followupbys {\n          edges {\n            node {\n              id\n            }\n          }\n        }\n        tender {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "382372f646d9e7916a112f65be72a478";

export default node;

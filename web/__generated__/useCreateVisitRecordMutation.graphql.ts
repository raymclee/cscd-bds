/**
 * @generated SignedSource<<5c1070a688eaf2c3a42ed78330531957>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
  input: CreateVisitRecordInput;
};
export type useCreateVisitRecordMutation$data = {
  readonly createVisitRecord: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"visitRecordItemFragment">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type useCreateVisitRecordMutation = {
  response: useCreateVisitRecordMutation$data;
  variables: useCreateVisitRecordMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VisitRecordConnection",
        "kind": "LinkedField",
        "name": "createVisitRecord",
        "plural": false,
        "selections": [
          {
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "visitRecordItemFragment"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "useCreateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VisitRecordConnection",
        "kind": "LinkedField",
        "name": "createVisitRecord",
        "plural": false,
        "selections": [
          {
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4133a2170af6a53f12c797b1b7ea2435",
    "id": null,
    "metadata": {},
    "name": "useCreateVisitRecordMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateVisitRecordMutation(\n  $input: CreateVisitRecordInput!\n) {\n  createVisitRecord(input: $input) {\n    edges {\n      node {\n        ...visitRecordItemFragment\n        id\n      }\n    }\n  }\n}\n\nfragment visitRecordItemFragment on VisitRecord {\n  id\n  date\n  visitType\n  commPeople\n  commContent\n  nextStep\n}\n"
  }
};
})();

(node as any).hash = "b20a7f6a23cd2036f1a9c64c199d1a9e";

export default node;

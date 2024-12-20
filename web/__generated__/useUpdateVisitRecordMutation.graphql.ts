/**
 * @generated SignedSource<<24bc4ee64085df58fbc97f2e281587d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateVisitRecordInput = {
  addFollowUpByIDs?: ReadonlyArray<string> | null | undefined;
  clearFollowUpBys?: boolean | null | undefined;
  clearNextStep?: boolean | null | undefined;
  clearTender?: boolean | null | undefined;
  commContent?: string | null | undefined;
  commPeople?: string | null | undefined;
  customerID?: string | null | undefined;
  date?: any | null | undefined;
  nextStep?: string | null | undefined;
  removeFollowUpByIDs?: ReadonlyArray<string> | null | undefined;
  tenderID?: string | null | undefined;
  updatedAt?: any | null | undefined;
  visitType?: number | null | undefined;
};
export type useUpdateVisitRecordMutation$variables = {
  id: string;
  input: UpdateVisitRecordInput;
};
export type useUpdateVisitRecordMutation$data = {
  readonly updateVisitRecord: {
    readonly " $fragmentSpreads": FragmentRefs<"visitRecordItemFragment">;
  };
};
export type useUpdateVisitRecordMutation = {
  response: useUpdateVisitRecordMutation$data;
  variables: useUpdateVisitRecordMutation$variables;
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VisitRecord",
        "kind": "LinkedField",
        "name": "updateVisitRecord",
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateVisitRecordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VisitRecord",
        "kind": "LinkedField",
        "name": "updateVisitRecord",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "kind": "ScalarField",
            "name": "customerID",
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
                    "selections": [
                      (v2/*: any*/)
                    ],
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
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "cacheID": "6c8154cd3656765db2a8afbbd525e078",
    "id": null,
    "metadata": {},
    "name": "useUpdateVisitRecordMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateVisitRecordMutation(\n  $id: ID!\n  $input: UpdateVisitRecordInput!\n) {\n  updateVisitRecord(id: $id, input: $input) {\n    ...visitRecordItemFragment\n    id\n  }\n}\n\nfragment visitRecordItemFragment on VisitRecord {\n  id\n  date\n  visitType\n  commPeople\n  commContent\n  nextStep\n  customerID\n  followupbys {\n    edges {\n      node {\n        id\n      }\n    }\n  }\n  tender {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f198ae3b9fa50f84bbc698519629764";

export default node;

/**
 * @generated SignedSource<<e0c0af4b43ee0393e805076b9abd7724>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
    readonly id: string;
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
    "concreteType": "VisitRecord",
    "kind": "LinkedField",
    "name": "updateVisitRecord",
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
    "name": "useUpdateVisitRecordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateVisitRecordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "429ac4cd212db0733e2b7e05959d3cc6",
    "id": null,
    "metadata": {},
    "name": "useUpdateVisitRecordMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateVisitRecordMutation(\n  $id: ID!\n  $input: UpdateVisitRecordInput!\n) {\n  updateVisitRecord(id: $id, input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8acf004d751e21c8c86f84b54e6befa9";

export default node;

/**
 * @generated SignedSource<<3e929a604686668be6ae57bc7e6ef5ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateUserInput = {
  areaIDs?: ReadonlyArray<string> | null | undefined;
  avatarURL: string;
  createdAt?: any | null | undefined;
  customerIDs?: ReadonlyArray<string> | null | undefined;
  disabled?: boolean | null | undefined;
  email: string;
  isAdmin?: boolean | null | undefined;
  isLeader?: boolean | null | undefined;
  leaderID?: string | null | undefined;
  name: string;
  openID: string;
  teamMemberIDs?: ReadonlyArray<string> | null | undefined;
  tenderIDs?: ReadonlyArray<string> | null | undefined;
  updatedAt?: any | null | undefined;
  username: string;
  visitRecordIDs?: ReadonlyArray<string> | null | undefined;
};
export type useCreateUserMutation$variables = {
  input: CreateUserInput;
};
export type useCreateUserMutation$data = {
  readonly createUser: {
    readonly id: string;
  };
};
export type useCreateUserMutation = {
  response: useCreateUserMutation$data;
  variables: useCreateUserMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "createUser",
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
    "name": "useCreateUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bb032acddc8803e610715cc072db23c9",
    "id": null,
    "metadata": {},
    "name": "useCreateUserMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateUserMutation(\n  $input: CreateUserInput!\n) {\n  createUser(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e13a1398fb725b0f6d1a4d7a582ea8b2";

export default node;

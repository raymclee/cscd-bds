/**
 * @generated SignedSource<<c945c3dc76d36a18da4aec4706b677ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthSessionQuery$variables = Record<PropertyKey, never>;
export type AuthSessionQuery$data = {
  readonly session: {
    readonly avatarUrl: string;
    readonly email: string;
    readonly isAdmin: boolean;
    readonly isLeader: boolean;
    readonly name: string;
    readonly userId: string;
    readonly username: string;
  };
};
export type AuthSessionQuery = {
  response: AuthSessionQuery$data;
  variables: AuthSessionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Session",
    "kind": "LinkedField",
    "name": "session",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "avatarUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isAdmin",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isLeader",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthSessionQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthSessionQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b57544fafb2e70dcb15bc8af61c70d4d",
    "id": null,
    "metadata": {},
    "name": "AuthSessionQuery",
    "operationKind": "query",
    "text": "query AuthSessionQuery {\n  session {\n    userId\n    name\n    username\n    email\n    avatarUrl\n    isAdmin\n    isLeader\n  }\n}\n"
  }
};
})();

(node as any).hash = "359e3358ac37280d4b626db96a9d9542";

export default node;

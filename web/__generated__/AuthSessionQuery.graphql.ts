/**
 * @generated SignedSource<<2ce95fc816d6deda158b053a8740c97e>>
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
    readonly name: string;
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
    "cacheID": "f29c30d76ac620a4f6f6903bef1b8721",
    "id": null,
    "metadata": {},
    "name": "AuthSessionQuery",
    "operationKind": "query",
    "text": "query AuthSessionQuery {\n  session {\n    name\n    username\n    email\n    avatarUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "33b3e005f317fef07951bdcc629ae6a5";

export default node;

/**
 * @generated SignedSource<<1aa93ab7cfd650837eccc5f27b51f486>>
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
    readonly hasEditAccess: boolean;
    readonly hasMapAccess: boolean;
    readonly isAdmin: boolean;
    readonly isSales: boolean;
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
        "name": "isSales",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasMapAccess",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasEditAccess",
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
    "cacheID": "35a815cc286bae0e1858f3cb801e5282",
    "id": null,
    "metadata": {},
    "name": "AuthSessionQuery",
    "operationKind": "query",
    "text": "query AuthSessionQuery {\n  session {\n    userId\n    name\n    username\n    email\n    avatarUrl\n    isAdmin\n    isSales\n    hasMapAccess\n    hasEditAccess\n  }\n}\n"
  }
};
})();

(node as any).hash = "89a12165c4d573fc78bc5bb346eda45a";

export default node;

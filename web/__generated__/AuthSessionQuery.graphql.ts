/**
 * @generated SignedSource<<8d4c3ff317c1194a03a49c55e4a24331>>
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
    readonly isLeader: boolean;
    readonly isSales: boolean;
    readonly isSuperAdmin: boolean;
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
        "name": "isLeader",
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
        "name": "isSuperAdmin",
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
    "cacheID": "76c982a1412b2502d02c6781ea38b473",
    "id": null,
    "metadata": {},
    "name": "AuthSessionQuery",
    "operationKind": "query",
    "text": "query AuthSessionQuery {\n  session {\n    userId\n    name\n    username\n    email\n    avatarUrl\n    isLeader\n    isAdmin\n    isSuperAdmin\n    isSales\n    hasMapAccess\n    hasEditAccess\n  }\n}\n"
  }
};
})();

(node as any).hash = "884c30fbb29cc3eab7dbeed86b91c882";

export default node;

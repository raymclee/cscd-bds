/**
 * @generated SignedSource<<8673ece68f6007e08f99c2a562d4a6e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type searchUserSelectQuery$variables = {
  keyword: string;
};
export type searchUserSelectQuery$data = {
  readonly searchFeishuUser: ReadonlyArray<{
    readonly avatarUrl: string;
    readonly email: string;
    readonly name: string;
    readonly openId: string;
  }>;
};
export type searchUserSelectQuery = {
  response: searchUserSelectQuery$data;
  variables: searchUserSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "keyword",
        "variableName": "keyword"
      }
    ],
    "concreteType": "FeishuUser",
    "kind": "LinkedField",
    "name": "searchFeishuUser",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "openId",
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
        "name": "avatarUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
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
    "name": "searchUserSelectQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "searchUserSelectQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d5077200df9a8f9049f77063a3603ca8",
    "id": null,
    "metadata": {},
    "name": "searchUserSelectQuery",
    "operationKind": "query",
    "text": "query searchUserSelectQuery(\n  $keyword: String!\n) {\n  searchFeishuUser(keyword: $keyword) {\n    openId\n    name\n    avatarUrl\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "34eaee0da5344926b5e9c174e603f14e";

export default node;

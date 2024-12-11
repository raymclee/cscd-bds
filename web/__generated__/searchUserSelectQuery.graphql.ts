/**
 * @generated SignedSource<<fdf505de29de84488e86525ffa964c2a>>
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
    "cacheID": "82cf47675ef4516b3f1186f4b4b819ba",
    "id": null,
    "metadata": {},
    "name": "searchUserSelectQuery",
    "operationKind": "query",
    "text": "query searchUserSelectQuery(\n  $keyword: String!\n) {\n  searchFeishuUser(keyword: $keyword) {\n    openId\n    name\n    avatarUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "600a3c68c34a1f4dea14f858dc005066";

export default node;

/**
 * @generated SignedSource<<712b31d3e79cf9e8b6a951f41f31c8a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tenderFormLastAvailableTenderCodeQuery$variables = {
  areaId: string;
  date: any;
};
export type tenderFormLastAvailableTenderCodeQuery$data = {
  readonly lastAvailableTenderCode: string;
};
export type tenderFormLastAvailableTenderCodeQuery = {
  response: tenderFormLastAvailableTenderCodeQuery$data;
  variables: tenderFormLastAvailableTenderCodeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "areaId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "date"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "areaId",
        "variableName": "areaId"
      },
      {
        "kind": "Variable",
        "name": "date",
        "variableName": "date"
      }
    ],
    "kind": "ScalarField",
    "name": "lastAvailableTenderCode",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "tenderFormLastAvailableTenderCodeQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "tenderFormLastAvailableTenderCodeQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c35c34907c9f7b697561516c27ee2e13",
    "id": null,
    "metadata": {},
    "name": "tenderFormLastAvailableTenderCodeQuery",
    "operationKind": "query",
    "text": "query tenderFormLastAvailableTenderCodeQuery(\n  $areaId: ID!\n  $date: Time!\n) {\n  lastAvailableTenderCode(areaId: $areaId, date: $date)\n}\n"
  }
};
})();

(node as any).hash = "72b10df8f73c764d58a5d7c6f92bb888";

export default node;

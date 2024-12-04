/**
 * @generated SignedSource<<2b90c75c187e9efff5a10c2e7a208782>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type tenderFormLastAvailableTenderCodeQuery$variables = {
  areaCode: string;
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
    "name": "areaCode"
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
        "name": "areaCode",
        "variableName": "areaCode"
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
    "cacheID": "f972ea16e7697669d36da16077a39a66",
    "id": null,
    "metadata": {},
    "name": "tenderFormLastAvailableTenderCodeQuery",
    "operationKind": "query",
    "text": "query tenderFormLastAvailableTenderCodeQuery(\n  $areaCode: String!\n  $date: Date!\n) {\n  lastAvailableTenderCode(areaCode: $areaCode, date: $date)\n}\n"
  }
};
})();

(node as any).hash = "7e1861fb16792439c85cf44d0ac3aa76";

export default node;

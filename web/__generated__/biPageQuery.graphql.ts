/**
 * @generated SignedSource<<3f603b7bfecfb54611fc0fd74277670e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type biPageQuery$variables = Record<PropertyKey, never>;
export type biPageQuery$data = {
  readonly biToken: string;
};
export type biPageQuery = {
  response: biPageQuery$data;
  variables: biPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "biToken",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "biPageQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "biPageQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d25672636456b9316deded54f15689f0",
    "id": null,
    "metadata": {},
    "name": "biPageQuery",
    "operationKind": "query",
    "text": "query biPageQuery {\n  biToken\n}\n"
  }
};
})();

(node as any).hash = "b730d3bed39a99b6f8635a515bb6f246";

export default node;

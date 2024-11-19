/**
 * @generated SignedSource<<bf4e6e2eec40bb8897fec0c9a728d883>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MapIndexPageQuery$variables = Record<PropertyKey, never>;
export type MapIndexPageQuery$data = {
  readonly areas: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly tenders: ReadonlyArray<{
          readonly estimatedAmount: number | null | undefined;
          readonly id: string;
          readonly name: string;
        }> | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
};
export type MapIndexPageQuery = {
  response: MapIndexPageQuery$data;
  variables: MapIndexPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AreaConnection",
    "kind": "LinkedField",
    "name": "areas",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AreaEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Area",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Tender",
                "kind": "LinkedField",
                "name": "tenders",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
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
                    "name": "estimatedAmount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
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
    "name": "MapIndexPageQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MapIndexPageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "812b6a2e9c4e07400ea5a0fe6cb050d1",
    "id": null,
    "metadata": {},
    "name": "MapIndexPageQuery",
    "operationKind": "query",
    "text": "query MapIndexPageQuery {\n  areas {\n    edges {\n      node {\n        id\n        tenders {\n          id\n          name\n          estimatedAmount\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e26c5d0856980869b2bdbbec2b815445";

export default node;

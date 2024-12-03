/**
 * @generated SignedSource<<4351733ce6b96e432416518c81571aa9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type tenderFormFragment$data = {
  readonly areas: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly code: string;
        readonly customers: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly name: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
        readonly id: string;
        readonly name: string;
        readonly provinces: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly adcode: number;
              readonly cities: {
                readonly edges: ReadonlyArray<{
                  readonly node: {
                    readonly adcode: number;
                    readonly districts: {
                      readonly edges: ReadonlyArray<{
                        readonly node: {
                          readonly adcode: number;
                          readonly id: string;
                          readonly name: string;
                        } | null | undefined;
                      } | null | undefined> | null | undefined;
                    };
                    readonly id: string;
                    readonly name: string;
                  } | null | undefined;
                } | null | undefined> | null | undefined;
              };
              readonly districts: {
                readonly edges: ReadonlyArray<{
                  readonly node: {
                    readonly adcode: number;
                    readonly id: string;
                    readonly name: string;
                  } | null | undefined;
                } | null | undefined> | null | undefined;
              };
              readonly id: string;
              readonly name: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
        readonly users: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly name: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "tenderFormFragment";
};
export type tenderFormFragment$key = {
  readonly " $data"?: tenderFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"tenderFormFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/)
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "adcode",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "DistrictConnection",
  "kind": "LinkedField",
  "name": "districts",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "DistrictEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "District",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "tenderFormFragment",
  "selections": [
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "code",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CustomerConnection",
                  "kind": "LinkedField",
                  "name": "customers",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CustomerEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Customer",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": (v2/*: any*/),
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "where",
                      "value": {
                        "isSales": true
                      }
                    }
                  ],
                  "concreteType": "UserConnection",
                  "kind": "LinkedField",
                  "name": "users",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "UserEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "User",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": (v2/*: any*/),
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": "users(where:{\"isSales\":true})"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ProvinceConnection",
                  "kind": "LinkedField",
                  "name": "provinces",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ProvinceEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Province",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": [
                            (v0/*: any*/),
                            (v1/*: any*/),
                            (v3/*: any*/),
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "CityConnection",
                              "kind": "LinkedField",
                              "name": "cities",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "CityEdge",
                                  "kind": "LinkedField",
                                  "name": "edges",
                                  "plural": true,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "concreteType": "City",
                                      "kind": "LinkedField",
                                      "name": "node",
                                      "plural": false,
                                      "selections": [
                                        (v0/*: any*/),
                                        (v1/*: any*/),
                                        (v3/*: any*/),
                                        (v4/*: any*/)
                                      ],
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            },
                            (v4/*: any*/)
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
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "b3b6a00377acb79da17986aed6160b60";

export default node;

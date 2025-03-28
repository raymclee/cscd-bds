/**
 * @generated SignedSource<<aef1328f51243d142f4e113d87e28074>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type districtPlots$data = {
  readonly districts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly plots: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly colorHex: string;
              readonly geoBounds: ReadonlyArray<ReadonlyArray<number>> | null | undefined;
              readonly id: string;
              readonly name: string;
            } | null | undefined;
          } | null | undefined> | null | undefined;
        };
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "districtPlots";
};
export type districtPlots$key = {
  readonly " $data"?: districtPlots$data;
  readonly " $fragmentSpreads": FragmentRefs<"districtPlots">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "adcode"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "districtPlots",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "adcode",
              "variableName": "adcode"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
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
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PlotConnection",
                  "kind": "LinkedField",
                  "name": "plots",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "PlotEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Plot",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "id",
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
                              "name": "geoBounds",
                              "storageKey": null
                            },
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "colorHex",
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "161e8c2bc67209f216ba0a736d1ec999";

export default node;

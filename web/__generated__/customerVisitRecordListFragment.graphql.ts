/**
 * @generated SignedSource<<46184c259592be2a4235850a49a7bb61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerVisitRecordListFragment$data = {
  readonly visitRecords: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly commContent: string;
        readonly commPeople: string;
        readonly date: any;
        readonly id: string;
        readonly nextStep: string | null | undefined;
        readonly tender: {
          readonly id: string;
          readonly name: string;
        } | null | undefined;
        readonly visitType: number;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "customerVisitRecordListFragment";
};
export type customerVisitRecordListFragment$key = {
  readonly " $data"?: customerVisitRecordListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerVisitRecordListFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "orderBy"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "customerVisitRecordListFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "orderBy",
          "variableName": "orderBy"
        }
      ],
      "concreteType": "VisitRecordConnection",
      "kind": "LinkedField",
      "name": "visitRecords",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "VisitRecordEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "VisitRecord",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "visitType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "commPeople",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "commContent",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "nextStep",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Tender",
                  "kind": "LinkedField",
                  "name": "tender",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
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
  "type": "Customer",
  "abstractKey": null
};
})();

(node as any).hash = "d54a6169a7cdac6a98ac2d9bc949c0c3";

export default node;

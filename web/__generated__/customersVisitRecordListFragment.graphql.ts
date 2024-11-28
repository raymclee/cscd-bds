/**
 * @generated SignedSource<<2e665deb0739f66f3378a6d3be5574c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customersVisitRecordListFragment$data = {
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
  readonly " $fragmentType": "customersVisitRecordListFragment";
};
export type customersVisitRecordListFragment$key = {
  readonly " $data"?: customersVisitRecordListFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customersVisitRecordListFragment">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customersVisitRecordListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
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

(node as any).hash = "9dabe53b7e18c412fee47bef88a509c0";

export default node;

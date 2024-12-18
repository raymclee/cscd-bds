/**
 * @generated SignedSource<<69991eb95552348bdee125364c3e25cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailFragment$data = {
  readonly area: {
    readonly id: string;
    readonly name: string;
  };
  readonly contactPerson: string | null | undefined;
  readonly contactPersonEmail: string | null | undefined;
  readonly contactPersonPhone: string | null | undefined;
  readonly contactPersonPosition: string | null | undefined;
  readonly createdAt: any;
  readonly createdBy: {
    readonly name: string;
  };
  readonly id: string;
  readonly industry: number | null | undefined;
  readonly lastVisitRecord: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly date: any;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly name: string;
  readonly ownerType: number | null | undefined;
  readonly sales: {
    readonly id: string;
    readonly name: string;
  } | null | undefined;
  readonly size: number | null | undefined;
  readonly updatedAt: any;
  readonly " $fragmentType": "customerDetailFragment";
};
export type customerDetailFragment$key = {
  readonly " $data"?: customerDetailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"customerDetailFragment">;
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
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "customerDetailFragment",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ownerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "industry",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "size",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "sales",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Area",
      "kind": "LinkedField",
      "name": "area",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPerson",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonPosition",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonPhone",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contactPersonEmail",
      "storageKey": null
    },
    {
      "alias": "lastVisitRecord",
      "args": [
        {
          "kind": "Literal",
          "name": "last",
          "value": 1
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "date",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "visitRecords(last:1)"
    }
  ],
  "type": "Customer",
  "abstractKey": null
};
})();

(node as any).hash = "3392dad3eab16bcb476d8f0603bea8c2";

export default node;

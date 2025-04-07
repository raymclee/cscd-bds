/**
 * @generated SignedSource<<e62f0fc5ab89ccee9f0452b939470731>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type customerDetailFragment$data = {
  readonly activeProfile: {
    readonly approvalStatus: number;
    readonly approver: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly contactPerson: string | null | undefined;
    readonly contactPersonEmail: string | null | undefined;
    readonly contactPersonPhone: string | null | undefined;
    readonly contactPersonPosition: string | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly industry: number | null | undefined;
    readonly name: string;
    readonly ownerType: number | null | undefined;
    readonly sales: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly size: number | null | undefined;
    readonly updatedAt: any;
  } | null | undefined;
  readonly area: {
    readonly code: string;
    readonly id: string;
    readonly name: string;
  };
  readonly createdBy: {
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly id: string;
  readonly lastVisitRecord: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly date: any;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly pendingProfile: {
    readonly approvalStatus: number;
    readonly contactPerson: string | null | undefined;
    readonly contactPersonEmail: string | null | undefined;
    readonly contactPersonPhone: string | null | undefined;
    readonly contactPersonPosition: string | null | undefined;
    readonly createdAt: any;
    readonly createdBy: {
      readonly id: string;
      readonly leader: {
        readonly id: string;
      } | null | undefined;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly id: string;
    readonly industry: number | null | undefined;
    readonly name: string;
    readonly ownerType: number | null | undefined;
    readonly sales: {
      readonly id: string;
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly size: number | null | undefined;
    readonly updatedAt: any;
  } | null | undefined;
  readonly profiles: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly approvalDate: any | null | undefined;
        readonly approvalStatus: number;
        readonly approver: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly contactPerson: string | null | undefined;
        readonly contactPersonEmail: string | null | undefined;
        readonly contactPersonPhone: string | null | undefined;
        readonly contactPersonPosition: string | null | undefined;
        readonly createdAt: any;
        readonly createdBy: {
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly id: string;
        readonly industry: number | null | undefined;
        readonly name: string;
        readonly ownerType: number | null | undefined;
        readonly sales: {
          readonly id: string;
          readonly name: string | null | undefined;
        } | null | undefined;
        readonly size: number | null | undefined;
        readonly updatedAt: any;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
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
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ownerType",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "industry",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "size",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvalStatus",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPerson",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPosition",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonPhone",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contactPersonEmail",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "sales",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "approver",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "backward",
        "path": [
          "lastVisitRecord"
        ]
      }
    ]
  },
  "name": "customerDetailFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
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
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CustomerProfile",
      "kind": "LinkedField",
      "name": "activeProfile",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/),
        (v15/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CustomerProfile",
      "kind": "LinkedField",
      "name": "pendingProfile",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "createdBy",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "leader",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        (v14/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "orderBy",
          "value": [
            {
              "direction": "DESC",
              "field": "CREATED_AT"
            }
          ]
        }
      ],
      "concreteType": "CustomerProfileConnection",
      "kind": "LinkedField",
      "name": "profiles",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CustomerProfileEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CustomerProfile",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v3/*: any*/),
                (v4/*: any*/),
                (v5/*: any*/),
                (v6/*: any*/),
                (v7/*: any*/),
                (v8/*: any*/),
                (v9/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "approvalDate",
                  "storageKey": null
                },
                (v15/*: any*/),
                (v10/*: any*/),
                (v11/*: any*/),
                (v12/*: any*/),
                (v13/*: any*/),
                (v14/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "profiles(orderBy:[{\"direction\":\"DESC\",\"field\":\"CREATED_AT\"}])"
    },
    {
      "alias": "lastVisitRecord",
      "args": null,
      "concreteType": "VisitRecordConnection",
      "kind": "LinkedField",
      "name": "__customerDetailFragment_lastVisitRecord_connection",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
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

(node as any).hash = "be949d517a4ebaf33e799589c3f0f535";

export default node;

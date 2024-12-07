import { createLazyFileRoute } from "@tanstack/react-router";
import { customersDetailPageQuery } from "__generated__/customersDetailPageQuery.graphql";
import { Card, Result } from "antd";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { CustomerDetail } from "~/components/portal/customer-detail";
import { CustomerTenderList } from "~/components/portal/customer-tender-list";
import { CustomerVisitRecordList } from "~/components/portal/customer-visit-record-list";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/customers/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<customersDetailPageQuery>(
    graphql`
      query customersDetailPageQuery(
        $userId: ID!
        $id: ID!
        $orderBy: VisitRecordOrder
        $first: Int
        $last: Int
      ) {
        node(id: $userId) {
          ... on User {
            areas {
              edges {
                node {
                  customers(where: { id: $id }) {
                    edges {
                      node {
                        ...customerDetailFragment
                        tenders(first: $first, last: $last)
                          @connection(
                            key: "customersTenderListFragment_tenders"
                          ) {
                          edges {
                            __id
                            node {
                              id
                            }
                          }
                        }
                        visitRecords(orderBy: $orderBy) {
                          edges {
                            __id
                          }
                        }
                        ...customerVisitRecordListFragment
                        ...customerTenderListFragment
                          @arguments(first: $first, last: $last)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  );
  const [activeTab, setActiveTab] = React.useState("1");
  const customer = data.node?.areas?.edges
    ?.flatMap((a) => a?.node?.customers?.edges?.map((c) => c?.node))
    ?.at(0);

  if (!customer) {
    return (
      <Result
        status="404"
        title="找不到该客户资料"
        subTitle="请检查链接是否正确"
        // extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return (
    <>
      <Card
        title={<CustomerDetail queryRef={customer} />}
        onTabChange={(key) => setActiveTab(key)}
        tabProps={{ style: { marginTop: 12 }, size: "small" }}
        tabList={[
          {
            key: "1",
            tab: `项目列表 (${customer.tenders.edges?.length || 0})`,
          },
          {
            key: "2",
            tab: `拜访记录 (${customer.visitRecords.edges?.length || 0})`,
          },
        ]}
      >
        {activeTab === "1" && <CustomerTenderList queryRef={customer} />}
        {activeTab === "2" && <CustomerVisitRecordList queryRef={customer} />}
      </Card>
    </>
  );
}

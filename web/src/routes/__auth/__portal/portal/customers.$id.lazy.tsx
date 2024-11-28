import { createLazyFileRoute } from "@tanstack/react-router";
import { customersDetailPageQuery } from "__generated__/customersDetailPageQuery.graphql";
import { customersTenderListFragment$key } from "__generated__/customersTenderListFragment.graphql";
import { customersVisitRecordListFragment$key } from "__generated__/customersVisitRecordListFragment.graphql";
import { Card, Descriptions, List, Result } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { TenderListItem } from "~/components/portal/tender-list-item";
import { industryText, ownerTypeText, visitTypeText } from "~/lib/helper";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/customers/$id",
)({
  component: RouteComponent,
});

const query = graphql`
  query customersDetailPageQuery(
    $userId: ID!
    $id: ID!
    $orderBy: [VisitRecordOrder!]
  ) {
    node(id: $userId) {
      ... on User {
        areas {
          edges {
            node {
              customers(where: { id: $id }) {
                edges {
                  node {
                    id
                    name
                    createdBy {
                      name
                    }
                    updatedAt
                    ownerType
                    industry
                    size
                    contactPerson
                    contactPersonPosition
                    contactPersonPhone
                    contactPersonEmail
                    sales {
                      name
                    }
                    area {
                      name
                    }
                    tenders {
                      edges {
                        __id
                      }
                    }
                    visitRecords(orderBy: $orderBy) {
                      edges {
                        __id
                      }
                    }
                    ...customersVisitRecordListFragment
                    ...customersTenderListFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const VisitRecordListFragment = graphql`
  fragment customersVisitRecordListFragment on Customer {
    visitRecords(orderBy: $orderBy) {
      edges {
        node {
          id
          date
          visitType
          commPeople
          commContent
          nextStep
          tender {
            id
            name
          }
        }
      }
    }
  }
`;

const TenderListFragment = graphql`
  fragment customersTenderListFragment on Customer {
    tenders {
      edges {
        node {
          id
          ...tenderListItemFragment
        }
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<customersDetailPageQuery>(
    query,
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
        title="找不到資料"
        subTitle="抱歉，找不到相關資料。"
        // extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return (
    <>
      <Card
        title={
          <Descriptions
            title={customer.name}
            items={[
              {
                key: "ownerType",
                label: "業主類型",
                children: ownerTypeText(customer.ownerType),
              },
              {
                key: "industry",
                label: "產業",
                children: industryText(customer.industry),
              },
              { key: "size", label: "規模", children: customer.size },
              {
                key: "area",
                label: "地區",
                children: customer.area.name,
              },
              {
                key: "sales",
                label: "客戶所有人",
                children: customer.sales?.name,
              },
              {
                key: "createdBy",
                label: "建立者",
                children: customer.createdBy.name,
              },
              {
                key: "updatedAt",
                label: "更新時間",
                children: dayjs(customer.updatedAt).format("LLL"),
              },
            ]}
          />
        }
        onTabChange={(key) => setActiveTab(key)}
        tabProps={{ style: { marginTop: 12 } }}
        tabList={[
          {
            key: "1",
            tab: `項目列表 (${customer.tenders.edges?.length || 0})`,
          },
          {
            key: "2",
            tab: `拜訪記錄 (${customer.visitRecords.edges?.length || 0})`,
          },
        ]}
      >
        {activeTab === "1" && <TenderList queryRef={customer} />}
        {activeTab === "2" && <VisitRecordList queryRef={customer} />}
      </Card>
      {/* <pre>{JSON.stringify(customer, null, 2)}</pre> */}
    </>
  );
}

function TenderList({
  queryRef,
}: {
  queryRef: customersTenderListFragment$key;
}) {
  const data = useFragment(TenderListFragment, queryRef);
  return (
    <List
      itemLayout="vertical"
      dataSource={data.tenders.edges?.map((e) => e?.node)}
      renderItem={(node) =>
        node && <TenderListItem key={node.id} queryRef={node} />
      }
    />
  );
}

function VisitRecordList({
  queryRef,
}: {
  queryRef: customersVisitRecordListFragment$key;
}) {
  const data = useFragment(VisitRecordListFragment, queryRef);
  return (
    <div className="space-y-6">
      <List
        dataSource={data.visitRecords.edges?.map((e) => e?.node)}
        rowKey={(node) => node?.id!}
        renderItem={(node) =>
          node && (
            <Descriptions
              key={node.id}
              layout="vertical"
              bordered
              className="py-4"
              items={[
                {
                  key: "date",
                  label: "日期",
                  children: dayjs(node.date).format("LL"),
                },
                {
                  key: "visitType",
                  label: "拜訪類型",
                  children: visitTypeText(node.visitType),
                },
                {
                  key: "commPeople",
                  label: "溝通人員",
                  children: node.commPeople,
                },
                {
                  key: "commContent",
                  label: "溝通內容",
                  children: node.commContent,
                  span: 3,
                },
                {
                  key: "nextStep",
                  label: "下一步",
                  children: node.nextStep,
                  span: 3,
                },
              ]}
            />
          )
        }
      />
    </div>
  );
}

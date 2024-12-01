import { createLazyFileRoute } from "@tanstack/react-router";
import { customersDetailPageQuery } from "__generated__/customersDetailPageQuery.graphql";
import { customersTenderListFragment$key } from "__generated__/customersTenderListFragment.graphql";
import { customersVisitRecordListFragment$key } from "__generated__/customersVisitRecordListFragment.graphql";
import { Card, Descriptions, List, Result, Typography } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { TenderListItem } from "~/components/portal/tender-list-item";
import {
  customerSizeText,
  industryText,
  ownerTypeText,
  visitTypeText,
} from "~/lib/helper";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/customers/$id",
)({
  component: RouteComponent,
});

const query = graphql`
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
                    tenders(first: $first, last: $last)
                      @connection(key: "customersTenderListFragment_tenders") {
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
                    ...customersVisitRecordListFragment
                    ...customersTenderListFragment
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
  fragment customersTenderListFragment on Customer
  @argumentDefinitions(first: { type: Int }, last: { type: Int }) {
    tenders(first: $first, last: $last)
      @connection(key: "customersTenderListFragment_tenders") {
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
        title="找不到该客户资料"
        subTitle="请检查链接是否正确"
        // extra={<Button type="primary">Back Home</Button>}
      />
    );
  }

  return (
    <>
      <Card
        title={
          <Descriptions
            title={
              <Typography.Title level={4}>{customer.name}</Typography.Title>
            }
            items={[
              {
                key: "ownerType",
                label: "业主类型",
                children: ownerTypeText(customer.ownerType),
              },
              {
                key: "industry",
                label: "行业",
                children: industryText(customer.industry),
              },
              {
                key: "size",
                label: "规模",
                children: customerSizeText(customer.size),
              },
              {
                key: "area",
                label: "地区",
                children: customer.area.name,
              },
              {
                key: "sales",
                label: "客户所有人",
                children: customer.sales?.name,
              },
              {
                key: "contactPerson",
                label: "联系人",
                children: customer.contactPerson,
              },
              {
                key: "contactPersonPosition",
                label: "联系人职位",
                children: customer.contactPersonPosition,
              },
              {
                key: "contactPersonPhone",
                label: "联系人电话",
                children: customer.contactPersonPhone,
              },
              {
                key: "contactPersonEmail",
                label: "联系人邮箱",
                children: customer.contactPersonEmail,
              },
              {
                key: "createdBy",
                label: "创建者",
                children: customer.createdBy.name,
              },
              {
                key: "updatedAt",
                label: "更新时间",
                children: dayjs(customer.updatedAt).format("LLL"),
              },
            ]}
          />
        }
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
      rowKey={(node) => node?.id || ""}
      renderItem={(node) => node && <TenderListItem queryRef={node} />}
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
        rowKey={(node) => node?.id || ""}
        renderItem={(node) =>
          node && (
            <Descriptions
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
                  label: "拜访类型",
                  children: visitTypeText(node.visitType),
                },
                {
                  key: "commPeople",
                  label: "沟通人员",
                  children: node.commPeople,
                },
                {
                  key: "commContent",
                  label: "沟通内容",
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

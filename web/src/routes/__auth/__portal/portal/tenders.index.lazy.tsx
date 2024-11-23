import {
  createLazyFileRoute,
  Link,
  notFound,
  useRouterState,
} from "@tanstack/react-router";
import { tendersAreaTenderListFragment$key } from "__generated__/tendersAreaTenderListFragment.graphql";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import { Badge, Button, Form, Input, List, Tag, Typography } from "antd";
import { useState } from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { tenderStatus } from "~/lib/helper";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/")({
  component: RouteComponent,
});

const query = graphql`
  query tendersPageQuery($userId: ID!) {
    node(id: $userId) {
      ... on User {
        ...tendersAreaTenderListFragment
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<tendersPageQuery>(
    query,
    Route.useLoaderData(),
  );

  if (!data.node) {
    return <List />;
  }

  return (
    <>
      <TenderList dataRef={data.node} />
    </>
  );
}

const tenderFragment = graphql`
  fragment tendersAreaTenderListFragment on User {
    areas {
      tenders {
        id
        name
        status
        createdAt
        estimatedAmount
        customer {
          name
        }
        images
        fullAddress
        tenderDate
        discoveryDate
        area {
          name
        }
      }
    }
  }
`;

function TenderList({
  dataRef,
}: {
  dataRef?: tendersAreaTenderListFragment$key;
}) {
  const data = useFragment(tenderFragment, dataRef);
  const [searchText, setSearchText] = useState("");

  const dataSource = data?.areas
    ?.flatMap((area) => area.tenders)
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );

  return (
    <div className="my-4 min-h-80 rounded-lg bg-white p-6">
      {/* <div className="flex items-center justify-between">
        <Typography.Title level={2}>商机</Typography.Title>
      </div> */}
      <div>
        <Form.Item className="max-w-sm">
          <Input.Search
            placeholder="搜索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            type="search"
          />
        </Form.Item>
      </div>
      <List
        // pagination={{ pageSize: 20, position: "both" }}
        pagination={{ position: "both" }}
        itemLayout="vertical"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            className="-mx-6"
            actions={[
              <Link
                key="edit-link"
                to="/portal/tenders/$id"
                params={{ id: item!.id }}
              >
                <Button type="link" size="small" disabled>
                  修改
                </Button>
              </Link>,
              <Link
                key="draw-link"
                to="/portal/tenders/$id"
                params={{ id: item!.id }}
              >
                <Button type="link" size="small">
                  地塊
                </Button>
              </Link>,
              // <a key="list-loadmore-more">more</a>,
            ]}
            extra={
              <div className="aspect-[4/3] max-w-[180px]">
                <img
                  alt={item?.name}
                  className="h-full w-full rounded-lg"
                  src={item?.images?.[0] || ""}
                />
              </div>
            }
          >
            {/* <Skeleton avatar title={false} loading={item.loading} active> */}
            <List.Item.Meta
              title={<div>{item?.name}</div>}
              description={item?.fullAddress}
            />
            <div>
              <Tag>{item?.area.name}</Tag>
              <Tag>{tenderStatus(item?.status)}</Tag>
            </div>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    </div>
  );
}

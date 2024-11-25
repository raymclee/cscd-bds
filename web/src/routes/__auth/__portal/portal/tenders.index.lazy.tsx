import {
  createLazyFileRoute,
  Link,
  notFound,
  useRouterState,
} from "@tanstack/react-router";
import {
  tendersAreaTenderListFragment$data,
  tendersAreaTenderListFragment$key,
} from "__generated__/tendersAreaTenderListFragment.graphql";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import {
  App,
  Badge,
  Button,
  Form,
  Input,
  List,
  Popconfirm,
  Tag,
  Typography,
} from "antd";
import { useState } from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusText } from "~/lib/helper";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/")({
  component: RouteComponent,
});

const query = graphql`
  query tendersPageQuery($userId: ID!) {
    node(id: $userId) {
      ... on User {
        ...tendersAreaTenderListFragment @alias(as: "areaTenders")
      }
    }
  }
`;

function RouteComponent() {
  const data = usePreloadedQuery<tendersPageQuery>(
    query,
    Route.useLoaderData(),
  );

  if (!data.node?.areaTenders) {
    return <List />;
  }

  return (
    <>
      <TenderList dataRef={data.node.areaTenders} />
    </>
  );
}

export const TendersAreaTenderListFragment = graphql`
  fragment tendersAreaTenderListFragment on User
  @argumentDefinitions(
    orderBy: {
      type: "TenderOrder"
      defaultValue: { field: CREATED_AT, direction: ASC }
    }
  ) {
    areas {
      edges {
        node {
          tenders(orderBy: $orderBy) {
            edges {
              node {
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
  const data = useFragment(TendersAreaTenderListFragment, dataRef);
  const [searchText, setSearchText] = useState("");

  const dataSource = data?.areas.edges
    ?.flatMap((area) => area?.node?.tenders.edges?.map((t) => t?.node))
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );

  return (
    <div className="my-4 min-h-80 rounded-lg bg-white p-6">
      {/* <div className="flex items-center justify-between">
        <Typography.Title level={2}>商机</Typography.Title>
      </div> */}
      <div className="flex items-center justify-between">
        <Form.Item noStyle>
          <Input.Search
            className="w-72"
            placeholder="搜索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            type="search"
          />
        </Form.Item>
        <Link to="/portal/tenders/new">
          <Button type="primary">新增</Button>
        </Link>
      </div>
      <List
        // pagination={{ pageSize: 20, position: "both" }}
        pagination={{ position: "both" }}
        itemLayout="vertical"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
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
              <DeleteButton key="delete" id={item?.id} />,
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
              <Tag>{tenderStatusText(item?.status)}</Tag>
            </div>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    </div>
  );
}

function DeleteButton({ id }: { id?: string }) {
  const { message } = App.useApp();
  const [commit, inFlight] = useDeleteTenderMutation();
  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() => {
        if (!id) return;
        commit({
          variables: { id },
          onCompleted() {
            message.success("删除成功");
          },
          onError() {
            message.error("删除失败");
          },
          updater: (store) => {
            store.delete(id);
          },
        });
      }}
    >
      <Button disabled={inFlight} danger type="link" size="small">
        删除
      </Button>
    </Popconfirm>
  );
}

import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import { tendersTenderListFragment$key } from "__generated__/tendersTenderListFragment.graphql";
import { Button, Form, Input, List } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { TenderListItem } from "~/components/portal/tender-list-item";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<tendersPageQuery>(
    graphql`
      query tendersPageQuery($userId: ID!, $orderBy: TenderOrder, $first: Int) {
        node(id: $userId) {
          ... on User {
            ...tendersTenderListFragment
              @alias(as: "areaTenders")
              @arguments(orderBy: $orderBy, first: $first)
          }
        }
      }
    `,
    Route.useLoaderData(),
  );

  if (!data.node?.areaTenders) {
    return <List />;
  }

  return (
    <>
      <TenderList queryRef={data.node.areaTenders} />
    </>
  );
}

function TenderList({
  queryRef,
}: {
  queryRef?: tendersTenderListFragment$key;
}) {
  const data = useFragment(
    graphql`
      fragment tendersTenderListFragment on User
      @argumentDefinitions(
        orderBy: {
          type: "TenderOrder"
          defaultValue: { field: CREATED_AT, direction: DESC }
        }
        first: { type: "Int" }
        last: { type: "Int" }
      ) {
        areas {
          edges {
            node {
              tenders(orderBy: $orderBy, first: $first, last: $last)
                @connection(key: "TendersTenderListFragment_tenders") {
                totalCount
                edges {
                  node {
                    id
                    name
                    ...tenderListItemFragment
                  }
                }
              }
            }
          }
        }
      }
    `,
    queryRef,
  );

  const [searchText, setSearchText] = useState("");
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const perPage = 10;
  const currentPage = searchParams.page;

  const totalCount =
    data?.areas.edges?.reduce(
      (acc, inc) => acc + (inc?.node?.tenders.totalCount || 0),
      0,
    ) ?? 0;
  const dataSource = data?.areas.edges
    ?.flatMap((area) => area?.node?.tenders.edges?.map((t) => t?.node))
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
  //  data?.areas.edges.map(e => e?.node).map(t => t?.tenders.edges?.map(e => e?.node))

  return (
    <div className="min-h-80">
      {/* <div className="flex items-center justify-between">
    <Typography.Title level={2}>商机</Typography.Title>
  </div> */}
      <div className="mb-4 flex items-center justify-between">
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
          <Button type="primary" icon={<Plus size={16} />}>
            添加商机
          </Button>
        </Link>
      </div>

      <List
        pagination={{
          position: "both",
          showSizeChanger: true,
          current: currentPage,
          onChange(page, pageSize) {
            navigate({
              to: ".",
              search: { page },
            });
          },
        }}
        dataSource={dataSource}
        itemLayout="vertical"
        className="rounded-lg bg-white px-4 pb-6 pt-px"
        renderItem={(node) =>
          node && <TenderListItem key={node?.id} queryRef={node} />
        }
      />
    </div>
  );
}

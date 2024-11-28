import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import { tendersTenderListFragment$key } from "__generated__/tendersTenderListFragment.graphql";
import { App, Button, Form, Input, List, Popconfirm, Tag } from "antd";
import { useState } from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { TenderListItem } from "~/components/tender-list-item";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusText } from "~/lib/helper";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/")({
  component: RouteComponent,
});

const query = graphql`
  query tendersPageQuery($userId: ID!, $orderBy: TenderOrder) {
    node(id: $userId) {
      ... on User {
        ...tendersTenderListFragment
          @alias(as: "areaTenders")
          @arguments(orderBy: $orderBy)
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
      <TenderList queryRef={data.node.areaTenders} />
    </>
  );
}

export const TendersTenderListFragment = graphql`
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
            edges {
              node {
                id
                name
                ...tenderListItemFragment @alias(as: "tender")
              }
            }
          }
        }
      }
    }
  }
`;

function TenderList({
  queryRef,
}: {
  queryRef?: tendersTenderListFragment$key;
}) {
  const [searchText, setSearchText] = useState("");

  const data = useFragment(TendersTenderListFragment, queryRef);
  const dataSource = data?.areas.edges
    ?.flatMap((area) => area?.node?.tenders.edges?.map((t) => t?.node))
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
    );
  //  data?.areas.edges.map(e => e?.node).map(t => t?.tenders.edges?.map(e => e?.node))

  return (
    <div className="min-h-80 rounded-lg bg-white p-6">
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
      {dataSource && dataSource?.length > 0 ? (
        <List pagination={{ position: "both" }} itemLayout="vertical">
          {dataSource?.map(
            (node) =>
              node?.tender && (
                <TenderListItem key={node?.id} queryRef={node?.tender} />
              ),
          )}
        </List>
      ) : (
        <List />
      )}
    </div>
  );
}

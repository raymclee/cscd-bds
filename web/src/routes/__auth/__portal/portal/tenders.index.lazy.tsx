import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import { tendersTenderListFragment$key } from "__generated__/tendersTenderListFragment.graphql";
import { Button, Form, Input, List, Select } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { TenderListItem } from "~/components/portal/tender-list-item";
import { tenderStatusOptions } from "~/lib/helper";
import { canEdit } from "~/lib/permission";

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
              id
              code
              name
              tenders(orderBy: $orderBy, first: $first, last: $last)
                @connection(key: "tendersTenderListFragment_tenders") {
                __id
                edges {
                  node {
                    id
                    name
                    status
                    area {
                      id
                      code
                    }
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

  // const [searchText, setSearchText] = useState("");
  const { session } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const searchText = searchParams.q || "";
  const statusFilter = searchParams.status;
  const areaFilter = searchParams.area;

  const dataSource = data?.areas.edges
    ?.flatMap((area) => area?.node?.tenders.edges?.map((t) => t?.node))
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase()),
    )
    .filter((t) => statusFilter === undefined || t?.status === statusFilter)
    .filter((t) => areaFilter === undefined || t?.area?.code === areaFilter);
  const moreThanOneArea = (data?.areas.edges ?? []).length > 1;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Form.Item label="搜索" className="mb-0">
            <Input.Search
              placeholder="搜索"
              value={searchText}
              onChange={(e) => {
                navigate({
                  to: ".",
                  search: { q: e.target.value },
                  replace: true,
                });
              }}
              allowClear
              type="search"
            />
          </Form.Item>
          <Form.Item label="状态" className="mb-0 w-36">
            <Select
              placeholder="状态"
              value={statusFilter}
              onSelect={(value) => {
                navigate({
                  to: ".",
                  search: { status: value },
                  replace: true,
                });
                // setStatusFilter(value);
              }}
              allowClear
              onClear={() => {
                navigate({ to: ".", replace: true });
              }}
              options={tenderStatusOptions}
            />
          </Form.Item>
          {moreThanOneArea && (
            <Form.Item label="区域" className="mb-0 w-36">
              <Select
                placeholder="区域"
                value={areaFilter}
                onSelect={(value) => {
                  navigate({
                    to: ".",
                    search: { area: value },
                    replace: true,
                  });
                }}
                allowClear
                onClear={() => {
                  navigate({ to: ".", replace: true });
                }}
                options={data?.areas.edges?.map((area) => ({
                  label: area?.node?.name,
                  value: area?.node?.code,
                }))}
              ></Select>
            </Form.Item>
          )}
        </div>

        {canEdit(session) && (
          <Link to="/portal/tenders/new">
            <Button type="primary" icon={<Plus size={16} />}>
              添加商机
            </Button>
          </Link>
        )}
      </div>

      <List
        pagination={{
          position: "both",
          showSizeChanger: true,
          current: searchParams.page,
          onChange(page) {
            navigate({
              to: ".",
              search: (prev) => ({ ...prev, page }),
            });
          },
          responsive: true,
        }}
        dataSource={dataSource}
        itemLayout="vertical"
        className="rounded-lg bg-white px-4 pb-6 pt-px"
        renderItem={(node) =>
          node && <TenderListItem key={node?.id} queryRef={node} />
        }
      />
    </>
  );
}

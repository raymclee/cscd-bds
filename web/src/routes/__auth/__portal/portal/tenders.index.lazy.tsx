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
import { useDebounceCallback } from "usehooks-ts";
import { ListFilter } from "~/components/portal/list-filter";

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

  return (
    <>
      <ListFilter
        showStatus
        areas={data?.areas.edges?.map((a) => ({
          label: a?.node?.name ?? "",
          value: a?.node?.code ?? "",
        }))}
      >
        {canEdit(session) && (
          <Link to="/portal/tenders/new" className="w-full md:w-auto">
            <Button
              type="primary"
              icon={<Plus size={16} />}
              className="w-full md:w-auto"
            >
              添加商机
            </Button>
          </Link>
        )}
      </ListFilter>

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

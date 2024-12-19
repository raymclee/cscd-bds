import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";
import { tendersPageQuery } from "__generated__/tendersPageQuery.graphql";
import { tendersTenderListFragment$key } from "__generated__/tendersTenderListFragment.graphql";
import { Button, List } from "antd";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { ListFilter } from "~/components/portal/list-filter";
import { TenderListItem } from "~/components/portal/tender-list-item";
import { canEdit } from "~/lib/permission";

export const Route = createLazyFileRoute("/_auth/_portal/portal/tenders")({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<tendersPageQuery>(
    graphql`
      query tendersPageQuery(
        $userId: ID!
        $orderBy: [TenderOrder!]
        $first: Int
      ) {
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
        orderBy: { type: "[TenderOrder!]" }
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
                    tenderClosingDate
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

  const { session } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const searchParams = Route.useSearch();
  const searchText = searchParams.q || "";
  const statusFilter = searchParams.status;
  const areaFilter = searchParams.area;
  const closingDateFilter = searchParams.closing_date;

  const dataSource = data?.areas.edges
    ?.flatMap((area) => area?.node?.tenders.edges?.map((t) => t?.node))
    .filter((t) =>
      t?.name.toLocaleLowerCase().includes(searchText?.toLocaleLowerCase()),
    )
    .filter((t) => statusFilter === undefined || t?.status === statusFilter)
    .filter((t) => areaFilter === undefined || t?.area?.code === areaFilter)
    .sort((a, b) => {
      if (a?.tenderClosingDate === null && b?.tenderClosingDate === null) {
        return 0;
      }
      if (a?.tenderClosingDate === null) {
        return 1;
      }
      if (b?.tenderClosingDate === null) {
        return -1;
      }
      if (closingDateFilter === "asc") {
        return dayjs(a?.tenderClosingDate).diff(dayjs(b?.tenderClosingDate));
      } else if (closingDateFilter === "desc") {
        return dayjs(b?.tenderClosingDate).diff(dayjs(a?.tenderClosingDate));
      }
      return 0;
    });

  const isGAOrHW = data?.areas.edges?.some(
    (a) => a?.node?.code === "GA" || a?.node?.code === "HW",
  );

  return (
    <>
      <ListFilter
        showStatus
        showTenderClosingDate={isGAOrHW}
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
          showTotal: (total) => `共 ${total} 条`,
        }}
        dataSource={dataSource}
        itemLayout="vertical"
        className="rounded-lg bg-white px-4 pb-6 pt-px"
        renderItem={(node) =>
          node && <TenderListItem key={node?.id} tender={node} />
        }
      />
      <Outlet />
    </>
  );
}

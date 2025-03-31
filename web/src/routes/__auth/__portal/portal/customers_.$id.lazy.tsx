import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { customersDetailPageQuery } from "__generated__/customersDetailPageQuery.graphql";
import { Card, Result, Tag, Timeline } from "antd";
import dayjs from "dayjs";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { CustomerDetail } from "~/components/portal/customer-detail";
import { CustomerTenderList } from "~/components/portal/customer-tender-list";
import { CustomerVisitRecordList } from "~/components/portal/customer-visit-record-list";
import { ScrollArea } from "~/components/ui/scroll-area";
import { approvalStatusText } from "~/lib/helper";
import { approvalStatusTagColor } from "~/lib/helper";
import { cn } from "~/lib/utils";

export const Route = createLazyFileRoute(
  "/__auth/__portal/portal/customers_/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<customersDetailPageQuery>(
    graphql`
      query customersDetailPageQuery(
        $id: ID!
        $first: Int
        $last: Int
        $userId: ID! # $orderBy: [VisitRecordOrder!]!
      ) # $where: VisitRecordWhereInput
      {
        node(id: $id) {
          ... on Customer {
            id
            sales {
              id
            }
            activeProfile {
              id
              name
              createdAt
              createdBy {
                name
              }
              updatedAt
              ownerType
              industry
              size
              approvalStatus
              contactPerson
              contactPersonPosition
              contactPersonPhone
              contactPersonEmail
            }
            pendingProfile {
              id
              name
              createdAt
              createdBy {
                name
              }
              updatedAt
              ownerType
              industry
              size
              approvalStatus
              contactPerson
              contactPersonPosition
              contactPersonPhone
              contactPersonEmail
            }
            profiles(orderBy: [{ field: CREATED_AT, direction: DESC }]) {
              edges {
                node {
                  id
                  name
                  createdAt
                  createdBy {
                    name
                  }
                  updatedAt
                  ownerType
                  industry
                  size
                  approvalStatus
                  contactPerson
                  contactPersonPosition
                  contactPersonPhone
                  contactPersonEmail

                  approver {
                    id
                    name
                  }
                }
              }
            }
            ...customerDetailFragment
            ...customerTenderListFragment @arguments(first: $first, last: $last)
          }
        }

        user: node(id: $userId) {
          ... on User {
            tenders: myTenders(
              first: $first
              last: $last
              where: { hasCustomerWith: { id: $id } }
            ) @connection(key: "customerTenderListFragment_tenders") {
              edges {
                __id
              }
            }

            # visitRecords: myVisitRecords(
            #   first: $first
            #   last: $last
            #   orderBy: $orderBy
            #   where: $where
            # ) @connection(key: "customerVisitRecordListFragment_visitRecords") {
            #   edges {
            #     __id
            #   }
            # }

            # ...customerVisitRecordListFragment
            #   @arguments(
            #     first: $first
            #     last: $last
            #     orderBy: $orderBy
            #     where: $where
            #   )
          }
        }
      }
    `,
    Route.useLoaderData(),
  );
  const tab = Route.useSearch({ select: (state) => state.tab });
  const selectedProfile = Route.useSearch({
    select: (state) =>
      data.node?.profiles?.edges?.find((e) => e?.node?.id === state.p)?.node,
  });
  const navigate = Route.useNavigate();
  const customer = data.node;

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
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-4">
      <Card
        className="py-2 lg:col-span-2 xl:col-span-3"
        title={
          <CustomerDetail
            customer={customer}
            // showContact={
            //   session.userId == customer.sales?.id || session.isAdmin
            // }
            showContact
          />
        }
        activeTabKey={String(tab)}
        onTabChange={(key) =>
          navigate({ to: ".", search: { tab: Number(key) }, replace: true })
        }
        tabProps={{ style: { marginTop: 12 }, size: "small" }}
        tabList={[
          {
            key: "1",
            tab: `项目列表 (${data.user?.tenders?.edges?.length || 0})`,
          },
          // {
          //   key: "2",
          //   tab: `拜访记录 (${data.user?.visitRecords?.edges?.length || 0})`,
          // },
        ]}
      >
        {tab === 1 && <CustomerTenderList customer={customer} />}
        {/* {tab === 2 && data.user && <CustomerVisitRecordList user={data.user} />} */}
      </Card>

      <div className={cn("self-start mt-8 top-28 lg:sticky")}>
        <ScrollArea className={cn("h-[calc(100vh-128px)]")}>
          <Timeline
            mode="left"
            className="py-2 pr-4 lg:-ml-28"
            items={customer.profiles?.edges?.map((e, i) => {
              const isFirst =
                customer.profiles?.edges &&
                i == customer.profiles?.edges?.length - 1;
              const action = isFirst ? "创建了" : "更新了";
              const isPending = e?.node?.approvalStatus == 1;
              const isApproved = e?.node?.approvalStatus == 2;
              const isRejected = e?.node?.approvalStatus == 3;
              const isCancelled = e?.node?.approvalStatus == 4;
              const isActive = customer.activeProfile?.id === e?.node?.id;
              return {
                color: isActive ? undefined : "gray",
                // label: isActive ? (
                //   <Tag color="blue">当前</Tag>
                // ) : isPending ? (
                //   <Tag color="green">待审批</Tag>
                // ) : (
                //   <Tag color={approvalStatusTagColor(e?.node?.approvalStatus)}>
                //     {approvalStatusText(e?.node?.approvalStatus)}
                //   </Tag>
                // ),
                label: (
                  <div>
                    {isActive && <Tag color="blue">当前</Tag>}
                    {isPending && <Tag color="green">待审批</Tag>}
                    {isApproved && <Tag color="green">已审批</Tag>}
                    {isRejected && <Tag color="red">已拒绝</Tag>}
                    {isCancelled && <Tag color="red">已取消</Tag>}
                  </div>
                ),
                children: (
                  <Link
                    to="."
                    search={(prev) => ({ ...prev, p: e?.node?.id })}
                    preload={false}
                    className="flex flex-col gap-1"
                    activeOptions={{
                      includeSearch: true,
                    }}
                    activeProps={{ className: "font-bold" }}
                    replace
                    onClick={() => {
                      if (selectedProfile?.id) {
                        navigate({
                          to: ".",
                          search: (prev) => ({ ...prev, p: undefined }),
                          replace: true,
                        });
                      }
                    }}
                  >
                    <div className="flex gap-1 py-0.5 text-sm text-gray-500">
                      <span>{dayjs(e?.node?.createdAt).format("LLL")}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {`${e?.node?.createdBy?.name} ${action}商机`}
                    </div>
                    {isApproved && (
                      <div className="text-sm text-gray-500">
                        {e?.node?.approver?.name || "系统"} 批核了
                      </div>
                    )}
                    {isRejected && (
                      <div className="text-sm text-gray-500">
                        {e?.node?.approver?.name || "系统"} 拒绝了
                      </div>
                    )}
                  </Link>
                ),
              };
            })}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

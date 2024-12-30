import { createLazyFileRoute } from '@tanstack/react-router'
import { customersDetailPageQuery } from '__generated__/customersDetailPageQuery.graphql'
import { Card, Result } from 'antd'
import * as React from 'react'
import { usePreloadedQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { CustomerDetail } from '~/components/portal/customer-detail'
import { CustomerTenderList } from '~/components/portal/customer-tender-list'
import { CustomerVisitRecordList } from '~/components/portal/customer-visit-record-list'

export const Route = createLazyFileRoute(
  '/__auth/__portal/portal/customers_/$id',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const data = usePreloadedQuery<customersDetailPageQuery>(
    graphql`
      query customersDetailPageQuery(
        $id: ID!
        $orderBy: VisitRecordOrder
        $first: Int
        $last: Int
      ) {
        node(id: $id) {
          ... on Customer {
            id
            sales {
              id
            }
            tenders(first: $first, last: $last)
              @connection(key: "customerTenderListFragment_tenders") {
              edges {
                __id
              }
            }
            visitRecords(first: $first, last: $last, orderBy: $orderBy)
              @connection(key: "customerVisitRecordListFragment_visitRecords") {
              edges {
                __id
              }
            }
            ...customerDetailFragment
            ...customerVisitRecordListFragment
              @arguments(first: $first, last: $last, orderBy: $orderBy)
            ...customerTenderListFragment @arguments(first: $first, last: $last)
          }
        }
      }
    `,
    Route.useLoaderData(),
  )
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()
  const customer = data.node

  if (!customer) {
    return (
      <Result
        status="404"
        title="找不到该客户资料"
        subTitle="请检查链接是否正确"
        // extra={<Button type="primary">Back Home</Button>}
      />
    )
  }

  return (
    <>
      <Card
        className="py-2"
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
          navigate({ to: '.', search: { tab: Number(key) }, replace: true })
        }
        tabProps={{ style: { marginTop: 12 }, size: 'small' }}
        tabList={[
          {
            key: '1',
            tab: `项目列表 (${customer.tenders?.edges?.length || 0})`,
          },
          {
            key: '2',
            tab: `拜访记录 (${customer.visitRecords?.edges?.length || 0})`,
          },
        ]}
      >
        {tab === 1 && <CustomerTenderList customer={customer} />}
        {tab === 2 && <CustomerVisitRecordList customer={customer} />}
      </Card>
    </>
  )
}

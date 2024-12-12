import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { tendersDetailPageQuery } from '__generated__/tendersDetailPageQuery.graphql'
import { Result } from 'antd'
import { graphql, usePreloadedQuery } from 'react-relay'
import { TenderDetail } from '~/components/portal/tender-detail'

export const Route = createLazyFileRoute('/_auth/_portal/portal/tenders_/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = usePreloadedQuery<tendersDetailPageQuery>(
    graphql`
      query tendersDetailPageQuery($id: ID!, $userId: ID!) {
        node(id: $id) {
          ...tenderDetailFragment
        }

        user: node(id: $userId) {
          ...tenderFormFragment
        }
      }
    `,
    Route.useLoaderData(),
  )

  if (!data.node || !data.user) {
    return (
      <Result
        status="404"
        title="找不到该招标信息"
        subTitle="请检查链接是否正确"
      />
    )
  }

  return (
    <>
      <TenderDetail queryRef={data.node} />
    </>
  )
}

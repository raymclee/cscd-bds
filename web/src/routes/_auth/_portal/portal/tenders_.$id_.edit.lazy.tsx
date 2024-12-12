import { createLazyFileRoute } from '@tanstack/react-router'
import { tendersEditPageQuery } from '__generated__/tendersEditPageQuery.graphql'
import { Result } from 'antd'
import { graphql, usePreloadedQuery } from 'react-relay'
import { TenderForm } from '~/components/portal/tender-form'

export const Route = createLazyFileRoute(
  '/_auth/_portal/portal/tenders_/$id_/edit',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const data = usePreloadedQuery<tendersEditPageQuery>(
    graphql`
      query tendersEditPageQuery($id: ID!, $userId: ID!) {
        tender: node(id: $id) {
          ...tenderDetailFragment
        }

        user: node(id: $userId) {
          ...tenderFormFragment
        }
      }
    `,
    Route.useLoaderData(),
  )

  if (!data.tender || !data.user) {
    return (
      <Result
        status="404"
        title="找不到该招标信息"
        subTitle="请检查链接是否正确"
      />
    )
  }

  return <TenderForm queryRef={data.user} tenderRef={data.tender} />
}

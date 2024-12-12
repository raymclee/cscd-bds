import { createLazyFileRoute, notFound } from '@tanstack/react-router'
import { tendersNewTenderPageQuery } from '__generated__/tendersNewTenderPageQuery.graphql'
import { graphql, usePreloadedQuery } from 'react-relay'
import { TenderForm } from '~/components/portal/tender-form'

export const Route = createLazyFileRoute('/_auth/_portal/portal/tenders_/new')({
  component: RouteComponent,
})

const TendersNewTenderPageQuery = graphql`
  query tendersNewTenderPageQuery($userId: ID!) {
    node(id: $userId) {
      ...tenderFormFragment
    }
  }
`

function RouteComponent() {
  const preload = Route.useLoaderData()
  const data = usePreloadedQuery<tendersNewTenderPageQuery>(
    TendersNewTenderPageQuery,
    preload,
  )

  if (!data.node) throw notFound()

  return (
    <>
      <TenderForm queryRef={data?.node} />
    </>
  )
}

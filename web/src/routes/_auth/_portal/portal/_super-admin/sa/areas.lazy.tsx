import { createLazyFileRoute } from '@tanstack/react-router'
import { areasRouteQuery } from '__generated__/areasRouteQuery.graphql'
import { Button, Table } from 'antd'
import { Plus } from 'lucide-react'
import { graphql, usePreloadedQuery } from 'react-relay'
import { ListFilter } from '~/components/portal/list-filter'

export const Route = createLazyFileRoute(
  '/_auth/_portal/portal/_super-admin/sa/areas',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const data = usePreloadedQuery<areasRouteQuery>(
    graphql`
      query areasRouteQuery {
        areas {
          edges {
            node {
              id
              name
              code
            }
          }
        }
      }
    `,
    Route.useLoaderData(),
  )
  const navigate = Route.useNavigate()
  const searchParams = Route.useSearch()
  const searchText = searchParams.q || ''

  const dataSource = data.areas.edges?.map((edge) => edge?.node)

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '编码',
      dataIndex: 'code',
    },
  ]

  return (
    <>
      <ListFilter>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          className="w-full md:w-auto"
        >
          添加地区
        </Button>
      </ListFilter>

      <Table
        dataSource={dataSource}
        // @ts-ignore
        columns={columns}
        rowKey={'id'}
        pagination={{
          current: searchParams.page,
          onChange(page) {
            navigate({
              to: '.',
              search: (prev) => ({ ...prev, page }),
            })
          },
        }}
      />
    </>
  )
}
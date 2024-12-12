import * as React from 'react'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { Modal } from 'antd'

export const Route = createLazyFileRoute(
  '/_auth/_portal/portal/tenders/$id/result',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  return (
    <>
      <Modal
        className="h-30 w-40"
        title="Basic Modal"
        open={true}
        onOk={() => {
          navigate({ to: '/portal/tenders', resetScroll: false })
        }}
        onCancel={() => {
          navigate({ to: '/portal/tenders', resetScroll: false })
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

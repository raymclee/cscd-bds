import { createLazyFileRoute } from '@tanstack/react-router'
import { Result } from 'antd'

export const Route = createLazyFileRoute('/access-denied')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result status="403" title="403" subTitle="抱歉，您无权访问此页面。" />
    </div>
  )
}

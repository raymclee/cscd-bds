import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_portal')({
  beforeLoad: ({ context: { session } }) => {
    if (!session) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/_portal/_portal!'
}

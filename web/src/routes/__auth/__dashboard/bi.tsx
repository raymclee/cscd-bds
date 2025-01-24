import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/__auth/__dashboard/bi')({
  component: RouteComponent,
})

// const url = "http://localhost:3000/830bi";

function RouteComponent() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-full">
      {loading && (
        <div className="flex min-h-full items-center justify-center pt-[20vh]">
          <Loader className="animate-spin" />
        </div>
      )}
      <iframe
        className="min-h-screen w-full"
        src={`/webroot/decision/data/portal/f12fb24d-7dcb-4c1b-adc2-0edc4c7372f8/common/view?ssoToken=${encodeURIComponent(
          'USG61d9ijEXoQnmkuZiH0Rw8Dsoelgxs68GsELkRyalKQGtjgto/5SYfE+aKlU8LqYT9XIlx7mx9L9AYt4q0Vx0cEVU+caczz+cDyTdZspjzKQNR3BdjLZlbqzjAXBIiQpX42w+W91hNZHMQ6hnBFOIoXZzqXI3mOJrgqpY+cMS/Aj9P95B/Kzdoq5Sppu8pYk3m0/6VUf/TrIVWxdbukPjc4futytsqtYAxvICqDbgTbJveCDer5AyC9jnX0j/XqmZ7SHAc9BDsAHfvMY1/HsvvjPui4qk+PjrQkewGyIym434fhN/vhXUyQ9Gj4TTNwissdbznCXTjeeA/f34mSw==',
        )}`}
        onLoad={() => setLoading(false)}
      />
      {/* <DangrousElement markup={markup} /> */}
    </div>
  )
}

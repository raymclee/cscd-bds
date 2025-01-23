import { createFileRoute } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/__auth/__dashboard/bi')({
  component: RouteComponent,
})

function RouteComponent() {
  const [loading, setLoading] = useState(true)
  const url = Route.useLoaderData()
  const ref = useRef<HTMLIFrameElement>(null)
  return (
    <div className="relative min-h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center min-h-full">
          <Loader className="animate-spin" />
        </div>
      )}
      <iframe
        height="100%"
        width="100%"
        src={
          'https://bi.fefacade.com/webroot/decision/v10/entry/access/04441373-1ba3-4f91-bb35-bffbe03cdbd7?fine_auth_token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYXkubWNsZWUiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJpc3MiOiJmYW5ydWFuIiwiZGVzY3JpcHRpb24iOiJbNjc0ZV1bNjU4N11bNzEyZl0ocmF5Lm1jbGVlKSIsImV4cCI6MTczODg0MTAzMCwiaWF0IjoxNzM3NjM1MDMwLCJqdGkiOiJSTEJqS2VuL0xnTm50d0hjYjlTeHpCcnJOditwbnFrdVh3NEpLcEI1bE9HTDBubjIifQ.RaKC3k_K1Z9xDIy_ZTnZh5znJGWVr3NxlVnCShtar-I'
        }
        onLoad={() => setLoading(false)}
      />
    </div>
  )

  // useEffect(() => {
  //   if (ref.current?.contentWindow) {
  //     // ref.current.src = url;
  //     ref.current.contentWindow.document.write(
  //       `<script>window.location.href = "${url}"</script>`,
  //     );
  //   }
  // }, [url]);

  // return <iframe ref={ref}></iframe>;
}

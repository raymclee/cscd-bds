import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { DistrictSelect } from '~/components/district-select'
import { useAreaMapStore } from '~/store/area-map'

export const Route = createLazyFileRoute('/__auth/__map/area-map')({
  component: RouteComponent,
})

function RouteComponent() {
  // const initMap = useAreaMapStore((state) => state.initAreaMap);
  // const navigate = Route.useNavigate();

  // React.useEffect(() => {
  //   initMap(navigate);
  // }, []);

  return (
    <>
      <div id="map" className="absolute inset-0"></div>

      {/* <div className="bg-white h-32 w-32 absolute top-6 left-6">
        
      </div> */}

      <DistrictSelect className="absolute top-6 left-6" />
    </>
  )
}

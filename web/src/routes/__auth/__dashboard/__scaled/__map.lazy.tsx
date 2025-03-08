import * as React from "react";
import { createLazyFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useMapStore } from "~/store/map";
import { Blocks, HardHat, Monitor } from "lucide-react";
import { Button, Tooltip } from "antd";

export const Route = createLazyFileRoute("/__auth/__dashboard/__scaled/__map")({
  component: RouteComponent,
});

function RouteComponent() {
  const map = useMapStore((s) => s.map);
  const initMap = useMapStore((s) => s.initMap);
  const { session } = Route.useRouteContext();

  React.useEffect(() => {
    initMap("map", {
      zoom: 4,
      // mapStyle: "amap://styles/grey",
      mapStyle: "amap://styles/darkblue",
      // viewMode: "3D",
      // pitch: 30,
    });
  }, []);

  React.useEffect(() => {
    return () => {
      useMapStore.setState({
        selectedArea: null,
        currentAreaNode: null,
        navigations: [],
        selectedTender: null,
        tenderListVisible: false,
        tenderViewTender: null,
        selectedTenderStatus: null,
        moreDashboardTenderListBoardVisible: false,
        moreNewTenderBoardVisible: false,
        moreRankingListBoardVisible: false,
        moreTenderTypeBoardVisible: false,
      });
      map?.destroy();
    };
  }, [map]);

  return (
    <>
      <div
        id="map"
        className="fixed top-0 right-0 bottom-0 left-0 h-full max-h-screen"
      ></div>

      <div className="absolute top-0 right-0 left-0 flex h-[90px] w-full items-center justify-between bg-(image:--bg-dashboard-head) bg-cover bg-bottom bg-no-repeat text-white">
        <div className="relative left-2 flex -translate-y-full gap-2">
          {((session.hasMapAccess && session.hasEditAccess) ||
            session.isAdmin ||
            session.isSuperAdmin) && (
            <Tooltip title="后台">
              <Link to="/portal">
                <Button
                  className="!border-0 !bg-gradient-to-r !from-sky-900 !to-sky-600 !text-white !drop-shadow-2xl hover:!from-sky-800 hover:!to-sky-500"
                  size="small"
                  shape="circle"
                  icon={<Blocks size={14} />}
                ></Button>
              </Link>
            </Tooltip>
          )}

          {/* {(session.isAdmin || session.isSuperAdmin || session.isCeo) && (
            <Tooltip title="运营大屏">
              <Link to="/operations">
                <Button
                  className="border-0 bg-gradient-to-r from-sky-900 to-sky-600 text-white drop-shadow-2xl"
                  size="small"
                  shape="circle"
                  icon={<HardHat size={14} />}
                ></Button>
              </Link>
            </Tooltip>
          )} */}
        </div>

        <div className="text-3xl font-bold text-ellipsis whitespace-nowrap select-none">
          远东幕墙市场拓展地图
        </div>

        <div></div>
      </div>

      {/* <div className="absolute left-2 top-1">
        {((session.hasMapAccess && session.hasEditAccess) ||
          session.isAdmin ||
          session.isSuperAdmin) && (
          <Tooltip title="后台">
            <div>
              <Link to="/portal">
                <Button
                  className="border-0 bg-gradient-to-r from-sky-900 to-sky-600 text-white drop-shadow-2xl"
                  size="small"
                  shape="circle"
                  icon={<Blocks size={14} />}
                ></Button>
              </Link>
            </div>
          </Tooltip>
        )}
      </div> */}

      <Outlet />
    </>
  );
}

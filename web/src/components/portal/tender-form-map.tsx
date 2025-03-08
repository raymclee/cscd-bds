import {
  CheckOutlined,
  CloseOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import {
  searchLocationSelectQuery,
  searchLocationSelectQuery$data,
} from "__generated__/searchLocationSelectQuery.graphql";
import { Button, Input, Modal } from "antd";
import { MapPin, Check } from "lucide-react";
import { fetchQuery, useRelayEnvironment, graphql } from "react-relay";
import { useEffect, useRef, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { usePortalStore } from "~/store/portal";

export function TenderFormMap({
  onComplete,
  defaultLnglat,
}: {
  onComplete: (props: { address: string; lnglat: AMap.LngLat }) => void;
  defaultLnglat?: readonly number[];
}) {
  const open = usePortalStore((state) => state.tenderFormMapOpen);

  return (
    <>
      <MapPin
        className="h-4 w-4 cursor-pointer text-slate-600"
        onClick={() => usePortalStore.setState({ tenderFormMapOpen: true })}
      />
      {/* <Button
        type="text"
        size="small"
        onClick={() => usePortalStore.setState({ tenderFormMapOpen: true })}
        className="p-0"
        icon={<MapPin className="w-4 h-4" />}
      ></Button> */}
      <Modal
        width={820}
        open={open}
        centered
        destroyOnClose
        closeIcon={
          <div className="w-full rounded border bg-white shadow-lg">
            <CloseOutlined />
          </div>
        }
        onCancel={() => usePortalStore.setState({ tenderFormMapOpen: false })}
        okText="保存"
        cancelText="取消"
        onOk={() => {
          usePortalStore.setState({ tenderFormMapOpen: false });
        }}
        className="overflow-hidden"
      >
        <Map onComplete={onComplete} defaultLnglat={defaultLnglat} />
      </Modal>
    </>
  );
}

function Map({
  onComplete,
  defaultLnglat,
}: {
  onComplete: (props: { address: string; lnglat: AMap.LngLat }) => void;
  defaultLnglat?: readonly number[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  // @ts-expect-error no types
  const geolocationRef = useRef<AMap.Geolocation | null>(null);
  const [result, setResult] = useState<{
    province: string;
    pois: {
      id: string;
      name: string;
      address: string;
      lnglat: AMap.LngLat;
    }[];
  }>();
  const mapRef = useRef<AMap.Map | null>(null);
  const markerRef = useRef<AMap.Marker | null>(null);
  const [selected, setSelected] = useState<string>();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    mapRef.current = new AMap.Map(ref.current, {
      zoom: 18,
      center: defaultLnglat ? [defaultLnglat[0], defaultLnglat[1]] : undefined,
      // animateEnable: false,
    });

    // @ts-expect-error no types
    const geocoder = new AMap.Geocoder({
      radius: 1000, //以已知坐标为中心点，radius为半径，返回范围内兴趣点和道路信息
      extensions: "all", //返回地址描述以及附近兴趣点和道路信息，默认“base”
    });

    geocoder.on("complete", (e: any) => {
      setSelected(e.regeocode.pois?.[0]?.id);
      if (e.regeocode.pois.length > 0) {
        onComplete({
          address: e.regeocode.formattedAddress,
          lnglat: new AMap.LngLat(
            e.regeocode.pois[0].location.lng,
            e.regeocode.pois[0].location.lat,
          ),
        });
      }
      setResult({
        province: e.regeocode.addressComponent.province,
        pois: e.regeocode.pois.map((poi: any) => ({
          id: poi.id,
          name: poi.name,
          lnglat: new AMap.LngLat(poi.location.lng, poi.location.lat),
          address: poi.address,
        })),
      });

      listRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // @ts-expect-error no types
    geolocationRef.current = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 1000, //超过10秒后停止定位，默认：无穷大
      // maximumAge: 0, //定位结果缓存0毫秒，默认：0
      // convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true, //显示定位按钮，默认：true
      buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
      // zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    mapRef.current?.addControl(geolocationRef.current);

    mapRef.current?.on("click", (e) => {
      //返回地理编码结果
      if (markerRef.current) {
        mapRef.current?.remove(markerRef.current);
      }
      markerRef.current = new AMap.Marker({
        position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
      });
      mapRef.current?.add(markerRef.current);
      mapRef.current?.setCenter(
        new AMap.LngLat(e.lnglat.lng, e.lnglat.lat),
        false,
        200,
      );
      //逆地理编码
      geocoder.getAddress(new AMap.LngLat(e.lnglat.lng, e.lnglat.lat));
    });

    if (defaultLnglat) {
      markerRef.current = new AMap.Marker({
        position: new AMap.LngLat(defaultLnglat[0], defaultLnglat[1]),
      });
      mapRef.current?.add(markerRef.current);
      mapRef.current?.setCenter(
        new AMap.LngLat(defaultLnglat[0], defaultLnglat[1]),
        false,
        200,
      );
      geocoder.getAddress(new AMap.LngLat(defaultLnglat[0], defaultLnglat[1]));
    } else {
      // @ts-expect-error no types
      geolocationRef.current.getCurrentPosition((err, result) => {
        // const marker = new AMap.Marker({
        //   position: new AMap.LngLat(result.position.lng, result.position.lat),
        // });
        // map.add(marker);
        if (markerRef.current) {
          mapRef.current?.remove(markerRef.current);
        }
        markerRef.current = new AMap.Marker({
          position: new AMap.LngLat(result.position.lng, result.position.lat),
        });
        mapRef.current?.add(markerRef.current);

        mapRef.current?.setZoomAndCenter(
          15,
          new AMap.LngLat(result.position.lng, result.position.lat),
          false,
          0,
        );

        geocoder.getAddress(
          new AMap.LngLat(result.position.lng, result.position.lat),
        );
      });
    }
  }, []);

  return (
    <div className="-mx-6 -my-5 mb-4 grid h-[480px] grid-cols-[1fr_2.2fr] overflow-hidden border-b">
      <div className="space-y-0.5 overflow-y-auto px-2 py-4" ref={listRef}>
        <Input.Search className="mb-2 px-1" placeholder="搜索地址" />
        {result?.pois.map((position) => {
          const address = `${result.province}${position.address}`;
          return (
            <button
              key={position.id}
              className="flex w-full items-center justify-between gap-x-2 rounded px-2 py-1 transition-colors hover:bg-gray-100"
              onClick={() => {
                if (markerRef.current) {
                  mapRef.current?.remove(markerRef.current);
                }
                markerRef.current = new AMap.Marker({
                  position: position.lnglat,
                });
                mapRef.current?.add(markerRef.current);
                setSelected(position.id);
                mapRef.current?.setCenter(position.lnglat, false, 200);
                onComplete({
                  address,
                  lnglat: position.lnglat,
                });
              }}
            >
              <div className="flex-1 text-left">
                <div>{position.name}</div>
                <div className="line-clamp-1 text-xs text-gray-500">
                  {address}
                </div>
              </div>

              <div className="w-4 text-right">
                {selected === position.id && <Check size={14} />}
              </div>
            </button>
          );
        })}
      </div>
      <div className="rounded-tr-lg rounded-br-lg" ref={ref}></div>
    </div>
  );
}

import {
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { tendersDetailPageMutation } from "__generated__/tendersDetailPageMutation.graphql";
import { tendersDetailPageQuery } from "__generated__/tendersDetailPageQuery.graphql";
import { App, Button, Popconfirm } from "antd";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { useMapStore } from "~/store/map";

export const Route = createLazyFileRoute("/__auth/__portal/portal/tenders/$id")(
  {
    component: RouteComponent,
  },
);

const query = graphql`
  query tendersDetailPageQuery($id: ID!) {
    node(id: $id) {
      ... on Tender {
        id
        name
        geoCoordinate {
          coordinates
        }
        geoBounds
      }
    }
  }
`;

const updateTenderMutation = graphql`
  mutation tendersDetailPageMutation(
    $id: ID!
    $input: UpdateTenderInput!
    $geoBounds: [[Float!]!]
  ) {
    updateTender(id: $id, input: $input, geoBounds: $geoBounds) {
      id
      name
      geoCoordinate {
        coordinates
      }
      geoBounds
    }
  }
`;

function RouteComponent() {
  const map = useMapStore((state) => state.map);
  const initMap = useMapStore((state) => state.initMap);

  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    initMap("map", {
      // center: data.node?
      center: [116.397428, 39.90923] as [number, number],
    });
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      map.add([new AMap.TileLayer.Satellite()]);
      setReady(true);
    });

    return () => {
      map?.destroy();
    };
  }, [map]);

  return (
    <>
      {/* <Input value={data?.node?.name} /> */}
      <div id="map" className="absolute inset-0"></div>
      {ready && <Editor />}
    </>
  );
}

function Editor() {
  const data = usePreloadedQuery<tendersDetailPageQuery>(
    query,
    Route.useLoaderData(),
  );
  const map = useMapStore((state) => state.map);

  const [commitMutation, isMutationInFlight] =
    useMutation<tendersDetailPageMutation>(updateTenderMutation);

  const polygonRef = React.useRef<AMap.Polygon | null>(null);
  const polygonEditorRef = React.useRef<AMap.PolygonEditor | null>(
    new AMap.PolygonEditor(map!),
  );
  const [isEditing, setIsEditing] = React.useState(false);
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const { message } = App.useApp();

  React.useEffect(() => {
    if (map && !data.node?.geoBounds && data.node?.geoCoordinate?.coordinates) {
      map.setZoomAndCenter(
        15,
        data.node.geoCoordinate.coordinates as [number, number],
        false,
        600,
      );
    }
  }, [map, data.node]);

  React.useEffect(() => {
    if (map && data?.node?.geoBounds?.length) {
      polygonRef.current = new AMap.Polygon();
      polygonRef.current?.setPath(data.node.geoBounds as AMap.LngLatLike[]);
      // polygonRef.current?.setMap(map);
      map.add(polygonRef.current);
      // @ts-expect-error
      map.setFitView(polygonRef.current, false, [0, 0, 0, 0], 15);
    }
  }, [map, data.node]);

  function startEditing() {
    setIsEditing(true);
    polygonEditorRef.current?.setTarget(polygonRef.current);
    polygonEditorRef.current?.open();
  }

  function endEditing() {
    setIsEditing(false);
    polygonEditorRef.current?.setTarget(null);
    polygonEditorRef.current?.close();
  }

  function handleNewClick() {
    if (isEditing) {
      endEditing();
    } else {
      startEditing();
    }
  }

  function confirm() {
    commitMutation({
      variables: {
        id: params.id,
        input: {},
        geoBounds: null,
      },
      onCompleted: (res) => {
        message.success("地塊刪除成功");
        polygonRef.current?.remove();
      },
      onError(error) {
        console.error(error);
        message.error({
          content: "地塊刪除失敗",
          duration: 5,
        });
      },
    });
  }

  return (
    <div className="absolute right-6 top-6 flex gap-2">
      {!isEditing && data.node && !data.node?.geoBounds && (
        <Button onClick={handleNewClick} icon={<PlusOutlined />}>
          新增
        </Button>
      )}
      {!isEditing && data.node && data.node?.geoBounds && (
        <>
          <Button onClick={startEditing} icon={<EditOutlined />}>
            修改
          </Button>
          <Popconfirm
            title="刪除地塊"
            description="確定要刪除地塊嗎？"
            onConfirm={confirm}
            // onCancel={cancel}
            // okText="Yes"
            // cancelText="No"
          >
            <Button danger>刪除</Button>
          </Popconfirm>
        </>
      )}

      {isEditing && (
        <>
          <Button
            danger
            onClick={endEditing}
            disabled={isMutationInFlight}
            icon={<StopOutlined />}
          >
            取消
          </Button>
          <Button
            icon={<SaveOutlined />}
            onClick={async () => {
              const geoBounds = polygonEditorRef.current
                ?.getTarget()
                ?.getPath()
                ?.map((item: any) => [item.lng, item.lat]);

              if (geoBounds?.length) {
                commitMutation({
                  variables: {
                    id: params.id,
                    input: {},
                    geoBounds: geoBounds,
                  },
                  onCompleted: (res) => {
                    endEditing();
                    navigate({ to: "/portal/tenders" });
                    message.success("地塊更新成功");
                  },
                  onError(error) {
                    console.error(error);
                    message.error({
                      content: "地塊更新失敗",
                      duration: 5,
                    });
                  },
                });
              }
            }}
          >
            存储
          </Button>
        </>
      )}
    </div>
  );
}
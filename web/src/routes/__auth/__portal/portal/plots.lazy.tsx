import { PlusOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import { createLazyFileRoute } from "@tanstack/react-router";
import { plotsCreatePlotMutation } from "__generated__/plotsCreatePlotMutation.graphql";
import { plotsDeletePlotMutation } from "__generated__/plotsDeletePlotMutation.graphql";
import { plotsPageQuery } from "__generated__/plotsPageQuery.graphql";
import { plotsUpdatePlotMutation } from "__generated__/plotsUpdatePlotMutation.graphql";
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Radio,
  TreeSelect,
  Typography,
} from "antd";
import { DataNode } from "antd/es/tree";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { create } from "zustand";
import { useMapStore } from "~/store/map";
import { usePlotStore } from "~/store/plot";

export const Route = createLazyFileRoute("/__auth/__portal/portal/plots")({
  component: RouteComponent,
});

const query = graphql`
  query plotsPageQuery($userId: ID!) {
    node(id: $userId) {
      id
      ... on User {
        areas {
          provinces {
            id
            name
            adcode
            cities {
              id
              name
              adcode
              districts {
                id
                name
                adcode
              }
            }
            districts {
              id
              name
              adcode
            }
          }
        }
      }
    }

    plots {
      edges {
        node {
          id
          name
          geoBounds
          colorHex
        }
      }
    }
  }
`;

const createPlotMutation = graphql`
  mutation plotsCreatePlotMutation(
    $input: CreatePlotInput!
    $geoBounds: [[Float!]!]
  ) {
    createPlot(input: $input, geoBounds: $geoBounds) {
      id
      name
      geoBounds
    }
  }
`;

const updatePlotMutation = graphql`
  mutation plotsUpdatePlotMutation(
    $id: ID!
    $input: UpdatePlotInput!
    $geoBounds: [[Float!]!]
  ) {
    updatePlot(id: $id, input: $input, geoBounds: $geoBounds) {
      id
      name
      geoBounds
    }
  }
`;

const deletePlotMutation = graphql`
  mutation plotsDeletePlotMutation($id: ID!) {
    deletePlot(id: $id) {
      id
    }
  }
`;

function RouteComponent() {
  const map = useMapStore((state) => state.map);
  const initMap = useMapStore((state) => state.initMap);
  const [isReady, setIsReady] = React.useState(false);
  const data = usePreloadedQuery<plotsPageQuery>(query, Route.useLoaderData());
  const [commitMutation, isMutationInFlight] =
    useMutation<plotsDeletePlotMutation>(deletePlotMutation);
  const setPolygonEditor = usePlotStore((state) => state.setPolygonEditor);
  const { message, modal } = App.useApp();

  React.useEffect(() => {
    initMap("map", {});
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      setIsReady(true);
      map.addLayer(new AMap.TileLayer.Satellite());
      setPolygonEditor(new AMap.PolygonEditor(map));

      for (const plot of data.plots?.edges?.map((e) => e?.node) || []) {
        const polygon = new AMap.Polygon();

        polygon.setPath(plot?.geoBounds as AMap.LngLatLike[]);
        polygon.setOptions({
          fillColor: plot?.colorHex,
          fillOpacity: 0.35,
          strokeColor: plot?.colorHex,
          strokeWeight: 2,
        });

        // @ts-expect-error
        const label = new AMapUI.SimpleMarker({
          // @ts-expect-error
          iconStyle: AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
          label: {
            content: `
                <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                  <div class="font-medium text-center text-sm text-wrap">${plot?.name}</div>
                </div>
                `,
            offset: new AMap.Pixel(-100, 30),
          },
          map,
          position: polygon.getBounds()?.getCenter(),
        });

        polygon.on("dblclick", (e) => {
          usePlotStore.getState().polygonEditor?.setTarget(polygon);
          usePlotStore.getState().polygonEditor?.open();
          usePlotStore.setState({ selectedPlot: plot?.id, isEditing: true });
        });

        polygon.on("rightclick", (e) => {
          if (!plot?.id) return;
          // usePlotStore.setState({ deletingPlot: plot?.id });
          modal.confirm({
            title: "確認刪除",
            content: "確認刪除地塊？",
            onOk: () => {
              polygon.remove();
              label.remove();
              commitMutation({ variables: { id: plot?.id } });
            },
          });
        });
        polygon.setMap(map);
      }
    });

    return () => {
      map?.destroy();
    };
  }, [map]);

  return (
    <div className="relative -mx-4 min-h-dvh">
      <div id="map" className="absolute inset-0"></div>
      {isReady && <EditorContainer />}
    </div>
  );
}

function EditorContainer() {
  const data = usePreloadedQuery<plotsPageQuery>(query, Route.useLoaderData());
  const map = useMapStore((state) => state.map);
  const districtExplorer = useMapStore((state) => state.districtExplorer);
  const provinces = data.node?.areas?.flatMap((area) => area.provinces);
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const treeData: DataNode[] | undefined = React.useMemo(
    () =>
      provinces?.map((p) => ({
        title: p?.name,
        value: p!.id,
        key: p!.id,
        children: p?.cities?.length
          ? p?.cities?.map((c) => ({
              title: c?.name,
              value: c!.id,
              key: c!.id,
              adcode: c?.adcode,
              children: c.districts?.map((d) => ({
                title: d?.name,
                value: d!.id,
                key: d!.id,
                adcode: d?.adcode,
              })),
            }))
          : p?.districts?.map((d) => ({
              title: d?.name,
              value: d!.id,
              key: d!.id,
              adcode: d?.adcode,
            })),
      })),
    [],
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography.Title level={2}>商机</Typography.Title>
      </div>
      <TreeSelect
        value={search.districtID}
        variant="outlined"
        className="absolute left-4 top-4 w-64"
        treeDefaultExpandAll
        treeData={treeData}
        onSelect={(value: string, node) => {
          if (!("adcode" in node)) {
            return;
          }
          districtExplorer.loadAreaNode(
            node.adcode,
            (err: any, areaNode: any) => {
              if (err) {
                console.error(err);
                return;
              }
              navigate({ search: { districtID: value }, replace: true });
              map?.setZoomAndCenter(
                15,
                areaNode.getBounds().getCenter(),
                false,
                600,
              );
            },
          );
        }}
      />
      <Editor />
    </>
  );
}

type Values = {
  name: string;
  colorHex: string;
};

function Editor() {
  const search = Route.useSearch();
  const map = useMapStore((state) => state.map);
  const polygonEditorRef = React.useRef<AMap.PolygonEditor>(
    new AMap.PolygonEditor(map!),
  );
  const isAdding = usePlotStore((state) => state.isAdding);
  const isEditing = usePlotStore((state) => state.isEditing);
  const setIsAdding = usePlotStore((state) => state.setIsAdding);
  const deletingPlotId = usePlotStore((state) => state.deletingPlot);
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();
  const { message, modal } = App.useApp();
  const [commitMutation, isMutationInFlight] =
    useMutation<plotsCreatePlotMutation>(createPlotMutation);
  const [commitUpdateMutation, isUpdateMutationInFlight] =
    useMutation<plotsUpdatePlotMutation>(updatePlotMutation);
  const [commitDeleteMutation, isDeleteMutationInFlight] =
    useMutation<plotsDeletePlotMutation>(deletePlotMutation);

  function handleNewClick() {
    if (isEditing) {
      endAdding();
    } else {
      startAdding();
    }
  }

  function startAdding() {
    setIsAdding(true);
    // polygonEditorRef.current?.setTarget(polygonRef.current);
    polygonEditorRef.current?.open();
  }

  function endAdding() {
    setIsAdding(false);
    polygonEditorRef.current.setTarget(null);
    polygonEditorRef.current?.close();
  }

  return (
    <>
      <Modal
        open={open}
        title="請輸入地塊名稱"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form<Values>
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => {
              const geoBounds = polygonEditorRef.current
                ?.getTarget()
                ?.getPath()
                ?.map((item: any) => [item.lng, item.lat]);

              if (!geoBounds?.length) {
                message.error("請繪製地塊");
                return;
              }

              commitMutation({
                variables: {
                  input: {
                    name: values.name,
                    colorHex: values.colorHex,
                    districtID: search.districtID,
                  },
                  geoBounds: geoBounds,
                },
                onCompleted: (res) => {
                  endAdding();
                  message.success("地塊新增成功");
                  const polygon = new AMap.Polygon();
                  polygon.setPath(
                    res.createPlot.geoBounds as AMap.LngLatLike[],
                  );
                  polygon.setOptions({
                    fillColor: values.colorHex,
                    fillOpacity: 0.35,
                    strokeColor: values.colorHex,
                    strokeWeight: 2,
                  });
                  polygon.setMap(map);
                  // @ts-expect-error
                  const label = new AMapUI.SimpleMarker({
                    iconStyle:
                      // @ts-expect-error
                      AMapUI.SimpleMarker.getBuiltInIconStyles("default"),
                    label: {
                      content: `
                <div class="w-[10rem] rounded-lg px-1 py-0.5 line-clamp-2">
                  <div class="font-medium text-center text-sm text-wrap">${values?.name}</div>
                </div>
                `,
                      offset: new AMap.Pixel(-100, 30),
                    },
                    map,
                    position: polygon.getBounds()?.getCenter(),
                  });

                  setOpen(false);
                  // map?.add(polygon);
                },
                onError(error) {
                  console.error(error);
                  message.error({
                    content: "地塊更新失敗",
                    duration: 5,
                  });
                },
              });
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item className="mt-6" name="name" label="名稱" required>
          <Input />
        </Form.Item>
        <Form.Item label="顏色" name="colorHex" required>
          <Radio.Group>
            <Radio.Button value="#ffc60a" type="primary">
              黃色
            </Radio.Button>
            <Radio.Button value="#32a645">綠色</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Modal>
      <div className="absolute right-4 top-4 flex gap-2">
        {isAdding && (
          <>
            <Button
              icon={<SaveOutlined />}
              onClick={async () => {
                if (!search.districtID) {
                  return;
                }
                setOpen(true);
                return;
              }}
            >
              存储
            </Button>
            <Button
              danger
              onClick={endAdding}
              disabled={isMutationInFlight}
              icon={<StopOutlined />}
            >
              取消
            </Button>
          </>
        )}

        {!isEditing && !isAdding && (
          <Button onClick={handleNewClick} icon={<PlusOutlined />}>
            新增
          </Button>
        )}

        {isEditing && (
          <>
            <Button
              icon={<SaveOutlined />}
              onClick={async () => {
                if (!search.districtID) {
                  return;
                }
                const { polygonEditor, selectedPlot } = usePlotStore.getState();
                const geoBounds = polygonEditor
                  ?.getTarget()
                  ?.getPath()
                  ?.map((item: any) => [item.lng, item.lat]);
                commitUpdateMutation({
                  variables: {
                    id: selectedPlot!,
                    input: {},
                    geoBounds,
                  },
                  onCompleted: () => {
                    usePlotStore.setState({
                      selectedPlot: null,
                      isEditing: false,
                    });
                    usePlotStore.getState().polygonEditor?.setTarget(null);
                    usePlotStore.getState().polygonEditor?.close();
                    message.success("地塊更新成功");
                  },
                });
              }}
            >
              存储
            </Button>
            <Button
              danger
              onClick={endAdding}
              disabled={isMutationInFlight}
              icon={<StopOutlined />}
            >
              取消
            </Button>
          </>
        )}
      </div>
    </>
  );
}

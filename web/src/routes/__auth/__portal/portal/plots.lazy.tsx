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
  Radio,
  TreeSelect,
  Typography,
} from "antd";
import { DataNode } from "antd/es/tree";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
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
      colorHex
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
      colorHex
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

  React.useEffect(() => {
    initMap("map", {});
  }, []);

  React.useEffect(() => {
    map?.on("complete", () => {
      setIsReady(true);
      map.addLayer(new AMap.TileLayer.Satellite());
      usePlotStore.setState({ polygonEditor: new AMap.PolygonEditor(map) });
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
  const selectedDistrict = usePlotStore((state) => state.selectedDistrict);
  const [commitMutation, isMutationInFlight] =
    useMutation<plotsDeletePlotMutation>(deletePlotMutation);
  const createPlot = usePlotStore((state) => state.createPlot);

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
              disabled: true,
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

  React.useEffect(() => {
    for (const plot of data.plots?.edges?.map((e) => e?.node) || []) {
      createPlot(plot, commitMutation);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Typography.Title level={2}>商机</Typography.Title>
      </div>
      <TreeSelect
        value={selectedDistrict || ""}
        variant="outlined"
        className="absolute left-4 top-4 w-64"
        treeData={treeData}
        onSelect={(value: string, node) => {
          if (!("adcode" in node)) {
            return;
          }
          usePlotStore.setState({ selectedDistrict: value });
          districtExplorer.loadAreaNode(
            node.adcode,
            (err: any, areaNode: any) => {
              if (err) {
                console.error(err);
                return;
              }
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
  const polygonEditor = usePlotStore((state) => state.polygonEditor);
  const isAdding = usePlotStore((state) => state.isAdding);
  const isEditing = usePlotStore((state) => state.isEditing);
  const districtID = usePlotStore((state) => state.selectedDistrict);
  const [open, setOpen] = React.useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [commitMutation, isMutationInFlight] =
    useMutation<plotsCreatePlotMutation>(createPlotMutation);
  const [commitUpdateMutation, isUpdateMutationInFlight] =
    useMutation<plotsUpdatePlotMutation>(updatePlotMutation);
  const createPlot = usePlotStore((state) => state.createPlot);
  const [commitDeleteMutation, isDeleteMutationInFlight] =
    useMutation<plotsDeletePlotMutation>(deletePlotMutation);

  React.useEffect(() => {
    return () => {
      usePlotStore.setState({
        isAdding: false,
        isEditing: false,
        selectedPlot: null,
      });
    };
  }, []);

  function handleNewClick() {
    if (!districtID) {
      message.error("請選擇地區");
      return;
    }

    if (isEditing) {
      endAdding();
    } else {
      startAdding();
    }
  }

  function startAdding() {
    usePlotStore.setState({ isAdding: true, isEditing: false });
    polygonEditor?.open();
  }

  function endAdding() {
    polygonEditor?.getTarget()?.remove();
    polygonEditor?.close();
    usePlotStore.setState({
      isAdding: false,
      isEditing: false,
      selectedPlot: null,
    });
  }

  return (
    <>
      <Modal
        open={open}
        title="請輸入地塊名稱"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => {
          setOpen(false);
          endAdding();
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form<Values>
            layout="vertical"
            form={form}
            name="form_in_modal"
            clearOnDestroy
            onFinish={(values) => {
              if (!districtID) {
                message.error("請選擇地區");
                return;
              }
              const geoBounds = polygonEditor
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
                    districtID,
                  },
                  geoBounds: geoBounds,
                },
                onCompleted: (res) => {
                  endAdding();
                  message.success("地塊新增成功");
                  createPlot(res.createPlot, commitDeleteMutation);

                  setOpen(false);
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
        <Form.Item
          className="mt-6"
          name="name"
          label="名稱"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="顏色" name="colorHex" rules={[{ required: true }]}>
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
              onClick={() => {
                setOpen(true);
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
              onClick={() => {
                usePlotStore.getState().polygonEditor?.setTarget(null);
                usePlotStore.setState({
                  selectedPlot: null,
                  isEditing: false,
                });
              }}
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

function createPlot() {}

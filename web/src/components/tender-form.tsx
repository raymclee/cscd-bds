import { useNavigate } from "@tanstack/react-router";
import { tenderFormFragment$key } from "__generated__/tenderFormFragment.graphql";
import {
  App,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { ConnectionHandler, graphql, useFragment } from "react-relay";
import { CreateTenderInput } from "~/graphql/graphql";
import { useCreateTender } from "~/hooks/use-create-tender";
import { FixedToolbar } from "./fixed-toolbar";
import { useMemo } from "react";

const fragment = graphql`
  fragment tenderFormFragment on User {
    areas {
      edges {
        node {
          id
          name
          customers {
            edges {
              node {
                id
                name
              }
            }
          }
          sales {
            edges {
              node {
                id
                name
              }
            }
          }
          provinces {
            edges {
              node {
                id
                name
                adcode
                cities {
                  edges {
                    node {
                      id
                      name
                      adcode
                      districts {
                        edges {
                          node {
                            id
                            name
                            adcode
                          }
                        }
                      }
                    }
                  }
                }
                districts {
                  edges {
                    node {
                      id
                      name
                      adcode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function TenderForm<T>({
  queryRef,
}: {
  queryRef: tenderFormFragment$key;
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm<CreateTenderInput>();
  const data = useFragment(fragment, queryRef);

  const [commitCreateMutation, isCreateInFlight] = useCreateTender();
  const navigate = useNavigate({ from: "/portal/tenders/new" });

  const areaID = Form.useWatch("areaID", form);
  const provinceID = Form.useWatch("provinceID", form);
  const cityID = Form.useWatch("cityID", form);

  console.log(cityID);

  const provinces = data.areas?.edges
    ?.filter((e) => e?.node?.id === areaID)
    .flatMap((a) => a?.node?.provinces.edges?.map((p) => p?.node));
  const cities = provinces?.find((p) => p?.id === provinceID)?.cities;
  const districts = cityID
    ? cities?.edges?.find((c) => c?.node?.id === cityID)?.node?.districts
    : provinces?.find((p) => p?.id === provinceID)?.districts;

  const customerOptions = data.areas.edges
    ?.filter((e) => e?.node?.id === areaID)
    ?.flatMap((e) => e?.node?.customers.edges)
    .map((c) => ({ label: c?.node?.name, value: c?.node?.id }));

  const salesOptions = data?.areas.edges
    ?.filter((e) => e?.node?.id === areaID)
    .flatMap((e) => e?.node?.sales.edges)
    .map((s) => ({ label: s?.node?.name, value: s?.node?.id }));

  return (
    <Form<CreateTenderInput>
      form={form}
      className="relative pb-24"
      requiredMark="optional"
      disabled={isCreateInFlight}
      initialValues={{ discoveryDate: dayjs() }}
      layout="vertical"
      onFinish={(values) => {
        // values
        const connectionID = ConnectionHandler.getConnectionID(
          values.areaID,
          "TendersTenderListFragment_tenders",
          { orderBy: { field: "CREATED_AT", direction: "DESC" } },
        );
        commitCreateMutation({
          variables: { input: values, connections: [connectionID] },
          onCompleted() {
            navigate({ to: "/portal/tenders" });
            message.success("创建成功");
          },
          onError(error) {
            console.error({ error });
            message.error("创建失败");
          },
          // updater(store, data) {
          //   if (!data?.createTender) return;

          //   const node = store.get(data.createTender.area.id);
          //   if (!node) {
          //     console.log("no node");
          //     return;
          //   }
          //   console.log({ node });
          //   const tendersConnection = ConnectionHandler.getConnection(
          //     node,
          //     "TendersAreaTenderListFragment_tenders",
          //   );
          //   const newTender = store.get(data.createTender.id);
          //   console.log({ tendersConnection, newTender });
          //   if (!tendersConnection || !newTender) return;
          //   const newTenderEdge = ConnectionHandler.createEdge(
          //     store,
          //     tendersConnection,
          //     newTender,
          //     "Tender",
          //   );
          //   ConnectionHandler.insertEdgeAfter(tendersConnection, newTenderEdge);
          //   // const tenders = node.getLinkedRecords("tenders");
          //   // if (!tenders) return;
          //   // const newTenderRecord = store.get(data.createTender.id);
          //   // if (newTenderRecord) {
          //   //   node.setLinkedRecords([...tenders, newTenderRecord], "tenders");
          //   // }
          // },
          // updater(store, data) {
          //   if (!data?.createTender) return;

          //   const node = store.get(data.createTender.area.id);
          //   if (!node) return;
          //   const tenders = node.getLinkedRecords("tenders");
          //   if (!tenders) return;
          //   const newTenderRecord = store.get(data.createTender.id);
          //   if (newTenderRecord) {
          //     node.setLinkedRecords([...tenders, newTenderRecord], "tenders");
          //   }
          // },
        });
      }}
    >
      <Row gutter={[8, 16]}>
        <Col sm={24} md={8}>
          <Form.Item
            name={"code"}
            label="备案编码"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item name={"status"} label="状态" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item
            name={"name"}
            label="项目名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24} md={8}>
          <Form.Item
            name="areaID"
            label="业务区域"
            rules={[{ required: true }]}
          >
            <Select
              options={data.areas?.edges
                ?.map((e) => e?.node)
                .map((a) => ({ label: a?.name, value: a?.id }))}
              onSelect={() => {
                form.resetFields([
                  "provinceID",
                  "cityID",
                  "districtID",
                  "finderID",
                  "createdByID",
                  "customerID",
                  "followingSaleIDs",
                ]);
              }}
            />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item
            name="customerID"
            label="业主名称"
            rules={[{ required: true }]}
          >
            <Select options={customerOptions} />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item
            name="finderID"
            label="发现人"
            rules={[{ required: true }]}
          >
            <Select options={salesOptions} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24} md={8}>
          <Form.Item
            name="discoveryDate"
            label="发现日"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item
            name="createdByID"
            label="创建人"
            rules={[{ required: true }]}
          >
            <Select options={salesOptions} />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item name="followingSaleIDs" label="当前跟踪人">
            <Select
              options={salesOptions}
              mode="multiple"
              maxTagCount={3}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24} md={8}>
          <Form.Item name="provinceID" label="省" rules={[{ required: true }]}>
            <Select
              options={provinces?.map((p) => ({
                label: p?.name,
                value: p?.id,
              }))}
              onSelect={() => {
                form.resetFields(["cityID", "districtID"]);
              }}
            />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item
            name="cityID"
            label="市"
            rules={[{ required: cities?.edges?.length != 0 }]}
          >
            <Select
              disabled={cities?.edges?.length === 0}
              options={cities?.edges
                ?.map((c) => c?.node)
                .map((c) => ({ label: c?.name, value: c?.id }))}
              onSelect={() => {
                form.resetFields(["districtID"]);
              }}
            />
          </Form.Item>
        </Col>
        <Col sm={24} md={8}>
          <Form.Item name="districtID" label="区" rules={[{ required: true }]}>
            <Select
              options={districts?.edges
                ?.map((e) => e && e.node)
                .map((n) => ({
                  label: n?.name,
                  value: n?.id,
                }))}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24}>
          <Form.Item name="tenderSituations" label="项目主要情况">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24}>
          <Form.Item name="ownerSituations" label="业主主要情况">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col sm={24}>
          <Form.Item name="competitorSituations" label="竞争对手情况">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="estimatedAmount" label="预计金额">
        <Input />
      </Form.Item>
      <Form.Item name="tenderDate" label="招标日">
        <DatePicker />
      </Form.Item>

      <Form.Item name="address" label="地址">
        <Input />
      </Form.Item>
      <Form.Item name="fullAddress" label="详细地址" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item name="contractor" label="总包单位" rules={[]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="sizeAndValueRating"
        label="规模及价值-评分（5分制）"
        rules={[{ max: 5, min: 1 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="sizeAndValueRatingOverview"
        label="规模及价值-概述"
        rules={[]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="creditAndPaymentRating"
        label="资信及付款-评分（5分制）"
        rules={[{ max: 5, min: 1 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="creditAndPaymentRatingOverview"
        label="资信及付款-概述"
        rules={[]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="timeLimitRating"
        label="中标原则及时限-评分（5分制）"
        rules={[{ max: 5, min: 1 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="timeLimitRatingOverview"
        label="中标原则及时限-概述"
        rules={[]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="customerRelationshipRating"
        label="规模及价值-评分（5分制）"
        rules={[{ max: 5, min: 1 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="customerRelationshipRatingOverview"
        label="客情关系-评分（5分制）"
        rules={[]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="competitivePartnershipRating"
        label="竞争合作关系-评分（5分制）"
        rules={[{ max: 5, min: 1 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="competitivePartnershipRatingOverview"
        label="竞争合作关系-概述"
        rules={[]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="prepareToBid" label="是否准备投标">
        <Switch />
      </Form.Item>
      <Form.Item name="projectCode" label="项目代码">
        <Input />
      </Form.Item>
      <Form.Item name="projectDefinition" label="项目定义">
        <Input />
      </Form.Item>
      <Form.Item name="estimatedProjectStartDate" label="预计项目开始日期">
        <DatePicker />
      </Form.Item>
      <Form.Item name="estimatedProjectEndDate" label="项目预计结束日期">
        <DatePicker />
      </Form.Item>
      <Form.Item name="projectType" label="项目类型">
        <Select
          options={[
            { label: "GC:830工程项目", value: "GC" },
            { label: "SC:830生产项目", value: "SC" },
            { label: "YF:830研发项目", value: "YF" },
          ]}
        />
      </Form.Item>
      <Form.Item name="attachements" label="附件">
        <Upload fileList={[]} />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="images" label="效果图">
        <Upload fileList={[]} />
      </Form.Item>

      <Form.Item name="biddingInstructions" label="立项/投标说明">
        <Input />
      </Form.Item>

      <Form.Item name="costEngineer" label="造价师">
        <Input />
      </Form.Item>
      <Form.Item name="tenderForm" label="招采形式">
        <Input />
      </Form.Item>
      <Form.Item name="contractForm" label="合同形式">
        <Input />
      </Form.Item>
      <Form.Item name="managementCompany" label="管理公司">
        <Input />
      </Form.Item>
      <Form.Item name="tenderingAgency" label="招标代理">
        <Input />
      </Form.Item>
      <Form.Item name="biddingDate" label="投标时间">
        <DatePicker />
      </Form.Item>
      <Form.Item name="facadeConsultant" label="幕墙顾问">
        <Input />
      </Form.Item>
      <Form.Item name="designUnit" label="设计单位">
        <Input />
      </Form.Item>
      <Form.Item name="consultingFirm" label="咨询公司">
        <Input />
      </Form.Item>
      <Form.Item name="keyProject" label="重点跟进项目">
        <Input />
      </Form.Item>

      <Form.Item name="geoCoordinate" label="geoCoordinate">
        <Input />
      </Form.Item>
      <Form.Item name="geoBounds" label="geoBounds">
        <Input />
      </Form.Item>

      <FixedToolbar>
        <Button
          danger
          onClick={() => {
            navigate({ to: ".." });
          }}
        >
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </FixedToolbar>
    </Form>
  );
}

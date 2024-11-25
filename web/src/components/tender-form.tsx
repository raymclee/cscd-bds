import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { tenderFormFragment$key } from "__generated__/tenderFormFragment.graphql";
import { useCreateTenderMutation$data } from "__generated__/useCreateTenderMutation.graphql";
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
import { useWatch } from "antd/es/form/Form";
import { useFragment, graphql } from "react-relay";
import { CreateTenderInput } from "~/graphql/graphql";
import { useCreateTender } from "~/hooks/use-create-tender";
import { TendersAreaTenderListFragment } from "~/routes/__auth/__portal/portal/tenders.index.lazy";

const fragment = graphql`
  fragment tenderFormFragment on User {
    areas {
      id
      name
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
`;

export function TenderForm<T>({
  queryRef,
}: {
  queryRef: tenderFormFragment$key;
}) {
  const { message } = App.useApp();
  const [form] = Form.useForm<CreateTenderInput>();
  const data = useFragment(fragment, queryRef);
  const provinceID = Form.useWatch("provinceID", form);
  const cityID = Form.useWatch("cityID", form);
  const [commitCreateMutation, isCreateInFlight] = useCreateTender();
  const navigate = useNavigate({ from: "/portal/tenders/new" });

  const provinces = data.areas?.flatMap((a) => a.provinces);
  const cities = provinces?.find((p) => p?.id === provinceID)?.cities;
  const districts = cityID
    ? cities?.find((c) => c?.id === cityID)?.districts
    : provinces?.find((p) => p?.id === provinceID)?.districts;

  return (
    <Form<CreateTenderInput>
      form={form}
      requiredMark="optional"
      layout="vertical"
      onFinish={(values) => {
        // values
        commitCreateMutation({
          variables: { input: values },
          onCompleted(response, errors) {
            console.log({ response, errors });
            navigate({ to: "/portal/tenders" });
            message.success("创建成功");
          },
          onError(error) {
            console.error({ error });
            message.error("创建失败");
          },
          updater(store, data) {
            if (!data?.createTender) return;

            store
              .get(data.createTender.area.id)
              ?.setLinkedRecords(
                [
                  ...(store
                    .get(data.createTender.area.id)
                    ?.getLinkedRecords("tenders") || []),
                  store.getRootField("createTender"),
                ],
                "tenders",
              );
          },
        });
      }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={"code"} label="编码" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"name"} label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"status"} label="状态" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="estimatedAmount" label="预计金额">
        <Input />
      </Form.Item>
      <Form.Item name="tenderDate" label="招标日">
        <Input />
      </Form.Item>
      <Form.Item
        name="discoveryDate"
        label="发现日"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="address" label="地址">
        <Input />
      </Form.Item>
      <Form.Item name="fullAddress" label="详细地址" rules={[]}>
        <DatePicker />
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
        <Upload />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="images" label="效果图">
        <Upload />
      </Form.Item>
      <Form.Item name="tenderSituations" label="项目主要情况">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="ownerSituations" label="业主主要情况">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="biddingInstructions" label="立项/投标说明">
        <Input />
      </Form.Item>
      <Form.Item name="competitorSituations" label="竞争对手情况">
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
      <Form.Item name="areaID" label="业务区域" rules={[{ required: true }]}>
        <Select
          options={data.areas?.map((a) => ({ label: a.name, value: a.id }))}
        />
      </Form.Item>
      <Form.Item name="provinceID" label="省" rules={[{ required: true }]}>
        <Select
          options={provinces?.map((p) => ({ label: p?.name, value: p?.id }))}
          onSelect={() => {
            form.resetFields(["cityID", "districtID"]);
          }}
        />
      </Form.Item>
      <Form.Item name="cityID" label="市">
        <Select
          disabled={cities?.length === 0}
          options={cities?.map((c) => ({ label: c?.name, value: c?.id }))}
        />
      </Form.Item>
      <Form.Item name="districtID" label="区" rules={[{ required: true }]}>
        <Select
          options={districts?.map((d) => ({ label: d.name, value: d.id }))}
        />
      </Form.Item>
      <Form.Item
        name="customerID"
        label="customerID"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="finderID" label="finderID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="createdByID"
        label="createdByID"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="followingSales" label="followingSales">
        <Input />
      </Form.Item>
      <Form.Item name="geoCoordinate" label="geoCoordinate">
        <Input />
      </Form.Item>
      <Form.Item name="geoBounds" label="geoBounds">
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  );
}

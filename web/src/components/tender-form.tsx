import {
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
import { CreateTenderInput } from "~/graphql/graphql";

export function TenderForm<T>() {
  const [form] = Form.useForm<CreateTenderInput>();

  return (
    <Form<CreateTenderInput>
      form={form}
      requiredMark="optional"
      layout="vertical"
      onFinish={(values) => {
        // values
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
          <Form.Item name={"type"} label="状态" rules={[{ required: true }]}>
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
      <Form.Item name="biddingInstructions" label="biddingInstructions">
        <Input />
      </Form.Item>
      <Form.Item name="competitorSituations" label="competitorSituations">
        <Input />
      </Form.Item>
      <Form.Item name="costEngineer" label="costEngineer">
        <Input />
      </Form.Item>
      <Form.Item name="tenderForm" label="tenderForm">
        <Input />
      </Form.Item>
      <Form.Item name="contractForm" label="contractForm">
        <Input />
      </Form.Item>
      <Form.Item name="managementCompany" label="managementCompany">
        <Input />
      </Form.Item>
      <Form.Item name="tenderingAgency" label="tenderingAgency">
        <Input />
      </Form.Item>
      <Form.Item name="biddingDate" label="biddingDate">
        <DatePicker />
      </Form.Item>
      <Form.Item name="facadeConsultant" label="facadeConsultant">
        <Input />
      </Form.Item>
      <Form.Item name="designUnit" label="designUnit">
        <Input />
      </Form.Item>
      <Form.Item name="consultingFirm" label="consultingFirm">
        <Input />
      </Form.Item>
      <Form.Item name="keyProject" label="keyProject">
        <Input />
      </Form.Item>
      <Form.Item name="areaID" label="业务区域" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="provinceID"
        label="provinceID"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="cityID" label="cityID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="districtID"
        label="districtID"
        rules={[{ required: true }]}
      >
        <Input />
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
    </Form>
  );
}

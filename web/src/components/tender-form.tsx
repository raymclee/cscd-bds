import { Col, DatePicker, Form, Input, Row } from "antd";
import { CreateTenderInput } from "~/graphql/graphql";

export function TenderForm<T>() {
  const [form] = Form.useForm<T>();

  return (
    <Form
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
      <Form.Item
        name="fullAddress"
        label="详细地址"
        rules={[{ required: true }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="contractor"
        label="总包单位"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sizeAndValueRating"
        label="sizeAndValueRating"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sizeAndValueRatingOverview"
        label="sizeAndValueRatingOverview"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}

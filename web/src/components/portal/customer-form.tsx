import { customerFormFragment$key } from "__generated__/customerFormFragment.graphql";
import { Button, Form, Input, Select, Space } from "antd";
import { graphql, useFragment } from "react-relay";

type CustomerFormProps = {
  queryRef: customerFormFragment$key;
  onClose: () => void;
};

export function CustomerForm({ queryRef, onClose }: CustomerFormProps) {
  const data = useFragment(
    graphql`
      fragment customerFormFragment on User {
        areas {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    queryRef,
  );
  const [form] = Form.useForm();

  return (
    <div className="h-full">
      <Form
        className="relative pb-16"
        form={form}
        layout="vertical"
        // requiredMark="optional"
        onFinish={(values) => {}}
      >
        <Form.Item name="name" label="客户名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="areaIDs" label="区域">
          <Select
            mode="multiple"
            options={data.areas.edges?.map((a) => ({
              label: a?.node?.name ?? "",
              value: a?.node?.id ?? "",
            }))}
          />
        </Form.Item>
        <Form.Item name="industry" label="行业">
          <Select options={[]} />
        </Form.Item>
        <Form.Item name="size" label="规模">
          <Select options={[]} />
        </Form.Item>
        <Form.Item name="contact_person" label="联系人">
          <Input />
        </Form.Item>
        <Form.Item name="contact_person_position" label="联系人职位">
          <Input />
        </Form.Item>
        <Form.Item name="contact_person_email" label="联系人邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="contact_person_phone" label="联系人电话">
          <Input />
        </Form.Item>
      </Form>

      <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 border-t bg-white px-6 py-3">
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button
            htmlType="submit"
            type="primary"
            // loading={isCreateUserInFlight || isUpdateUserInFlight}
            onClick={() => form.submit()}
          >
            保存
          </Button>
        </Space>
      </div>
    </div>
  );
}

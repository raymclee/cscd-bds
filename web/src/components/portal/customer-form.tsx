import { customerFormFragment$key } from "__generated__/customerFormFragment.graphql";
import { useUpdateCustomerMutation } from "__generated__/useUpdateCustomerMutation.graphql";
import { App, Button, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";
import { ConnectionHandler, graphql, useFragment } from "react-relay";
import { CreateCustomerInput, Customer } from "~/graphql/graphql";
import { useCreateCustomer } from "~/hooks/use-create-customer";
import { useUpdateCustomer } from "~/hooks/use-update-customer";
import { customerSizeOptions, industryOptions } from "~/lib/helper";

type CustomerFormProps = {
  queryRef: customerFormFragment$key;
  onClose: () => void;
  selectedCustomer: Customer | null;
};

export function CustomerForm({
  queryRef,
  onClose,
  selectedCustomer,
}: CustomerFormProps) {
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
  const [form] = Form.useForm<CreateCustomerInput>();
  const [commitCreateCustomer, isCreateCustomerInFlight] = useCreateCustomer();
  const [commitUpdateCustomer, isUpdateCustomerInFlight] = useUpdateCustomer();
  const { message } = App.useApp();

  useEffect(() => {
    console.log(selectedCustomer);
    if (selectedCustomer?.id) {
      form.setFieldsValue({
        name: selectedCustomer.name,
        areaID: selectedCustomer.area?.id,
        industry: selectedCustomer.industry,
        size: selectedCustomer.size,
        contactPerson: selectedCustomer.contactPerson,
        contactPersonPosition: selectedCustomer.contactPersonPosition,
        contactPersonEmail: selectedCustomer.contactPersonEmail,
        contactPersonPhone: selectedCustomer.contactPersonPhone,
      });
    }
  }, [selectedCustomer]);

  return (
    <div className="h-full">
      <Form
        className="relative pb-16"
        form={form}
        layout="vertical"
        // requiredMark="optional"
        disabled={isCreateCustomerInFlight || isUpdateCustomerInFlight}
        onFinish={(values) => {
          if (selectedCustomer?.id) {
            const input =
              values as useUpdateCustomerMutation["variables"]["input"];
            commitUpdateCustomer({
              variables: {
                id: selectedCustomer.id,
                input,
              },
              onCompleted: () => {
                message.success("更新客户成功");
                onClose();
              },
              onError: (error) => {
                console.error(error);
                message.error("更新客户失败");
              },
            });
          } else {
            commitCreateCustomer({
              variables: {
                input: { ...values, createdByID: "" },
                connections: [
                  ConnectionHandler.getConnectionID(
                    values.areaID,
                    "customersPageQuery_customers",
                  ),
                ],
              },
              onCompleted: () => {
                message.success("创建客户成功");
                onClose();
              },
              onError: (error) => {
                console.error(error);
                message.error("创建客户失败");
              },
            });
          }
        }}
      >
        <Form.Item name="name" label="客户名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="areaID" label="区域" rules={[{ required: true }]}>
          <Select
            options={data.areas.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item name="industry" label="行业">
          <Select
            options={industryOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item name="size" label="规模">
          <Select
            options={customerSizeOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item name="contactPerson" label="联系人">
          <Input />
        </Form.Item>
        <Form.Item name="contactPersonPosition" label="联系人职位">
          <Input />
        </Form.Item>
        <Form.Item name="contactPersonEmail" label="联系人邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="contactPersonPhone" label="联系人电话">
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

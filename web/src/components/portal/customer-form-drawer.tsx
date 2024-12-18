import { useRouteContext } from "@tanstack/react-router";
import { customerFormDrawerQuery } from "__generated__/customerFormDrawerQuery.graphql";
import { useUpdateCustomerMutation } from "__generated__/useUpdateCustomerMutation.graphql";
import {
  App,
  Button,
  Drawer,
  Form,
  FormItemProps,
  Input,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import {
  ConnectionHandler,
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { CreateCustomerInput } from "~/graphql/graphql";
import { useCreateCustomer } from "~/hooks/use-create-customer";
import { useUpdateCustomer } from "~/hooks/use-update-customer";
import {
  customerSizeOptions,
  industryOptions,
  ownerTypeOptions,
} from "~/lib/helper";
import { usePortalStore } from "~/store/portal";

const CustomerFormDrawerQuery = graphql`
  query customerFormDrawerQuery($id: ID!) {
    node(id: $id) {
      ... on User {
        areas {
          edges {
            node {
              id
              name
              users {
                edges {
                  node {
                    id
                    name
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

export function CustomerFormDrawer() {
  const customerFormOpen = usePortalStore((state) => state.customerFormOpen);
  const customerFormCustomer = usePortalStore(
    (state) => state.customerFormCustomer,
  );
  const { session } = useRouteContext({ from: "/_auth" });
  const [queryRef, loadQuery] = useQueryLoader<customerFormDrawerQuery>(
    CustomerFormDrawerQuery,
  );

  useEffect(() => {
    if (customerFormOpen && !queryRef) {
      loadQuery({ id: session.userId });
    }
  }, [customerFormOpen, session.userId]);

  const onClose = () => {
    usePortalStore.setState({
      customerFormOpen: false,
      customerFormCustomer: null,
    });
  };

  return (
    <>
      <Drawer
        title={customerFormCustomer ? "编辑客户" : "添加客户"}
        open={customerFormOpen}
        onClose={onClose}
        width={520}
        destroyOnClose
        maskClosable={!!customerFormCustomer}
      >
        {queryRef && <CustomerForm queryRef={queryRef} />}
      </Drawer>
    </>
  );
}

type CustomerFormProps = {
  queryRef: PreloadedQuery<customerFormDrawerQuery>;
};

function CustomerForm({ queryRef }: CustomerFormProps) {
  const data = usePreloadedQuery(CustomerFormDrawerQuery, queryRef);
  const [form] = Form.useForm<CreateCustomerInput>();
  const [commitCreateCustomer, isCreateCustomerInFlight] = useCreateCustomer();
  const [commitUpdateCustomer, isUpdateCustomerInFlight] = useUpdateCustomer();
  const { message } = App.useApp();
  const selectedCustomer = usePortalStore(
    (state) => state.customerFormCustomer,
  );

  const onClose = () => {
    usePortalStore.setState({
      customerFormOpen: false,
      customerFormCustomer: null,
    });
  };

  useEffect(() => {
    if (selectedCustomer?.id) {
      form.setFieldsValue({
        name: selectedCustomer.name,
        areaID: selectedCustomer.area.id,
        industry: selectedCustomer.industry,
        size: selectedCustomer.size,
        ownerType: selectedCustomer.ownerType,
        salesID: selectedCustomer.sales?.id,
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
            commitUpdateCustomer({
              variables: {
                id: selectedCustomer.id,
                input: values,
              },
              onCompleted: () => {
                message.destroy();
                message.success("更新客户成功");
                onClose();
              },
              onError: (error) => {
                message.destroy();
                console.error(error);
                message.error("更新客户失败");
              },
            });
          } else {
            const { contactPersonPosition, ...rest } = values;
            commitCreateCustomer({
              variables: {
                input: {
                  ...rest,
                  contactPersonPosition: contactPersonPosition?.at(0) ?? null,
                  createdByID: "",
                },
                connections: [
                  ConnectionHandler.getConnectionID(
                    values.areaID,
                    "customersPageQuery_customers",
                  ),
                  ConnectionHandler.getConnectionID(
                    "root",
                    "tenderFormFragment_customers",
                  ),
                ],
              },
              onCompleted: () => {
                message.destroy();
                message.success("创建客户成功");
                onClose();
              },
              onError: (error) => {
                console.error(error);
                message.destroy();
                message.error("创建客户失败");
              },
            });
          }
        }}
      >
        <Form.Item name="name" label="客户名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="salesID"
          label="客户所有人"
          rules={[{ required: true }]}
        >
          <Select
            optionFilterProp="label"
            options={data.node?.areas?.edges
              ?.flatMap((a) => a?.node?.users.edges)
              .map((u) => ({
                label: u?.node?.name,
                value: u?.node?.id,
              }))}
          />
        </Form.Item>
        <Form.Item
          name="ownerType"
          label="业主类型"
          rules={[{ required: true }]}
        >
          <Select
            options={ownerTypeOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item name="industry" label="行业" rules={[{ required: true }]}>
          <Select
            options={industryOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item name="areaID" label="区域" rules={[{ required: true }]}>
          <Select
            options={data.node?.areas?.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item name="size" label="规模" rules={[{ required: true }]}>
          <Select
            options={customerSizeOptions}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>

        <Form.Item
          name="contactPerson"
          label="对接人姓名"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="contactPersonPosition"
          label="对接人职位"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            onChange={(value) => {
              if (value?.length == 0) {
                form.setFieldValue("contactPersonPosition", null);
              } else if (value.at(1)) {
                form.setFieldValue("contactPersonPosition", value.at(1));
              }
            }}
            onDeselect={() => {
              form.setFieldValue("contactPersonPosition", null);
            }}
            options={[
              { label: "CEO", value: "CEO" },
              { label: "CTO", value: "CTO" },
              { label: "IT负责人", value: "IT负责人" },
              { label: "人事负责人", value: "人事负责人" },
              { label: "产品负责人", value: "产品负责人" },
              { label: "运营负责人", value: "运营负责人" },
              { label: "商务负责人", value: "商务负责人" },
              { label: "业务员", value: "业务员" },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="contactPersonPhone"
          label="联系电话"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="contactPersonEmail" label="对接人邮箱">
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

function ContactPersonPositionSelect({ value, onChange }: any) {
  const [selected, setSelected] = useState<string[]>(value ? [value] : []);
  return (
    <Select
      mode="tags"
      onChange={(value, options) => {
        if (value?.length == 1) {
          onChange?.(value.at(1));
          setSelected(value);
        } else if (value.at(1) && typeof value.at(1) !== "undefined") {
          onChange?.(value.at(1) as string);
          setSelected([value.at(1) as string]);
        }
      }}
      onDeselect={() => {
        setSelected([]);
      }}
      value={selected}
      options={[
        { label: "CEO", value: "CEO" },
        { label: "CTO", value: "CTO" },
        { label: "IT负责人", value: "IT负责人" },
        { label: "人事负责人", value: "人事负责人" },
        { label: "产品负责人", value: "产品负责人" },
        { label: "运营负责人", value: "运营负责人" },
        { label: "商务负责人", value: "商务负责人" },
        { label: "业务员", value: "业务员" },
      ]}
    />
  );
}

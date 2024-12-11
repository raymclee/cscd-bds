import {
  CreateUserInput,
  useCreateUserMutation$variables,
} from "__generated__/useCreateUserMutation.graphql";
import { userFormFragment$key } from "__generated__/userFormFragment.graphql";
import { useUpdateUserMutation$variables } from "__generated__/useUpdateUserMutation.graphql";
import { App, Button, Form, Input, Select, Space, Switch } from "antd";
import { useEffect } from "react";
import { graphql, useFragment } from "react-relay";
import { User } from "~/graphql/graphql";
import { useCreateUser } from "~/hooks/use-create-user";
import { useUpdateUser } from "~/hooks/use-update-user";
import { SearchUserSelect } from "./search-user-select";

export type UserFormProps = {
  queryRef: userFormFragment$key;
  selectedUser: User | null;
  onClose: () => void;
  connectionID: string;
  isSuperAdmin?: boolean;
};

export function UserForm({
  onClose,
  queryRef,
  connectionID,
  selectedUser,
  isSuperAdmin = false,
}: UserFormProps) {
  const data = useFragment(
    graphql`
      fragment userFormFragment on User {
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
  const [form] = Form.useForm<
    | useCreateUserMutation$variables["input"]
    | useUpdateUserMutation$variables["input"]
  >();
  const [commitCreateUser, isCreateUserInFlight] = useCreateUser();
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        name: selectedUser.name,
        email: selectedUser.email,
        username: selectedUser.username,
        openID: selectedUser.openID,
        avatarURL: selectedUser.avatarURL,
        areaIDs: selectedUser.areas.edges?.map((a) => a?.node?.id),
        disabled: selectedUser.disabled,
        isAdmin: selectedUser.isAdmin,
        hasMapAccess: selectedUser.hasMapAccess,
        hasEditAccess: selectedUser.hasEditAccess,
        isSales: selectedUser.isSales,
      });
    }
  }, [selectedUser]);

  return (
    <div className="h-full">
      <Form
        className="relative pb-16"
        form={form}
        layout="vertical"
        disabled={isCreateUserInFlight}
        initialValues={{ isSales: !isSuperAdmin }}
        // requiredMark="optional"
        onFinish={(values) => {
          if (selectedUser) {
            const { areaIDs, ...rest } = values as CreateUserInput;
            commitUpdateUser({
              variables: {
                id: selectedUser.id,
                input: {
                  ...rest,
                  clearAreas: true,
                  addAreaIDs: areaIDs,
                },
              },
              onCompleted(response, errors) {
                message.success("更新成功");
                onClose();
              },
              onError(error) {
                message.error("更新失败");
              },
            });
          } else {
            commitCreateUser({
              variables: {
                input: values as CreateUserInput,
                connections: [connectionID],
              },
              onCompleted(response, errors) {
                console.log(response);
                message.success("添加成功");
                onClose();
              },
              onError(error) {
                message.error("添加失败");
              },
            });
          }
        }}
      >
        <Form.Item
          name="zhtUser"
          label="中海通用戶"
          rules={[{ required: true }]}
        >
          <SearchUserSelect
            onSelectUser={(user) => {
              form.setFieldsValue({
                ...user,
              });
            }}
          />
        </Form.Item>
        {/* <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}
        <Form.Item name="email" label="電郵" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/* <Form.Item name="openID" label="中海通ID">
          <Input />
        </Form.Item>
        <Form.Item name="avatarURL" label="头像URL">
          <Input />
        </Form.Item> */}
        <Form.Item name="areaIDs" label="区域">
          <Select
            mode="multiple"
            options={data.areas.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
          />
        </Form.Item>
        <Form.Item name="hasEditAccess" label="可编辑">
          <Switch />
        </Form.Item>
        <Form.Item name="hasMapAccess" label="地图权限">
          <Switch />
        </Form.Item>
        {isSuperAdmin && (
          <Form.Item name="isSales" label="销售">
            <Switch />
          </Form.Item>
        )}
        <Form.Item name="isAdmin" label="管理员">
          <Switch />
        </Form.Item>
        {isSuperAdmin && (
          <>
            <Form.Item name="isLeader" label="領導">
              <Switch />
            </Form.Item>
            <Form.Item name="isSuperAdmin" label="超級管理員">
              <Switch />
            </Form.Item>
          </>
        )}
        <Form.Item name="disabled" label="禁用">
          <Switch />
        </Form.Item>
      </Form>
      <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 border-t bg-white px-6 py-3">
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isCreateUserInFlight || isUpdateUserInFlight}
            onClick={() => form.submit()}
          >
            保存
          </Button>
        </Space>
      </div>
    </div>
  );
}

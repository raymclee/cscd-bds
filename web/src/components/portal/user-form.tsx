import {
  CreateUserInput,
  useCreateUserMutation$variables,
} from "__generated__/useCreateUserMutation.graphql";
import { useUpdateUserMutation$variables } from "__generated__/useUpdateUserMutation.graphql";
import { App, Button, Form, Input, Select, Space, Switch } from "antd";
import React, { useEffect } from "react";
import { AreaConnection, User } from "~/graphql/graphql";
import { useCreateUser } from "~/hooks/use-create-user";
import { useUpdateUser } from "~/hooks/use-update-user";
import { SearchUserSelect } from "./search-user-select";

export type UserFormProps = {
  selectedUser: User | null;
  onClose: () => void;
  connectionIDs: string[];
  isSuperAdmin?: boolean;
  avaliableAreas: AreaConnection;
};

export function UserForm({
  onClose,
  connectionIDs,
  selectedUser,
  isSuperAdmin = false,
  avaliableAreas,
}: UserFormProps) {
  const [form] = Form.useForm<
    (
      | useCreateUserMutation$variables["input"]
      | useUpdateUserMutation$variables["input"]
    ) & { zhtUser: { label: string; value: string } }
  >();
  const [commitCreateUser, isCreateUserInFlight] = useCreateUser();
  const [commitUpdateUser, isUpdateUserInFlight] = useUpdateUser();
  const { message } = App.useApp();
  const [removedAreaIDs, setRemovedAreaIDs] = React.useState<string[]>([]);

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        name: selectedUser.name,
        email: selectedUser.email,
        username: selectedUser.username,
        openID: selectedUser.openID,
        avatarURL: selectedUser.avatarURL,
        areaIDs: selectedUser.areas.edges
          ?.filter((e) =>
            avaliableAreas.edges?.map((a) => a?.node?.id).includes(e?.node?.id),
          )
          .map((a) => a?.node?.id),
        disabled: selectedUser.disabled,
        isAdmin: selectedUser.isAdmin,
        hasMapAccess: selectedUser.hasMapAccess,
        hasEditAccess: selectedUser.hasEditAccess,
        isCeo: selectedUser.isCeo,
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
                  addAreaIDs: [
                    ...(areaIDs ?? []),
                    ...(selectedUser.areas.edges
                      ?.map((a) => a?.node?.id)
                      .filter(
                        (i): i is string => !!i && !removedAreaIDs?.includes(i),
                      ) ?? []),
                  ],
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
            const { zhtUser, ...input } = values;

            commitCreateUser({
              variables: {
                input: {
                  ...input,
                  email: "",
                  username: "",
                  name: zhtUser.label,
                  openID: zhtUser.value,
                },
                connections: connectionIDs,
              },
              onCompleted() {
                message.success("添加成功");
                onClose();
              },
              onError() {
                message.error("添加失败");
              },
            });
          }
        }}
      >
        {!selectedUser ? (
          <Form.Item
            name="zhtUser"
            label="中海通用戶"
            rules={[{ required: true }]}
          >
            <SearchUserSelect />
          </Form.Item>
        ) : (
          <>
            <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="電郵" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="openID" label="中海通ID">
              <Input />
            </Form.Item>
            <Form.Item name="avatarURL" label="头像URL">
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item name="areaIDs" label="区域">
          <Select
            mode="multiple"
            // options={data.areas.edges?.map((a) => ({
            //   label: a?.node?.name,
            //   value: a?.node?.id,
            // }))}
            options={avaliableAreas.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
            onDeselect={(value) => {
              setRemovedAreaIDs((prev) => [...prev, value]);
            }}
          />
        </Form.Item>
        {isSuperAdmin && (
          <Form.Item name="hasEditAccess" label="可编辑">
            <Switch />
          </Form.Item>
        )}
        <Form.Item name="hasMapAccess" label="地图权限">
          <Switch />
        </Form.Item>
        <Form.Item name="isAdmin" label="管理员">
          <Switch />
        </Form.Item>
        {isSuperAdmin && (
          <>
            <Form.Item name="isCeo" label="領導">
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

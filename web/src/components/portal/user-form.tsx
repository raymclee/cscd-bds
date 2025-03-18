import {
  CreateUserInput,
  useCreateUserMutation$variables,
} from "__generated__/useCreateUserMutation.graphql";
import { useUpdateUserMutation$variables } from "__generated__/useUpdateUserMutation.graphql";
import { App, Button, Form, Input, Select, Space, Switch } from "antd";
import React, { useEffect } from "react";
import { AreaConnection, ProjectConnection, User } from "~/graphql/graphql";
import { useCreateUser } from "~/hooks/use-create-user";
import { useUpdateUser } from "~/hooks/use-update-user";
import { SearchUserSelect } from "./search-user-select";
import { useRouteContext } from "@tanstack/react-router";

export type UserFormProps = {
  selectedUser: User | null;
  onClose: () => void;
  connectionIDs: string[];
  isSuperAdmin?: boolean;
  avaliableAreas: AreaConnection;
  avaliableProjects?: ProjectConnection;
};

export function UserForm({
  onClose,
  connectionIDs,
  selectedUser,
  isSuperAdmin = false,
  avaliableAreas,
  avaliableProjects,
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
  const [removedProjectIDs, setRemovedProjectIDs] = React.useState<string[]>(
    [],
  );
  const { session } = useRouteContext({ from: "/__auth" });

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
        isSuperAdmin: selectedUser.isSuperAdmin,
        hasMapAccess: selectedUser.hasMapAccess,
        hasEditAccess: selectedUser.hasEditAccess,
        isCeo: selectedUser.isCeo,
        projectIDs:
          selectedUser.projects?.edges?.length ===
          avaliableProjects?.edges?.length
            ? ["all"]
            : selectedUser.projects?.edges
                ?.filter((e) =>
                  avaliableProjects?.edges?.some(
                    (p) => p?.node?.id === e?.node?.id,
                  ),
                )
                .map((e) => e?.node?.id),
      });
    }
  }, [selectedUser]);

  return (
    <div className="h-full">
      <Form
        className="relative pb-16"
        form={form}
        layout="vertical"
        clearOnDestroy
        disabled={isCreateUserInFlight || isUpdateUserInFlight}
        // requiredMark="optional"
        onFinish={(values) => {
          if (selectedUser) {
            const { areaIDs, projectIDs, ...rest } = values as CreateUserInput;

            const _projectIDs = projectIDs?.includes("all")
              ? avaliableProjects?.edges
                  ?.map((p) => p?.node?.id)
                  .filter((i): i is string => !!i)
              : projectIDs?.filter((v) => v !== "all");

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
                  clearProjects: true,
                  addProjectIDs: [
                    ...(_projectIDs ?? []),
                    ...(!removedProjectIDs.includes("all")
                      ? (selectedUser.projects.edges
                          ?.map((p) => p?.node?.id)
                          .filter(
                            (i): i is string =>
                              !!i && !removedProjectIDs?.includes(i),
                          ) ?? [])
                      : []),
                  ],
                },
              },
              onCompleted(response, errors) {
                message.destroy();
                message.success("更新成功");
                onClose();
              },
              onError(error) {
                message.destroy();
                message.error("更新失败");
              },
            });
          } else {
            const { zhtUser, projectIDs, ...input } =
              values as CreateUserInput & {
                zhtUser: { label: string; value: string };
              };

            const _projectIDs = projectIDs?.includes("all")
              ? avaliableProjects?.edges
                  ?.map((p) => p?.node?.id)
                  .filter((i): i is string => !!i)
              : projectIDs?.filter((v) => v !== "all");

            commitCreateUser({
              variables: {
                input: {
                  ...input,
                  email: "",
                  username: "",
                  name: zhtUser.label,
                  openID: zhtUser.value,
                  projectIDs: _projectIDs,
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
            label="中海通用户"
            rules={[{ required: true }]}
          >
            <SearchUserSelect />
          </Form.Item>
        ) : (
          <>
            <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
              <Input disabled={!session.isSuperAdmin} />
            </Form.Item>
            <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
              <Input type="email" disabled={!session.isSuperAdmin} />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true }]}
            >
              <Input disabled={!session.isSuperAdmin} />
            </Form.Item>
            <Form.Item name="openID" label="中海通ID">
              <Input disabled={!session.isSuperAdmin} />
            </Form.Item>
            <Form.Item name="avatarURL" label="头像URL">
              <Input disabled={!session.isSuperAdmin} />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="areaIDs"
          label="区域"
          rules={[{ required: !isSuperAdmin }]}
        >
          <Select
            mode="multiple"
            // options={data.areas.edges?.map((a) => ({
            //   label: a?.node?.name,
            //   value: a?.node?.id,
            // }))}
            disabled={!session.isSuperAdmin}
            options={avaliableAreas.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
            onDeselect={(value) => {
              setRemovedAreaIDs((prev) => [...prev, value]);
            }}
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        {isSuperAdmin && (
          <Form.Item name="projectIDs" label="项目">
            <Select
              allowClear
              showSearch
              optionFilterProp="label"
              mode="multiple"
              options={
                avaliableProjects?.edges && avaliableProjects?.edges?.length > 0
                  ? [
                      {
                        label: "全部",
                        value: "all",
                      },
                      ...avaliableProjects?.edges?.map((p) => ({
                        label: p?.node?.code,
                        value: p?.node?.id,
                      })),
                    ]
                  : []
              }
              onSelect={(value) => {
                setRemovedProjectIDs((prev) => prev.filter((v) => v !== value));
              }}
              onDeselect={(value) => {
                setRemovedProjectIDs((prev) => [...prev, value]);
              }}
              onClear={() => {
                setRemovedProjectIDs(["all"]);
              }}
            />
          </Form.Item>
        )}
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
            <Form.Item name="isCeo" label="领导">
              <Switch />
            </Form.Item>
            <Form.Item name="isSuperAdmin" label="超级管理员">
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

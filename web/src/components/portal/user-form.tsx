import {
  CreateUserInput,
  useCreateUserMutation$variables,
} from "__generated__/useCreateUserMutation.graphql";
import { userFormFragment$key } from "__generated__/userFormFragment.graphql";
import { useUpdateUserMutation$variables } from "__generated__/useUpdateUserMutation.graphql";
import { App, Button, Form, Input, Select, Space, Switch } from "antd";
import { useEffect } from "react";
import { ConnectionHandler, graphql, useFragment } from "react-relay";
import { User } from "~/graphql/graphql";
import { useCreateUser } from "~/hooks/use-create-user";
import { useUpdateUser } from "~/hooks/use-update-user";

export function UserForm({
  onClose,
  queryRef,
  connectionID,
  selectedUser,
}: {
  onClose: () => void;
  queryRef: userFormFragment$key;
  connectionID: string;
  selectedUser: User | null;
}) {
  const data = useFragment(
    graphql`
      fragment userFormFragment on Query {
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
        isEditor: selectedUser.isEditor,
        hasMapAccess: selectedUser.hasMapAccess,
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
        requiredMark="optional"
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
            console.log(
              ConnectionHandler.getConnectionID("root", "usersPageQuery_users"),
            );
            commitCreateUser({
              variables: {
                input: values as CreateUserInput,
                connections: [connectionID],
              },
              // updater: (store) => {
              //   const payload = store.getRootField("createUser");
              //   const newUser = payload?.getLinkedRecord("edges");
              //   console.log({ payload, newUser });

              //   if (!newUser) return;

              //   // Get the connection using ConnectionHandler
              //   const connectionRecord = store.get(connectionID);
              //   if (!connectionRecord) return;

              //   // Create the edge with a stable ID
              //   const userId = newUser.getDataID();
              //   const edgeId = `client:${connectionID}:${userId}`;

              //   const edge = store.create(edgeId, "UserEdge");
              //   edge.setLinkedRecord(newUser, "node");

              //   // Get existing edges
              //   const existingEdges =
              //     connectionRecord.getLinkedRecords("edges") || [];

              //   // Append the new edge
              //   connectionRecord.setLinkedRecords(
              //     [...existingEdges, edge],
              //     "edges",
              //   );

              //   // Update the total count if it exists
              //   const count = connectionRecord.getValue("totalCount");
              //   if (typeof count === "number") {
              //     connectionRecord.setValue(count + 1, "totalCount");
              //   }
              // },
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
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="電郵" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="openID" label="中海通ID">
          <Input />
        </Form.Item>
        <Form.Item name="avatarURL" label="头像URL">
          <Input />
        </Form.Item>
        <Form.Item name="areaIDs" label="区域">
          <Select
            mode="multiple"
            options={data.areas.edges?.map((a) => ({
              label: a?.node?.name,
              value: a?.node?.id,
            }))}
          />
        </Form.Item>
        <Form.Item name="disabled" label="禁用">
          <Switch />
        </Form.Item>
        <Form.Item name="isAdmin" label="管理员">
          <Switch />
        </Form.Item>
        <Form.Item name="isEditor" label="可编辑" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="hasMapAccess" label="地图权限">
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

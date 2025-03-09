import { useRouteContext } from "@tanstack/react-router";
import { visitRecordFormDrawerQuery } from "__generated__/visitRecordFormDrawerQuery.graphql";
import {
  App,
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import {
  ConnectionHandler,
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { useCreateVisitRecord } from "~/hooks/use-create-visit-record";
import { useUpdateVisitRecord } from "~/hooks/use-update-visit-record";
import { visitTypeOptions } from "~/lib/helper";
import { usePortalStore } from "~/store/portal";

const VisitRecordFormDrawerQuery = graphql`
  query visitRecordFormDrawerQuery($areaId: ID!) {
    node(id: $areaId) {
      ... on Area {
        tenders {
          edges {
            node {
              id
              name
            }
          }
        }
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
`;

type VisitRecordFormDrawerProps = {
  areaId: string;
  customerId: string;
};

export function VisitRecordFormDrawer({
  areaId,
  customerId,
}: VisitRecordFormDrawerProps) {
  const open = usePortalStore((state) => state.visitRecordFormOpen);
  const [queryRef, loadQuery] = useQueryLoader<visitRecordFormDrawerQuery>(
    VisitRecordFormDrawerQuery,
  );
  const visitRecord = usePortalStore(
    (state) => state.visitRecordFormVisitRecord,
  );

  const onClose = () => {
    usePortalStore.setState({
      visitRecordFormOpen: false,
      visitRecordFormVisitRecord: null,
    });
  };

  useEffect(() => {
    if (open && !queryRef) {
      loadQuery({ areaId });
    }
  }, [open, areaId]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      destroyOnClose
      maskClosable={!!visitRecord}
      width={520}
      title={visitRecord ? "修改拜访记录" : "添加拜访记录"}
    >
      {queryRef && (
        <VisitRecordForm customerId={customerId} queryRef={queryRef} />
      )}
    </Drawer>
  );
}

type VisitRecordFormProps = {
  customerId: string;
  queryRef: PreloadedQuery<visitRecordFormDrawerQuery>;
};

function VisitRecordForm({ customerId, queryRef }: VisitRecordFormProps) {
  const data = usePreloadedQuery(VisitRecordFormDrawerQuery, queryRef);
  const [form] = Form.useForm();
  const [commitCreateVisitRecord, isCreateVisitRecordInFlight] =
    useCreateVisitRecord();
  const [commitUpdateVisitRecord, isUpdateVisitRecordInFlight] =
    useUpdateVisitRecord();
  const { message } = App.useApp();
  const visitRecord = usePortalStore(
    (state) => state.visitRecordFormVisitRecord,
  );
  const { session } = useRouteContext({ from: "/__auth" });

  const onClose = () => {
    usePortalStore.setState({
      visitRecordFormOpen: false,
      visitRecordFormVisitRecord: null,
    });
  };

  useEffect(() => {
    if (visitRecord) {
      form.setFieldsValue({
        date: dayjs(visitRecord.date),
        visitType: visitRecord.visitType,
        followupbyIDs: visitRecord.followupbys?.edges?.map((e) => e?.node?.id),
        commPeople: visitRecord.commPeople,
        commContent: visitRecord.commContent,
        nextStep: visitRecord.nextStep,
        tenderID: visitRecord.tender?.id,
      });
    }
  }, [visitRecord]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        clearOnDestroy
        disabled={isCreateVisitRecordInFlight || isUpdateVisitRecordInFlight}
        onFinish={(values) => {
          if (visitRecord) {
            const { followupbyIDs, ...input } = values;
            commitUpdateVisitRecord({
              variables: {
                id: visitRecord.id,
                input: {
                  ...input,
                  customerID: customerId,
                  clearFollowUpBys: true,
                  addFollowUpByIDs: followupbyIDs,
                },
              },
              onCompleted: () => {
                message.destroy();
                message.success("修改拜访记录成功");
                onClose();
              },
              onError: (error) => {
                console.error(error);
                message.destroy();
                message.error(error.message);
              },
            });
          } else {
            commitCreateVisitRecord({
              variables: {
                input: { ...values, customerID: customerId },
                connections: [
                  ConnectionHandler.getConnectionID(
                    session.userId,
                    "customerVisitRecordListFragment_visitRecords",
                    {
                      orderBy: [
                        {
                          direction: "DESC",
                          field: "DATE",
                        },
                      ],
                      where: {
                        customerID: customerId,
                      },
                    },
                  ),
                  ConnectionHandler.getConnectionID(
                    customerId,
                    "customerDetailFragment_lastVisitRecord",
                  ),
                ],
              },
              onCompleted: () => {
                message.destroy();
                message.success("添加拜访记录成功");
                onClose();
              },
              onError: (error) => {
                console.error(error);
                message.destroy();
                message.error(error.message);
              },
            });
          }
        }}
      >
        <Form.Item label="跟进时间" name="date" rules={[{ required: true }]}>
          <DatePicker mode="date" className="w-full" />
        </Form.Item>

        <Form.Item
          label="跟进形式"
          name="visitType"
          rules={[{ required: true }]}
        >
          <Select options={visitTypeOptions} />
        </Form.Item>

        <Form.Item
          label="跟进人员"
          name="followupbyIDs"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            optionFilterProp="label"
            options={data.node?.users?.edges?.map((u) => ({
              label: u?.node?.name,
              value: u?.node?.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="沟通对象"
          name="commPeople"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="沟通内容"
          name="commContent"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="下一步计划" name="nextStep">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="商机" name="tenderID">
          <Select
            optionFilterProp="label"
            showSearch
            options={data.node?.tenders?.edges?.map((t) => ({
              label: t?.node?.name,
              value: t?.node?.id,
            }))}
          />
        </Form.Item>
      </Form>

      <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-3 px-6 py-3 bg-white border-t">
        <Space>
          <Button onClick={onClose}>取消</Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={isCreateVisitRecordInFlight || isUpdateVisitRecordInFlight}
            // loading={isCreateUserInFlight || isUpdateUserInFlight}
            onClick={() => form.submit()}
          >
            {visitRecord ? "保存" : "提交"}
          </Button>
        </Space>
      </div>
    </>
  );
}

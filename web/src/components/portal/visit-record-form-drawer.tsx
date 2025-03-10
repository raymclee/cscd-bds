import { useRouteContext } from "@tanstack/react-router";
import { visitRecordFormDrawerQuery } from "__generated__/visitRecordFormDrawerQuery.graphql";
import {
  App,
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
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
  const commContent = Form.useWatch("commContent", form);

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
            const { followupbyIDs, commPeople, commContent, ...input } = values;
            if (commContent === "其他") {
              message.destroy();
              message.error("请输入沟通内容");
              return;
            }
            commitUpdateVisitRecord({
              variables: {
                id: visitRecord.id,
                input: {
                  ...input,
                  customerID: customerId,
                  clearFollowUpBys: true,
                  addFollowUpByIDs: followupbyIDs,
                  commPeople: commPeople[0],
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
            const { commPeople, commContent, ...input } = values;
            if (commContent === "其他") {
              message.destroy();
              message.error("请输入沟通内容");
              return;
            }
            commitCreateVisitRecord({
              variables: {
                input: {
                  ...input,
                  commPeople: commPeople[0],
                  commContent,
                  customerID: customerId,
                },
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
          {/* <Input /> */}
          <Select
            mode="tags"
            onChange={(value) => {
              if (value?.length == 0) {
                form.setFieldValue("commPeople", null);
              } else if (value.at(1)) {
                form.setFieldValue("commPeople", value.at(1));
              }
            }}
            onDeselect={() => {
              form.setFieldValue("commPeople", null);
            }}
            options={[
              { label: "甲方商务负责人", value: "甲方商务负责人" },
              { label: "甲方设计负责人", value: "甲方设计负责人" },
              { label: "甲方招采负责人", value: "甲方招采负责人" },
              { label: "甲方技术顾问", value: "甲方技术顾问" },
              { label: "甲方项目负责人", value: "甲方项目负责人" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="沟通内容"
          name="commContent"
          rules={[{ required: true }]}
        >
          {/* <Input.TextArea /> */}
          <Radio.Group
            className="!flex flex-col gap-2"
            // onChange={onChange}
            // value={value}
            options={[
              {
                value: "沟通拓展项目现场进度情况以及工程重难点。",
                label: "沟通拓展项目现场进度情况以及工程重难点。",
              },
              {
                value: "沟通拓展项目资金情况，以及主要商务条件。",
                label: "沟通拓展项目资金情况，以及主要商务条件。",
              },
              {
                value:
                  "沟通了解甲方项目设计进度计划、技术重难点和所需技术配合工作。",
                label:
                  "沟通了解甲方项目设计进度计划、技术重难点和所需技术配合工作。",
              },
              {
                value: "沟通了解项目招标时间，招标方式，参与单位等。",
                label: "沟通了解项目招标时间，招标方式，参与单位等。",
              },
              {
                value: "沟通了解项目竞和关系，以及项目招投标动态。",
                label: "沟通了解项目竞和关系，以及项目招投标动态。",
              },
              {
                value: "其他",
                label: (
                  <>
                    其他
                    {commContent === "其他" && (
                      <Input
                        required
                        placeholder="请输入"
                        // style={{ width: 120, marginInlineStart: 12 }}
                        className="!ms-[24px] !w-[240px]"
                      />
                    )}
                  </>
                ),
              },
            ]}
          />
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

      <div className="absolute right-0 bottom-0 left-0 flex justify-end gap-3 border-t bg-white px-6 py-3">
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

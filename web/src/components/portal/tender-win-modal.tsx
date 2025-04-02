import { App, Button, Form, Input, Modal, Select, Space } from "antd";
import { CheckOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "react-relay";
import { tenderWinModalFragment$key } from "__generated__/tenderWinModalFragment.graphql";
import { useWinTender } from "~/hooks/use-win-tender";
import { WinTenderInput } from "__generated__/useWinTenderMutation.graphql";
import { toActualAmount } from "~/lib/helper";

export function TenderWinModal({
  id,
  competitorRef,
  disabled,
}: {
  id: string;
  competitorRef: tenderWinModalFragment$key;
  disabled: boolean;
}) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [commitWinTender, isWinTenderInFlight] = useWinTender();
  const competitorsData = useFragment(
    graphql`
      fragment tenderWinModalFragment on Query {
        competitors {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    competitorRef,
  );
  const selectedCompetitors = Form.useWatch(["competitors"], form);
  const { message } = App.useApp();

  const ProjectCodeInput = useMemo(() => <Input />, []);
  const ProjectDefinitionInput = useMemo(() => <Input />, []);
  const TenderWinAmountInput = useMemo(
    () => <Input prefix="￥" suffix="亿元" />,
    [],
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<CheckOutlined />}
        disabled={disabled}
      >
        中标
      </Button>
      <Modal
        open={open}
        title="商机中标"
        okText="提交"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          disabled: isWinTenderInFlight,
        }}
        cancelButtonProps={{
          disabled: isWinTenderInFlight,
        }}
        onCancel={() => {
          onClose();
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isWinTenderInFlight}
            layout="vertical"
            form={form}
            clearOnDestroy
            onFinish={(values) => {
              const competitors = values.competitors.map((c: any) => {
                return {
                  id: c.competitor.value,
                  amount: toActualAmount(c.amount),
                };
              });
              commitWinTender({
                variables: {
                  id,
                  input: {
                    competitors,
                    tenderWinAmount: toActualAmount(values.tenderWinAmount),
                    projectCode: values.projectCode,
                    projectDefinition: values.projectDefinition,
                  },
                },
                onCompleted() {
                  message.destroy();
                  message.success("中标成功");
                  onClose();
                },
                onError(error) {
                  message.destroy();
                  message.error(error.message);
                },
              });
            }}
            initialValues={{ competitors: [{}] }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="projectCode"
          label="项目代码"
          className="!mt-8 md:col-span-2"
          rules={[{ required: true, max: 4 }]}
        >
          {ProjectCodeInput}
        </Form.Item>

        <Form.Item
          name="projectDefinition"
          label="项目定义"
          className="md:col-span-2"
          rules={[{ required: true, max: 10 }]}
        >
          {ProjectDefinitionInput}
        </Form.Item>

        <Form.Item
          name="tenderWinAmount"
          label="中标金额"
          className="md:col-span-2"
          rules={[{ required: true }]}
        >
          {TenderWinAmountInput}
        </Form.Item>

        <Form.Item label="竞争对手">
          <Form.List name="competitors">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="mb-2 grid grid-cols-[1fr_0.6fr_auto] items-center gap-2"
                  >
                    <Form.Item
                      {...restField}
                      noStyle
                      name={[name, "competitor"]}
                      label="竞争对手"
                      tooltip="失标后需要选择中标的竞争对手"
                      rules={[{ required: true, message: "请选择竞争对手" }]}
                    >
                      <Select
                        showSearch
                        // optionFilterProp="label"
                        placeholder="请选择竞争对手"
                        labelInValue
                        options={
                          competitorsData.competitors?.edges
                            ?.filter(
                              (c) =>
                                !selectedCompetitors
                                  ?.map(
                                    (c: { competitor: { value: string } }) =>
                                      c?.competitor?.value,
                                  )
                                  .includes(c?.node?.id),
                            )
                            ?.map((c) => {
                              return {
                                label: c?.node?.name,
                                value: c?.node?.id,
                              };
                            }) ?? []
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      noStyle
                      name={[name, "amount"]}
                      rules={[{ required: true, message: "请输入金额" }]}
                    >
                      <Input prefix="￥" suffix="亿元" placeholder="竞争金额" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>
                ))}
                <Button type="dashed" className="w-full" onClick={() => add()}>
                  添加竞争对手
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Modal>
    </>
  );
}

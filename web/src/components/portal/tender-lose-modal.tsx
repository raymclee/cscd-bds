import { App, Button, Form, Input, Modal, Select } from "antd";
import { CloseOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useFragment } from "react-relay";
import { graphql } from "react-relay";
import { tenderLoseModalFragment$key } from "__generated__/tenderLoseModalFragment.graphql";
import { useLoseTender } from "~/hooks/use-lose-tender";
import { toActualAmount } from "~/lib/helper";
import { WinLostTenderCompetitorInput } from "__generated__/useLoseTenderMutation.graphql";

export function TenderLoseModal({
  id,
  competitorRef,
  disabled,
}: {
  id: string;
  competitorRef: tenderLoseModalFragment$key;
  disabled: boolean;
}) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const competitorsData = useFragment(
    graphql`
      fragment tenderLoseModalFragment on Query {
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
  const winCompetitor = Form.useWatch(["winCompetitorId"], form);
  const { message } = App.useApp();
  const [loseTender, isLostTenderInFlight] = useLoseTender();

  const onClose = () => {
    setOpen(false);
  };

  const TenderWinAmountInput = useMemo(
    () => <Input prefix="￥" suffix="亿元" />,
    [],
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<CloseOutlined />}
        disabled={disabled}
      >
        失标
      </Button>
      <Modal
        open={open}
        title="商机失标"
        okText="提交"
        maskClosable={false}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          disabled: isLostTenderInFlight,
        }}
        cancelButtonProps={{ disabled: isLostTenderInFlight }}
        onCancel={() => {
          onClose();
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isLostTenderInFlight}
            layout="vertical"
            form={form}
            clearOnDestroy
            onFinish={(values) => {
              console.log(values);
              const competitors: WinLostTenderCompetitorInput[] =
                values.competitors.map((c: any) => {
                  return {
                    id: c.competitor.value,
                    amount: toActualAmount(c.amount),
                  };
                });
              if (
                competitors
                  .map((c) => c.id)
                  .includes(values.winCompetitor.value)
              ) {
                message.error("中标的竞争对手不能出现在竞争对手列表中");
                return;
              }
              loseTender({
                variables: {
                  id,
                  input: {
                    tenderAmount: toActualAmount(values.tenderAmount),
                    competitors,
                    winCompetitor: {
                      id: values.winCompetitor.value,
                      amount: toActualAmount(values.winAmount),
                    },
                  },
                },
                onCompleted() {
                  message.destroy();
                  message.success("失标成功");
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
          name="tenderAmount"
          label="我方投标金额"
          className="!mt-8 md:col-span-2"
          rules={[{ required: true }]}
        >
          {TenderWinAmountInput}
        </Form.Item>

        <Form.Item
          name="winCompetitor"
          label="中标的竞争对手"
          className="!mt-8 md:col-span-2"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="请选择竞争对手"
            labelInValue
            options={
              competitorsData.competitors?.edges?.map((c) => ({
                label: c?.node?.name,
                value: c?.node?.id,
              })) ?? []
            }
          />
        </Form.Item>

        <Form.Item
          name="winAmount"
          label="竞争对手中标金额"
          className="!mt-8 md:col-span-2"
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
                                  .includes(c?.node?.id) &&
                                c?.node?.id !== winCompetitor?.value,
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

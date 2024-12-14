import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "@tanstack/react-router";
import { tenderDetailFragment$key } from "__generated__/tenderDetailFragment.graphql";
import { tenderFormFragment$key } from "__generated__/tenderFormFragment.graphql";
import {
  App,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { ConnectionHandler, graphql, useFragment } from "react-relay";
import { CreateTenderInput } from "~/graphql/graphql";
import { useCreateTender } from "~/hooks/use-create-tender";
import { useUpdateTender } from "~/hooks/use-update-tender";
import { isGA, isHW, tenderStatusOptions } from "~/lib/helper";
import { FixedToolbar } from "./fixed-toolbar";
import { TenderDetailFragment } from "./tender-detail";

const { Dragger } = Upload;

const fragment = graphql`
  fragment tenderFormFragment on User {
    areas {
      edges {
        node {
          id
          name
          code
          customers {
            edges {
              node {
                id
                name
              }
            }
          }
          users(where: { isCeo: false, isSuperAdmin: false }) {
            edges {
              node {
                id
                name
              }
            }
          }
          provinces {
            edges {
              node {
                id
                name
                adcode
                cities {
                  edges {
                    node {
                      id
                      name
                      adcode
                      districts {
                        edges {
                          node {
                            id
                            name
                            adcode
                          }
                        }
                      }
                    }
                  }
                }
                districts {
                  edges {
                    node {
                      id
                      name
                      adcode
                    }
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

export type TenderFormProps = {
  queryRef: tenderFormFragment$key;
  tenderRef?: tenderDetailFragment$key | null;
};

export function TenderForm({ queryRef, tenderRef }: TenderFormProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<CreateTenderInput>();
  const data = useFragment(fragment, queryRef);
  const tender = useFragment(TenderDetailFragment, tenderRef);

  const [commitCreateMutation, isCreateInFlight] = useCreateTender();
  const [commitUpdateMutation, isUpdateInFlight] = useUpdateTender();
  const navigate = useNavigate();

  const areaID = Form.useWatch("areaID", form);
  const provinceID = Form.useWatch("provinceID", form);
  const cityID = Form.useWatch("cityID", form);

  const isGASelected = data.areas?.edges?.find(
    (e) => e?.node?.id === areaID && e.node.code === "GA",
  );
  const isHWSelected = data.areas.edges?.find(
    (e) => e?.node?.id === areaID && e.node.code === "HW",
  );

  const [imageFileNames, setImageFileNames] = useState<string[]>([]);
  const [attachmentFileNames, setAttachmentFileNames] = useState<string[]>([]);
  const [removeImageFileNames, setRemoveImageFileNames] = useState<string[]>(
    [],
  );
  const [removeAttachmentFileNames, setRemoveAttachmentFileNames] = useState<
    string[]
  >([]);

  const isGATender = isGA(tender as any);
  const isHWTender = isHW(tender as any);

  const showSHFields = !!data.areas.edges?.find(
    (e) =>
      e?.node?.id === areaID && e.node.code !== "GA" && e.node.code !== "HW",
  )?.node;

  const area = useMemo(
    () => data.areas.edges?.filter((e) => e?.node?.id === areaID),
    [data, areaID],
  );

  const provinces = useMemo(
    () =>
      data.areas?.edges
        ?.filter((e) => e?.node?.id === areaID)
        .flatMap((a) => a?.node?.provinces.edges?.map((p) => p?.node)),
    [data, areaID],
  );
  const cities = provinces?.find((p) => p?.id === provinceID)?.cities;
  const districts = cityID
    ? cities?.edges?.find((c) => c?.node?.id === cityID)?.node?.districts
    : provinces?.find((p) => p?.id === provinceID)?.districts;

  const customerOptions = useMemo(
    () =>
      area
        ?.flatMap((e) => e?.node?.customers.edges)
        .map((c) => ({ label: c?.node?.name, value: c?.node?.id })),
    [data, areaID],
  );

  const salesOptions = useMemo(
    () =>
      area
        ?.flatMap((e) => e?.node?.users.edges)
        .map((s) => ({ label: s?.node?.name, value: s?.node?.id })),
    [area, areaID],
  );

  useEffect(() => {
    if (tender) {
      form.setFieldsValue({
        name: tender.name,
        code: tender.code,
        status: tender.status,
        areaID: tender.area?.id,
        customerID: tender.customer?.id,
        discoveryDate: tender.discoveryDate && dayjs(tender.discoveryDate),
        createdByID: tender.createdBy?.id,
        finderID: tender.finder?.id,
        followingSaleIDs: tender.followingSales?.map((e) => e?.id),
        provinceID: tender.province?.id,
        cityID: tender.city?.id,
        districtID: tender.district?.id,
        estimatedAmount: tender.estimatedAmount,
        tenderDate: tender.tenderDate && dayjs(tender.tenderDate),
        contractor: tender.contractor,
        prepareToBid: tender.prepareToBid,
        projectCode: tender.projectCode,
        biddingDate: tender.biddingDate && dayjs(tender.biddingDate),
        estimatedProjectStartDate:
          tender.estimatedProjectStartDate &&
          dayjs(tender.estimatedProjectStartDate),
        estimatedProjectEndDate:
          tender.estimatedProjectEndDate &&
          dayjs(tender.estimatedProjectEndDate),
        projectType: tender.projectType,
        fullAddress: tender.fullAddress,
        images: tender.images?.map((image) => image),
        attachements: tender.attachements?.map((attachement) => attachement),
        architect: tender.architect,
        facadeConsultant: tender.facadeConsultant,
        designUnit: tender.designUnit,
        consultingFirm: tender.consultingFirm,
        keyProject: tender.keyProject,
        managementCompany: tender.managementCompany,
        tenderingAgency: tender.tenderingAgency,
        tenderWinCompany: tender.tenderWinCompany,
        tenderCode: tender.tenderCode,
        developer: tender.developer,
        tenderClosingDate:
          tender.tenderClosingDate && dayjs(tender.tenderClosingDate),
        constructionArea: tender.constructionArea,
        tenderWinDate: tender.tenderWinDate && dayjs(tender.tenderWinDate),
        tenderWinAmount: tender.tenderWinAmount,
        lastTenderAmount: tender.lastTenderAmount,
        remark: tender.remark,
      });
    }
  }, [tender]);

  return (
    <Form<CreateTenderInput>
      form={form}
      className="relative pb-24"
      // requiredMark="optional"
      disabled={isCreateInFlight || isUpdateInFlight}
      scrollToFirstError={{
        behavior: "smooth",
        block: "start",
        skipOverflowHiddenElements: true,
      }}
      initialValues={{ discoveryDate: dayjs() }}
      layout="vertical"
      onFinish={async (values) => {
        if (tender?.id) {
          const { images, attachements, followingSaleIDs, ...input } = values;
          commitUpdateMutation({
            variables: {
              id: tender.id,
              input: {
                ...input,
                clearFollowingSales: true,
                addFollowingSaleIDs: followingSaleIDs,
              },
              imageFileNames,
              attachmentFileNames,
              removeImageFileNames,
              removeAttachmentFileNames,
            },
            onCompleted() {
              navigate({ to: "/portal/tenders" });
              message.destroy();
              message.success("更新成功");
            },
            onError(error) {
              console.error({ error });
              message.destroy();
              message.error("更新失败");
            },
          });
        } else {
          const { images, attachements, ...input } = values;

          const connections = [
            ConnectionHandler.getConnectionID(
              values.areaID,
              "tendersTenderListFragment_tenders",
              {
                orderBy: [{ field: "CREATED_AT", direction: "DESC" }],
              },
            ),
          ];

          if (values.customerID) {
            connections.push(
              ConnectionHandler.getConnectionID(
                values.customerID,
                "customerTenderListFragment_tenders",
              ),
            );
          }

          commitCreateMutation({
            variables: {
              input: { ...input, code: "" },
              connections,
              imageFileNames,
              attachmentFileNames,
            },
            onCompleted() {
              navigate({ to: "/portal/tenders" });
              message.success("创建成功");
            },
            onError(error) {
              console.error({ error });
              message.error("创建失败");
            },
          });
        }
      }}
    >
      <Card title="信息">
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          <Form.Item
            name="areaID"
            label="业务区域"
            rules={[{ required: true }]}
          >
            <Select
              disabled={!!tender}
              options={data.areas?.edges
                ?.map((e) => e?.node)
                .map((a) => ({ label: a?.name, value: a?.id }))}
              showSearch
              optionFilterProp="label"
              onSelect={() => {
                form.resetFields([
                  "provinceID",
                  "cityID",
                  "districtID",
                  "finderID",
                  "createdByID",
                  "customerID",
                  "followingSaleIDs",
                  "tenderCode",
                  "developer",
                  "tenderClosingDate",
                  "tenderDate",
                ]);
              }}
            />
          </Form.Item>

          <Form.Item
            name={"name"}
            label="项目名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={"status"} label="状态" rules={[{ required: true }]}>
            <Select
              options={tenderStatusOptions.filter(
                (o) => o.value !== 3 && o.value !== 4,
              )}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          {!showSHFields && (
            <Form.Item
              name={"tenderCode"}
              label={"招标编号"}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name={
              isGATender || isHWTender || isGASelected || isHWSelected
                ? "developer"
                : "customerID"
            }
            label="业主名称"
            rules={[
              {
                required: !(
                  isGATender ||
                  isHWTender ||
                  isGASelected ||
                  isHWSelected
                ),
              },
            ]}
          >
            {isGATender || isHWTender || isGASelected || isHWSelected ? (
              <Input />
            ) : (
              <Select
                options={customerOptions}
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            )}
          </Form.Item>

          <Form.Item
            name="finderID"
            label="发现人"
            rules={[{ required: true }]}
          >
            <Select
              options={salesOptions}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item
            name="discoveryDate"
            label="发现日"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="createdByID"
            label="创建人"
            rules={[{ required: true }]}
          >
            <Select
              options={salesOptions}
              disabled={!!tender}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item name="followingSaleIDs" label="当前跟踪人">
            <Select
              options={salesOptions}
              mode="multiple"
              maxTagCount={3}
              allowClear
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item name="estimatedAmount" label="预计金额">
            <Input />
          </Form.Item>

          <Form.Item
            name={showSHFields ? "tenderDate" : "tenderClosingDate"}
            label={showSHFields ? "招标日" : "交標日期"}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item name="contractor" label="总包单位" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item name="address" label="详细地址" rules={[]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="provinceID"
            label="省"
            rules={[{ required: showSHFields }]}
          >
            <Select
              options={provinces?.map((p) => ({
                label: p?.name,
                value: p?.id,
              }))}
              onSelect={() => {
                form.resetFields(["cityID", "districtID"]);
              }}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item
            name="cityID"
            label="市"
            rules={[{ required: cities?.edges?.length != 0 && showSHFields }]}
          >
            <Select
              disabled={cities?.edges?.length === 0}
              options={cities?.edges
                ?.map((c) => c?.node)
                .map((c) => ({ label: c?.name, value: c?.id }))}
              onSelect={() => {
                form.resetFields(["districtID"]);
              }}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          <Form.Item
            name="districtID"
            label="区"
            rules={[{ required: showSHFields }]}
          >
            <Select
              options={districts?.edges
                ?.map((e) => e && e.node)
                .map((n) => ({
                  label: n?.name,
                  value: n?.id,
                }))}
              showSearch
              optionFilterProp="label"
            />
          </Form.Item>

          {showSHFields && (
            <>
              <Form.Item name="prepareToBid" label="是否准备投标">
                <Switch />
              </Form.Item>

              <Form.Item name="projectCode" label="项目代码">
                <Input />
              </Form.Item>

              <Form.Item name="biddingDate" label="投标时间">
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="estimatedProjectStartDate"
                label="预计项目开始日期"
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="estimatedProjectEndDate"
                label="项目预计结束日期"
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item name="projectType" label="项目类型">
                <Select
                  options={[
                    { label: "GC:830工程项目", value: "GC" },
                    { label: "SC:830生产项目", value: "SC" },
                    { label: "YF:830研发项目", value: "YF" },
                  ]}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item name="projectDefinition" label="项目定义">
                <Input />
              </Form.Item>

              <Form.Item
                name="remark"
                label="备注"
                className="sm:col-span-2 lg:col-span-3"
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name="attachements"
                label="附件"
                className="sm:col-span-2 lg:col-span-3"
              >
                <Dragger
                  multiple
                  name="files"
                  action="/api/v1/file/upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                  onChange={(info) => {
                    for (const file of info.fileList) {
                      if (file.status === "done") {
                        setAttachmentFileNames((prev) => [...prev, file.name]);
                      }
                      if (
                        file.status === "error" ||
                        file.status === "removed"
                      ) {
                        setAttachmentFileNames((prev) =>
                          prev.filter((name) => name !== file.name),
                        );
                      }
                    }
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
                  <p className="ant-upload-hint">支持单个或批量上传。</p>
                </Dragger>
              </Form.Item>
            </>
          )}

          {showSHFields && (
            <>
              <Form.Item
                name="biddingInstructions"
                label="立项/投标说明"
                className="sm:col-span-2 lg:col-span-3"
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item name="costEngineer" label="造价师">
                <Input />
              </Form.Item>

              <Form.Item name="tenderForm" label="招采形式">
                <Input />
              </Form.Item>

              <Form.Item name="contractForm" label="合同形式">
                <Input />
              </Form.Item>

              <Form.Item name="managementCompany" label="管理公司">
                <Input />
              </Form.Item>

              <Form.Item name="tenderingAgency" label="招标代理">
                <Input />
              </Form.Item>

              <Form.Item name="consultingFirm" label="咨询公司">
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item name="facadeConsultant" label="幕墙顾问">
            <Input />
          </Form.Item>

          <Form.Item name="designUnit" label="设计单位">
            <Input />
          </Form.Item>

          <Form.Item
            name="images"
            label="效果图"
            className="sm:col-span-2 lg:col-span-3"
          >
            <Dragger
              multiple
              defaultFileList={tender?.images?.map((url, i) => ({
                uid: i.toString(),
                name: url,
                url,
                status: "done",
              }))}
              name="files"
              action="/api/v1/file/upload"
              accept=".jpg,.jpeg,.png,.gif"
              listType="picture-card"
              onRemove={(file) => {
                setRemoveImageFileNames((prev) => [...prev, file.name]);
              }}
              onChange={(info) => {
                console.log(info);
                for (const file of info.fileList) {
                  if (
                    file.status === "done" &&
                    !file.name.startsWith("/static/")
                  ) {
                    setImageFileNames((prev) => {
                      if (prev.includes(file.name)) {
                        return prev;
                      }
                      return [...prev, file.name];
                    });
                  }
                  if (file.status === "error" || file.status === "removed") {
                    setImageFileNames((prev) =>
                      prev.filter((name) => name !== file.name),
                    );
                  }
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖动文件到此区域上传</p>
              <p className="ant-upload-hint">支持单个或批量上传。</p>
            </Dragger>
          </Form.Item>
        </div>
      </Card>

      {/* <Form.Item name="geoCoordinate" label="geoCoordinate">
          <Input />
        </Form.Item>
        <Form.Item name="geoBounds" label="geoBounds">
          <Input />
        </Form.Item> */}

      {showSHFields && (
        <>
          <Card className="mt-4" title="情况">
            <Row>
              <Col sm={24}>
                <Form.Item name="tenderSituations" label="项目主要情况">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={24}>
                <Form.Item name="ownerSituations" label="业主主要情况">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col sm={24}>
                <Form.Item name="competitorSituations" label="竞争对手情况">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card title="评分" className="mt-4">
            <Form.Item
              name="sizeAndValueRating"
              label="规模及价值-评分（5分制）"
              rules={[{ type: "number", max: 5, min: 1 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="sizeAndValueRatingOverview"
              label="规模及价值-概述"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Form.Item
              name="creditAndPaymentRating"
              label="资信及付款-评分（5分制）"
              rules={[{ type: "number", max: 5, min: 1 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="creditAndPaymentRatingOverview"
              label="资信及付款-概述"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Form.Item
              name="timeLimitRating"
              label="中标原则及时限-评分（5分制）"
              rules={[{ type: "number", max: 5, min: 1 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="timeLimitRatingOverview"
              label="中标原则及时限-概述"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Form.Item
              name="competitivePartnershipRating"
              label="客情关系-评分（5分制）"
              rules={[{ type: "number", max: 5, min: 1 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="customerRelationshipRatingOverview"
              label="客情关系-概述"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>

            <Divider />

            <Form.Item
              name="competitivePartnershipRating"
              label="竞争合作关系-评分（5分制）"
              rules={[{ type: "number", max: 5, min: 1 }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="competitivePartnershipRatingOverview"
              label="竞争合作关系-概述"
              rules={[]}
            >
              <Input.TextArea />
            </Form.Item>
          </Card>
        </>
      )}

      <FixedToolbar>
        <Button
          onClick={() => {
            navigate({ to: ".." });
          }}
        >
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </FixedToolbar>
    </Form>
  );
}

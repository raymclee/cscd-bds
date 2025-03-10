import { InboxOutlined, PlusCircleFilled } from "@ant-design/icons";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { tenderDetailFragment$key } from "__generated__/tenderDetailFragment.graphql";
import { tenderFormFragment$key } from "__generated__/tenderFormFragment.graphql";
import { tenderFormFragment_competitors$key } from "__generated__/tenderFormFragment_competitors.graphql";
import { tenderForm_provinceCityDistrictSelectorQuery } from "__generated__/tenderForm_provinceCityDistrictSelectorQuery.graphql";
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
import {
  ConnectionHandler,
  graphql,
  PreloadedQuery,
  useFragment,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { CreateTenderInput } from "~/graphql/graphql";
import { useCreateTender } from "~/hooks/use-create-tender";
import { useUpdateTender } from "~/hooks/use-update-tender";
import {
  fixAmount,
  isGA,
  isGAorHWOnly,
  levelInvolvedOptions,
  projectTypeOptions,
  tenderStatusOptions,
  toActualAmount,
} from "~/lib/helper";
import { FixedToolbar } from "./fixed-toolbar";
import { TenderDetailFragment } from "./tender-detail";
import { SearchLocationSelect } from "./search-location-select";
import { TenderFormMap } from "./tender-form-map";
import { usePortalStore } from "~/store/portal";
import { Plus } from "lucide-react";
import { cn } from "~/lib/utils";

const { Dragger } = Upload;

const fragment = graphql`
  fragment tenderFormFragment on User
  @argumentDefinitions(first: { type: Int }, last: { type: Int }) {
    areas {
      edges {
        node {
          id
          name
          code
          customers(first: $first, last: $last)
            @connection(key: "tenderFormFragment_customers") {
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
  }
`;

export type TenderFormProps = {
  queryRef: tenderFormFragment$key;
  tenderRef?: tenderDetailFragment$key | null;
  competitorRef: tenderFormFragment_competitors$key;
};

export function TenderForm({
  queryRef,
  tenderRef,
  competitorRef,
}: TenderFormProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm<
    CreateTenderInput & { geoCoordinate: number[] }
  >();
  const data = useFragment(fragment, queryRef);
  const tender = useFragment(TenderDetailFragment, tenderRef);
  const { session } = useRouteContext({ from: "/__auth" });
  const competitorsData = useFragment(
    graphql`
      fragment tenderFormFragment_competitors on Query {
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

  const [commitCreateMutation, isCreateInFlight] = useCreateTender();
  const [commitUpdateMutation, isUpdateInFlight] = useUpdateTender();
  const navigate = useNavigate();

  const areaID = Form.useWatch("areaID", form);

  const status = Form.useWatch("status", form);
  const prepareToBid = Form.useWatch("prepareToBid", form);

  const [imageFileNames, setImageFileNames] = useState<string[]>([]);
  const [attachmentFileNames, setAttachmentFileNames] = useState<string[]>([]);
  const [removeImageFileNames, setRemoveImageFileNames] = useState<string[]>(
    [],
  );
  const [removeAttachmentFileNames, setRemoveAttachmentFileNames] = useState<
    string[]
  >([]);
  const showSHFields = !!data.areas.edges?.find(
    (e) =>
      e?.node?.id === areaID && e.node.code !== "GA" && e.node.code !== "HW",
  )?.node;

  const area = useMemo(
    () => data.areas.edges?.filter((e) => e?.node?.id === areaID),
    [data, areaID],
  );
  // const isCreateOrUpdateHW = area?.some((a) => a?.node?.code === "HW");

  const customerOptions = area
    ?.flatMap((e) => e?.node?.customers.edges)
    .map((c) => ({ label: c?.node?.name, value: c?.node?.id }));

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
        estimatedAmount: fixAmount(tender.estimatedAmount),
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
        address: tender.fullAddress || tender.address,
        fullAddress: tender.fullAddress,
        images: tender.images?.map((image) => image),
        attachements: tender.attachements?.map((attachement) => attachement),
        architect: tender.architect,
        facadeConsultant: tender.facadeConsultant,
        designUnit: tender.designUnit,
        consultingFirm: tender.consultingFirm,
        keyProject: tender.keyProject,
        currentProgress: tender.currentProgress,
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
        tenderForm: tender.tenderForm,
        contractForm: tender.contractForm,
        biddingInstructions: tender.biddingInstructions,
        tenderSituations: tender.tenderSituations,
        ownerSituations: tender.ownerSituations,
        competitorSituations: tender.competitorSituations,
        costEngineer: tender.costEngineer,
        sizeAndValueRating: tender.sizeAndValueRating,
        sizeAndValueRatingOverview: tender.sizeAndValueRatingOverview,
        creditAndPaymentRating: tender.creditAndPaymentRating,
        creditAndPaymentRatingOverview: tender.creditAndPaymentRatingOverview,
        timeLimitRating: tender.timeLimitRating,
        timeLimitRatingOverview: tender.timeLimitRatingOverview,
        customerRelationshipRating: tender.customerRelationshipRating,
        customerRelationshipRatingOverview:
          tender.customerRelationshipRatingOverview,
        competitivePartnershipRating: tender.competitivePartnershipRating,
        competitivePartnershipRatingOverview:
          tender.competitivePartnershipRatingOverview,
        levelInvolved: tender.levelInvolved,
      });
    }
  }, [tender]);

  return (
    <Form<CreateTenderInput & { geoCoordinate: number[] }>
      form={form}
      className="relative !pb-24"
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
          const {
            images,
            attachements,
            followingSaleIDs,
            estimatedAmount,
            geoCoordinate,
            tenderWinAmount,
            ...input
          } = values;
          commitUpdateMutation({
            variables: {
              id: tender.id,
              input: {
                ...input,
                clearFollowingSales: true,
                addFollowingSaleIDs: followingSaleIDs,
                estimatedAmount: toActualAmount(estimatedAmount),
                tenderWinAmount: tenderWinAmount
                  ? toActualAmount(tenderWinAmount)
                  : undefined,
              },
              imageFileNames,
              attachmentFileNames,
              removeImageFileNames,
              removeAttachmentFileNames,
              geoCoordinate,
            },
            onCompleted() {
              navigate({ to: "/portal/tenders" });
              message.destroy();
              message.success("更新成功");
            },
            onError(error) {
              let text = "更新失败";
              if (error.message.includes("no geo code")) {
                text = "请输入正确和完整的地址";
              } else if (error.message.includes("failed to get district")) {
                text = "请输入正确和完整的地址";
              }
              console.error({ error });
              message.destroy();
              message.error(text);
            },
          });
        } else {
          const {
            images,
            attachements,
            estimatedAmount,
            geoCoordinate,
            tenderWinAmount,
            ...input
          } = values;

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
              input: {
                ...input,
                code: "",
                estimatedAmount: toActualAmount(estimatedAmount),
                createdByID: session.userId,
                tenderWinAmount: tenderWinAmount
                  ? toActualAmount(tenderWinAmount)
                  : undefined,
              },
              connections,
              imageFileNames,
              attachmentFileNames,
              geoCoordinate,
            },
            onCompleted() {
              navigate({ to: "/portal/tenders" });
              message.success("创建成功");
            },
            onError(error) {
              let text = "创建失败";
              if (error.message.includes("no geo code")) {
                text = "请输入正确和完整的地址";
              } else if (error.message.includes("failed to get district")) {
                text = "请输入正确和完整的地址";
              }
              console.error({ error });
              message.destroy();
              message.error(text);
            },
          });
        }
      }}
    >
      <Card
        title="信息"
        extra={[
          <Button
            // type="link"
            type="primary"
            icon={<Plus size={16} />}
            onClick={() => {
              usePortalStore.setState({
                customerFormOpen: true,
                customerFormSelectedAreaID: areaID,
              });
            }}
          >
            添加客户
          </Button>,
        ]}
      >
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
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
                  "address",
                  "fullAddress",
                ]);
              }}
            />
          </Form.Item>

          <Form.Item
            name="geoCoordinate"
            label="geoCoordinate"
            hidden
          ></Form.Item>

          {(areaID || tender) && !showSHFields && (
            <>
              <Form.Item
                name={"name"}
                label="项目名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"developer"}
                label="业主名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"status"}
                label="状态"
                rules={[{ required: true }]}
              >
                <Select
                  options={tenderStatusOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item
                name={"tenderCode"}
                label={"招标编号"}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="contractor"
                label="总包单位"
                rules={[{ required: true }]}
              >
                <Input />
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
                name={"tenderClosingDate"}
                label={"交標日期"}
                rules={[{ required: true }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <ProvinceCityDistrictSelectorLoader />

              {/* <Form.Item
                name="address"
                label="详细地址"
                rules={[{ required: true }]}
                className="md:col-span-2"
              >
                <Input />
              </Form.Item> */}

              {/* <Form.Item
                name="fullAddress"
                label="地理位置"
                rules={[{ required: true }]}
                className="md:col-span-2"
              >
                {isCreateOrUpdateHW ? (
                  <Input />
                ) : (
                  <Input
                    disabled
                    // disabled
                    // className="!cursor-auto"
                    onClick={() => {
                      usePortalStore.setState({ tenderFormMapOpen: true });
                    }}
                    suffix={
                      <TenderFormMap
                        onComplete={({ address, lnglat }) => {
                          form.setFieldValue("fullAddress", address);
                          form.setFieldValue("geoCoordinate", lnglat.toArray());
                        }}
                        defaultLnglat={tender?.geoCoordinate?.coordinates}
                      />
                    }
                  />
                )}
              </Form.Item> */}

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
                <Input prefix="$" suffix="亿元" />
              </Form.Item>
            </>
          )}

          {(areaID || tender) && showSHFields && (
            <>
              <Form.Item
                name={"name"}
                label="项目名称"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"customerID"}
                label="业主名称"
                rules={[{ required: true }]}
              >
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
              </Form.Item>

              <Form.Item
                name={"status"}
                label="状态"
                rules={[{ required: true }]}
              >
                <Select
                  options={tenderStatusOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              {status == 3 && (
                <>
                  <Form.Item
                    name="projectCode"
                    label="项目代码"
                    className="md:col-span-2"
                    rules={[{ required: true, max: 4 }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="projectDefinition"
                    label="项目定义"
                    className="md:col-span-2"
                    rules={[{ required: true, max: 10 }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tenderWinAmount"
                    label="中标金额"
                    className="md:col-span-2"
                    rules={[{ required: true }]}
                  >
                    <Input prefix="￥" suffix="亿元" />
                  </Form.Item>
                </>
              )}

              {status === 4 && (
                <>
                  <Form.Item
                    className="md:col-span-2 lg:col-span-4"
                    label="竞争对手"
                    tooltip="失标后需要选择中标的竞争对手"
                    name="competitorID"
                    rules={[{ required: true, message: "请选择竞争对手" }]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      options={
                        competitorsData.competitors?.edges?.map((c) => ({
                          label: c?.node?.name,
                          value: c?.node?.id,
                        })) ?? []
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    name="tenderWinAmount"
                    label="中标金额"
                    className="md:col-span-2"
                    rules={[{ required: true }]}
                  >
                    <Input prefix="￥" suffix="亿元" />
                  </Form.Item>
                </>
              )}

              <Form.Item
                name="finderID"
                label="商机所有人"
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

              <ProvinceCityDistrictSelectorLoader showSHFields />

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
                <Input prefix="￥" suffix="亿元" />
              </Form.Item>

              <Form.Item name={"tenderDate"} label={"招标日"}>
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item name="contractor" label="总包单位" rules={[]}>
                <Input />
              </Form.Item>

              <Form.Item name="biddingDate" label="投标时间">
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="estimatedProjectStartDate"
                label="预计项目开始日期"
                rules={[{ required: status === 3 }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                name="estimatedProjectEndDate"
                label="项目预计结束日期"
                rules={[{ required: status === 3 }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item name="projectType" label="项目类型">
                <Select
                  options={projectTypeOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item name="levelInvolved" label="涉及层面">
                <Select options={levelInvolvedOptions} />
              </Form.Item>

              <Form.Item name="keyProject" label="是否重点跟进项目">
                <Switch />
              </Form.Item>

              <Form.Item name="prepareToBid" label="是否准备投标">
                <Switch />
              </Form.Item>

              {prepareToBid && (
                <Form.Item
                  name="attachements"
                  label="附件"
                  className="sm:col-span-2 md:col-span-3 lg:col-span-4"
                >
                  <Dragger
                    defaultFileList={tender?.attachements?.map((url, i) => ({
                      uid: i.toString(),
                      name: url.split("/").pop() ?? "",
                      url,
                      status: "done",
                    }))}
                    multiple
                    name="files"
                    action="/api/v1/file/upload"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                    onRemove={(file) => {
                      setRemoveAttachmentFileNames((prev) => [
                        ...prev,
                        file.name,
                      ]);
                    }}
                    onChange={(info) => {
                      for (const file of info.fileList) {
                        if (
                          file.status === "done" &&
                          !file.name.startsWith("/static/") &&
                          file.lastModified
                        ) {
                          setAttachmentFileNames((prev) => {
                            if (prev.includes(file.name)) {
                              return prev;
                            }
                            return [...prev, file.name];
                          });
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
                    <p className="ant-upload-text">
                      点击或拖动文件到此区域上传
                    </p>
                    <p className="ant-upload-hint">支持单个或批量上传。</p>
                  </Dragger>
                </Form.Item>
              )}

              <Form.Item
                name="currentProgress"
                label="当前进展"
                className="sm:col-span-2 md:col-span-3 lg:col-span-4"
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name="remark"
                label="备注"
                className="sm:col-span-2 md:col-span-3 lg:col-span-4"
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                name="biddingInstructions"
                label="立项/投标说明"
                className="sm:col-span-2 md:col-span-3 lg:col-span-4"
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

              <Form.Item name="facadeConsultant" label="幕墙顾问">
                <Input />
              </Form.Item>

              <Form.Item name="designUnit" label="设计单位">
                <Input />
              </Form.Item>
            </>
          )}

          {(areaID || tender) && (
            <Form.Item
              name="images"
              label="效果图"
              className="sm:col-span-2 md:col-span-3 lg:col-span-4"
            >
              <Dragger
                multiple
                defaultFileList={tender?.images?.map((url, i) => ({
                  uid: i.toString(),
                  name: url.split("/").pop() ?? "",
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
                  for (const file of info.fileList) {
                    if (
                      file.status === "done" &&
                      !file.name.startsWith("/static/") &&
                      file.lastModified
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
          )}
        </div>
      </Card>

      {/* <Form.Item name="geoCoordinate" label="geoCoordinate">
          <Input />
        </Form.Item>
        <Form.Item name="geoBounds" label="geoBounds">
          <Input />
        </Form.Item> */}

      {(areaID || tender) && showSHFields && (
        <>
          <Card className="!mt-4" title="情况">
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

          <Card title="评分" className="!mt-4">
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
              name="customerRelationshipRating"
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
        <Button
          type="primary"
          htmlType="submit"
          loading={isCreateInFlight || isUpdateInFlight}
        >
          提交
        </Button>
      </FixedToolbar>
    </Form>
  );
}

const ProvinceCityDistrictSelectorQuery = graphql`
  query tenderForm_provinceCityDistrictSelectorQuery($areaID: ID!) {
    node(id: $areaID) {
      ... on Area {
        provinces {
          edges {
            node {
              id
              name
              cities {
                edges {
                  node {
                    id
                    name
                    districts {
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
              districts {
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

function ProvinceCityDistrictSelectorLoader({
  showSHFields = false,
}: {
  showSHFields?: boolean;
}) {
  const form = Form.useFormInstance();
  const areaID = Form.useWatch("areaID", form);
  const [queryRef, loadQuery] =
    useQueryLoader<tenderForm_provinceCityDistrictSelectorQuery>(
      ProvinceCityDistrictSelectorQuery,
    );

  useEffect(() => {
    if (areaID) {
      loadQuery({ areaID });
    }
  }, [areaID]);

  return (
    <>
      <Form.Item
        name="fullAddress"
        label="详细地址"
        rules={[{ required: true }]}
        className={cn(showSHFields ? "md:col-span-2" : "md:col-span-3")}
      >
        {/* <Input
                  disabled
                  onClick={() => {
                    usePortalStore.setState({ tenderFormMapOpen: true });
                  }}
                  suffix={
                    <TenderFormMap
                      onComplete={({ address, lnglat }) => {
                        form.setFieldValue("fullAddress", address);
                        form.setFieldValue("geoCoordinate", lnglat.toArray());
                      }}
                      defaultLnglat={tender?.geoCoordinate?.coordinates}
                    />
                  }
                /> */}
        <SearchLocationSelect
          areaId={areaID}
          onAddressSelected={({ data }) => {
            form.setFieldValue("provinceID", data.province?.id);
            form.setFieldValue("cityID", data.city?.id);
            form.setFieldValue("districtID", data.district?.id);
            form.setFieldValue("geoCoordinate", [data.lng, data.lat]);
          }}
        />
      </Form.Item>
      {queryRef ? (
        <ProvinceCityDistrictSelector queryRef={queryRef} />
      ) : (
        ["省", "市", "区"].map((label, i) => (
          <Form.Item key={i} label={label}>
            <Select />
          </Form.Item>
        ))
      )}
    </>
  );
}

function ProvinceCityDistrictSelector({
  queryRef,
}: {
  queryRef: PreloadedQuery<tenderForm_provinceCityDistrictSelectorQuery>;
}) {
  const form = Form.useFormInstance();
  const data = usePreloadedQuery<tenderForm_provinceCityDistrictSelectorQuery>(
    ProvinceCityDistrictSelectorQuery,
    queryRef,
  );

  const provinceID = Form.useWatch("provinceID");
  const cityID = Form.useWatch("cityID");

  const provinces = data.node?.provinces?.edges?.map((e) => e?.node);

  const cities = provinces?.find((p) => p?.id === provinceID)?.cities;

  const districts = cityID
    ? cities?.edges?.find((c) => c?.node?.id === cityID)?.node?.districts
    : provinces?.find((p) => p?.id === provinceID)?.districts;

  return (
    <>
      <Form.Item
        name="provinceID"
        label="省"
        rules={[{ required: provinces && provinces.length > 0 }]}
      >
        <Select
          options={provinces?.map((p) => ({
            label: p?.name,
            value: p?.id,
          }))}
          showSearch
          optionFilterProp="label"
          onSelect={() => {
            form.resetFields(["cityID", "districtID"]);
          }}
        />
      </Form.Item>

      <Form.Item
        name="cityID"
        label="市"
        rules={[
          {
            required: cities?.edges ? cities?.edges?.length > 0 : false,
          },
        ]}
      >
        <Select
          disabled={cities?.edges?.length === 0}
          options={cities?.edges
            ?.map((e) => e?.node)
            .map((c) => ({
              label: c?.name,
              value: c?.id,
            }))}
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
        rules={[
          { required: districts?.edges ? districts?.edges?.length > 0 : false },
        ]}
      >
        <Select
          options={districts?.edges
            ?.map((e) => e?.node)
            .map((d) => ({
              label: d?.name,
              value: d?.id,
            }))}
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>
    </>
  );
}

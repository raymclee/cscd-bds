import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useRouteContext } from "@tanstack/react-router";
import {
  tenderDetailFragment$data,
  tenderDetailFragment$key,
} from "__generated__/tenderDetailFragment.graphql";
import {
  App,
  Button,
  Card,
  Descriptions,
  Empty,
  Image,
  List,
  Space,
} from "antd";
import dayjs from "dayjs";
import { graphql, useFragment } from "react-relay";
import { useUpdateTender } from "~/hooks/use-update-tender";
import {
  classifyText,
  fixAmount,
  levelInvolvedText,
  projectTypeText,
  tenderStatusText,
} from "~/lib/helper";
import { canEdit } from "~/lib/permission";

type TenderDetailProps = {
  queryRef: tenderDetailFragment$key;
};

export const TenderDetailFragment = graphql`
  fragment tenderDetailFragment on Tender {
    id
    isApproved
    code
    name
    status
    estimatedAmount
    tenderDate
    discoveryDate
    address
    fullAddress
    contractor
    prepareToBid
    projectCode
    projectType
    estimatedProjectStartDate
    estimatedProjectEndDate
    levelInvolved
    costEngineer
    sizeAndValueRating
    sizeAndValueRatingOverview
    creditAndPaymentRating
    creditAndPaymentRatingOverview
    timeLimitRating
    timeLimitRatingOverview
    customerRelationshipRating
    customerRelationshipRatingOverview
    competitivePartnershipRating
    competitivePartnershipRatingOverview
    tenderSituations
    ownerSituations
    biddingInstructions
    competitorSituations
    tenderForm
    contractForm
    managementCompany
    tenderingAgency
    biddingDate
    facadeConsultant
    designUnit
    consultingFirm
    keyProject
    currentProgress
    tenderWinCompany
    tenderWinDate
    tenderWinAmount
    lastTenderAmount
    attachements
    tenderCode
    developer
    architect
    facadeConsultant
    tenderClosingDate
    constructionArea
    remark
    images
    geoCoordinate {
      coordinates
    }
    createdBy {
      id
    }
    finder {
      id
      name
    }
    area {
      id
      code
      name
    }
    followingSales {
      id
      name
    }
    customer {
      id
      ownerType
      name
    }
    province {
      id
      adcode
      name
    }
    city {
      id
      adcode
      name
    }
    district {
      id
      adcode
      name
    }
    classify
  }
`;

export function TenderDetail({ queryRef }: TenderDetailProps) {
  const data = useFragment(TenderDetailFragment, queryRef);
  return data.area.code === "GA" || data.area.code === "HW" ? (
    <GAAndHWTender tender={data} />
  ) : (
    <SHTender tender={data} />
  );
}

function SHTender({ tender }: { tender: tenderDetailFragment$data }) {
  const { session } = useRouteContext({ from: "/__auth" });
  const {
    id,
    name,
    status,
    tenderSituations,
    ownerSituations,
    biddingInstructions,
    competitorSituations,
    tenderForm,
    contractForm,
    managementCompany,
    tenderingAgency,
    facadeConsultant,
    designUnit,
    consultingFirm,
    images,
    fullAddress,
    remark,
    customer,
    estimatedAmount,
    tenderDate,
    keyProject,
    currentProgress,
    contractor,
    projectCode,
    projectType,
    estimatedProjectStartDate,
    estimatedProjectEndDate,
    levelInvolved,
    prepareToBid,
    costEngineer,
    sizeAndValueRating,
    sizeAndValueRatingOverview,
    creditAndPaymentRating,
    creditAndPaymentRatingOverview,
    timeLimitRating,
    timeLimitRatingOverview,
    customerRelationshipRating,
    customerRelationshipRatingOverview,
    competitivePartnershipRating,
    competitivePartnershipRatingOverview,
    attachements,
    finder,
    followingSales,
    isApproved,
    classify,
  } = tender;
  const { message, modal } = App.useApp();
  const [updateTender, inFlight] = useUpdateTender();

  return (
    <div className="!space-y-4">
      <Descriptions
        className="rounded-lg bg-white !p-6"
        title={name}
        extra={
          canEdit(session, { tender }) && (
            <Space>
              <Link to="/portal/tenders/$id/edit" params={{ id }}>
                <Button type="primary" icon={<EditOutlined />}>
                  编辑
                </Button>
              </Link>
              {(session.isAdmin || session.isSuperAdmin) && (
                <Button
                  type="primary"
                  disabled={isApproved}
                  icon={<CheckOutlined />}
                  onClick={async () => {
                    const confirmed = await modal.confirm({
                      title: "批核",
                      content: "确定批核该商机吗？",
                      okText: "同意",
                      cancelText: "拒绝",
                      cancelButtonProps: {
                        danger: true,
                      },
                    });
                    if (confirmed) {
                      updateTender({
                        variables: {
                          id,
                          input: { isApproved: true },
                          attachmentFileNames: [],
                          imageFileNames: [],
                        },
                        onCompleted() {
                          message.destroy();
                          message.success("批核成功");
                        },
                        onError(error) {
                          console.error(error);
                          message.destroy();
                          message.error("批核失败");
                        },
                      });
                    }
                  }}
                >
                  批核
                </Button>
              )}
            </Space>
          )
        }
        items={[
          { key: "status", label: "状态", children: tenderStatusText(status) },
          {
            key: "customer",
            label: "业主",
            children: (
              <Link
                to="/portal/customers/$id"
                params={{ id: customer?.id || "" }}
                className="text-blue-500 hover:text-blue-700"
              >
                {customer?.name}
              </Link>
            ),
          },
          {
            key: "isApproved",
            label: "审批状态",
            children: isApproved ? "已审批" : "未审批",
          },
          {
            key: "finder",
            label: "发现人",
            children: finder?.name || "-",
          },
          {
            key: "followingSales",
            label: "当前跟踪人",
            children: followingSales?.map(({ name }) => name).join(", ") || "-",
          },
          {
            key: "classify",
            label: "分类",
            children: classify ? classifyText(classify) : "-",
          },
          {
            key: "estimatedAmount",
            label: "预计金额",
            children: estimatedAmount
              ? `￥${fixAmount(estimatedAmount)}亿元`
              : "-",
          },
          {
            key: "tenderDate",
            label: "招标日",
            children: tenderDate ? dayjs(tenderDate).format("LL") : "-",
          },
          {
            key: "contractor",
            label: "总包单位",
            children: contractor || "-",
          },
          {
            key: "projectCode",
            label: "项目代码",
            children: projectCode || "-",
          },
          {
            key: "projectType",
            label: "项目类型",
            children: projectTypeText(projectType) || "-",
          },
          {
            key: "estimatedProjectDates",
            label: "预计项目周期",
            children: estimatedProjectStartDate
              ? `${dayjs(estimatedProjectStartDate).format("LL")} ~ ${dayjs(estimatedProjectEndDate).format("LL")}`
              : "-",
          },
          {
            key: "levelInvolved",
            label: "涉及层面",
            children: levelInvolved ? levelInvolvedText(levelInvolved) : "-",
          },
          {
            key: "keyProject",
            label: "是否重点跟进项目",
            children: keyProject ? "是" : "否",
          },
          {
            key: "prepareToBid",
            label: "准备投标",
            children: prepareToBid ? "是" : "否",
          },
          {
            key: "costEngineer",
            label: "造价师",
            children: costEngineer || "-",
            span: 2,
          },
          {
            key: "fullAddress",
            label: "地址",
            children: fullAddress || "-",
            span: 3,
          },
          {
            key: "remark",
            label: "备注",
            children: remark || "-",
            span: 3,
          },
          {
            key: "biddingInstructions",
            label: "立项/投标说明",
            children: biddingInstructions || "-",
            span: 3,
          },
          {
            key: "tenderForm",
            label: "招采形式",
            children: tenderForm || "-",
          },
          {
            key: "contractForm",
            label: "合同形式",
            children: contractForm || "-",
          },
          {
            key: "managementCompany",
            label: "管理公司",
            children: managementCompany || "-",
          },
          {
            key: "tenderingAgency",
            label: "招标代理",
            children: tenderingAgency || "-",
          },
          {
            key: "consultingFirm",
            label: "咨询公司",
            children: consultingFirm || "-",
          },
          {
            key: "facadeConsultant",
            label: "幕墙顾问",
            children: facadeConsultant || "-",
          },
          {
            key: "designUnit",
            label: "设计单位",
            children: designUnit || "-",
          },
          {
            key: "currentProgress",
            label: "当前进展",
            children: currentProgress || "-",
          },
        ]}
      />

      <Descriptions
        className="rounded-lg bg-white !p-6"
        title="项目情况"
        items={[
          {
            key: "tenderSituations",
            label: "项目主要情况",
            children: tenderSituations || "-",
            span: 3,
          },
          {
            key: "ownerSituations",
            label: "业主主要情况",
            children: ownerSituations || "-",
            span: 3,
          },
          {
            key: "competitorSituations",
            label: "竞争对手情况",
            children: competitorSituations || "-",
            span: 3,
          },
        ]}
      />

      <Descriptions
        className="rounded-lg bg-white !p-6"
        title="评分"
        items={[
          {
            key: "sizeAndValue",
            label: "规模及价值",
            children: sizeAndValueRating ? (
              <div>
                <div>评分：{sizeAndValueRating}/5</div>
                <div>概述：{sizeAndValueRatingOverview || "-"}</div>
              </div>
            ) : (
              "-"
            ),
            span: 3,
          },
          {
            key: "creditAndPayment",
            label: "资信及付款",
            children: creditAndPaymentRating ? (
              <div>
                <div>评分：{creditAndPaymentRating}/5</div>
                <div>概述：{creditAndPaymentRatingOverview || "-"}</div>
              </div>
            ) : (
              "-"
            ),
            span: 3,
          },
          {
            key: "timeLimit",
            label: "中标原则及时限",
            children: timeLimitRating ? (
              <div>
                <div>评分：{timeLimitRating}/5</div>
                <div>概述：{timeLimitRatingOverview || "-"}</div>
              </div>
            ) : (
              "-"
            ),
            span: 3,
          },
          {
            key: "customerRelationship",
            label: "客情关系",
            children: customerRelationshipRating ? (
              <div>
                <div>评分：{customerRelationshipRating}/5</div>
                <div>概述：{customerRelationshipRatingOverview || "-"}</div>
              </div>
            ) : (
              "-"
            ),
            span: 3,
          },
          {
            key: "competitivePartnership",
            label: "竞争合作关系",
            children: competitivePartnershipRating ? (
              <div>
                <div>评分：{competitivePartnershipRating}/5</div>
                <div>概述：{competitivePartnershipRatingOverview || "-"}</div>
              </div>
            ) : (
              "-"
            ),
            span: 3,
          },
        ]}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card title="效果图">
          {images?.length && images?.length > 0 ? (
            <Image.PreviewGroup preview={{}}>
              {images?.map((image, i) => (
                <Image
                  className="aspect-video max-h-[200px] overflow-hidden"
                  key={["list", i].join("-")}
                  src={image}
                />
              ))}
            </Image.PreviewGroup>
          ) : (
            <Empty description="暂无效果图" />
          )}
        </Card>

        <Card title="附件">
          <List
            dataSource={attachements?.filter(Boolean)}
            renderItem={(item) => (
              <List.Item>
                <a
                  href={item}
                  className="text-blue-500 underline hover:text-blue-700 hover:no-underline"
                >
                  {item.split("/").pop()}
                </a>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}

function GAAndHWTender({ tender }: { tender: tenderDetailFragment$data }) {
  const { session } = useRouteContext({ from: "/__auth" });
  const {
    id,
    name,
    status,
    tenderCode,
    developer,
    architect,
    facadeConsultant,
    tenderClosingDate,
    constructionArea,
    images,
    fullAddress,
    tenderWinAmount,
    tenderWinDate,
    tenderWinCompany,
    lastTenderAmount,
    followingSales,
    finder,
  } = tender;
  return (
    <div className="!space-y-4">
      <Descriptions
        className="rounded-lg bg-white !p-6"
        extra={
          canEdit(session, { tender }) && (
            <Space>
              <Link to="/portal/tenders/$id/edit" params={{ id }}>
                <Button type="primary" icon={<EditOutlined />}>
                  编辑
                </Button>
              </Link>
            </Space>
          )
        }
        title={name}
        items={[
          { key: "tenderCode", label: "投標編號", children: tenderCode },
          {
            key: "status",
            label: "狀態",
            children: tenderStatusText(status),
          },
          {
            key: "tenderDate",
            label: "交標日期",
            children: tenderClosingDate
              ? dayjs(tenderClosingDate).format("LL")
              : "-",
          },
          {
            key: "developer",
            label: "業主",
            children: developer ? developer : "-",
          },
          {
            key: "finder",
            label: "发现人",
            children: finder?.name || "-",
          },
          {
            key: "followingSales",
            label: "当前跟踪人",
            children: followingSales?.map(({ name }) => name).join(", ") || "-",
          },
          {
            key: "architect",
            label: "設計師",
            children: architect ? architect : "-",
          },
          {
            key: "facadeConsultant",
            label: "外觀顧問",
            children: facadeConsultant ? facadeConsultant : "-",
          },
          {
            key: "constructionArea",
            label: "施工面積",
            children: constructionArea ? constructionArea : "-",
          },

          {
            key: "fullAddress",
            label: "地址",
            children: fullAddress ? fullAddress : "-",
          },
          {
            key: "followingSales",
            label: "跟進銷售",
            children:
              followingSales && followingSales?.length > 0
                ? followingSales?.map(({ name }) => name).join(", ")
                : "-",
          },
        ]}
      />

      <Descriptions
        className="rounded-lg bg-white !p-6"
        title="得標資料"
        items={[
          {
            key: "tenderWinDate",
            label: "得標日期",
            children: tenderWinDate ? dayjs(tenderWinDate).format("LL") : "-",
          },
          {
            key: "tenderWinAmount",
            label: "得標金額",
            children: tenderWinAmount ? tenderWinAmount : "-",
          },
          {
            key: "lastTenderAmount",
            label: "最後一次投標金額",
            children: lastTenderAmount ? lastTenderAmount : "-",
          },
          {
            key: "tenderWinCompany",
            label: "得標公司",
            children: tenderWinCompany ? tenderWinCompany : "-",
          },
        ]}
      />

      <Image.PreviewGroup preview={{}}>
        {images?.map((image, i) => (
          <Image
            className="aspect-video max-h-[300px] overflow-hidden"
            key={["list", i].join("-")}
            src={image}
          />
        ))}
      </Image.PreviewGroup>

      {/* <div className="max-h-[600px] w-[30%]">
        <Carousel>
          <CarouselContent>
            {images?.map((image, i) => (
              <CarouselItem key={["list", i].join("-")}>
                <img
                  src={image}
                  className="aspect-[16/9] h-full w-full rounded object-cover"
                  alt={name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div> */}
    </div>
  );
}

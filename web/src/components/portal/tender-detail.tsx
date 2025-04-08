import { EditOutlined } from "@ant-design/icons";
import { Link, useRouteContext, useSearch } from "@tanstack/react-router";
import {
  tenderDetailFragment$data,
  tenderDetailFragment$key,
} from "__generated__/tenderDetailFragment.graphql";
import { tenderLoseModalFragment$key } from "__generated__/tenderLoseModalFragment.graphql";
import { tenderWinModalFragment$key } from "__generated__/tenderWinModalFragment.graphql";
import {
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Empty,
  Image,
  List,
  Space,
  Tag,
  Timeline,
} from "antd";
import dayjs from "dayjs";
import { graphql, useFragment } from "react-relay";
import {
  approvalStatusTagColor,
  approvalStatusText,
  classifyText,
  fixAmount,
  levelInvolvedText,
  projectTypeText,
  tenderStatusText,
} from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { cn } from "~/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ApprovalModal } from "./approval-modal";
import { TenderLoseModal } from "./tender-lose-modal";
import { TenderWinModal } from "./tender-win-modal";

type TenderDetailProps = {
  queryRef: tenderDetailFragment$key;
  competitorRef: tenderWinModalFragment$key;
  lostCompetitorRef: tenderLoseModalFragment$key;
};

export const TenderDetailFragment = graphql`
  fragment tenderDetailFragment on Tender {
    id
    code
    area {
      id
      code
      name
    }
    followingSales {
      id
      name
    }
    activeProfile {
      id
      createdAt
      updatedAt
      approvalStatus
      approver {
        id
        name
      }
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
      projectDefinition
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
      tenderAmount
      lastTenderAmount
      attachments
      tenderCode
      developer
      architect
      facadeConsultant
      tenderClosingDate
      constructionArea
      remark
      images
      geoCoordinate
      createdBy {
        id
        name
      }
      finder {
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
    pendingProfile {
      id
      createdAt
      createdBy {
        id
        leader {
          id
        }
      }
      approvalStatus
      approver {
        id
        name
      }
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
      projectDefinition
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
      tenderAmount
      lastTenderAmount
      attachments
      tenderCode
      developer
      architect
      facadeConsultant
      tenderClosingDate
      constructionArea
      remark
      images
      geoCoordinate
      createdBy {
        id
        name
      }
      finder {
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
    profiles(orderBy: [{ field: CREATED_AT, direction: DESC }]) {
      edges {
        node {
          id
          createdAt
          approvalStatus
          approvalDate
          approver {
            id
            name
          }
          name
          status
          estimatedAmount
          tenderDate
          discoveryDate
          address
          fullAddress
          contractor
          prepareToBid
          tenderAmount
          projectCode
          projectDefinition
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
          attachments
          tenderCode
          developer
          architect
          facadeConsultant
          tenderClosingDate
          constructionArea
          remark
          images
          geoCoordinate
          createdBy {
            id
            name
          }
          finder {
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
      }
    }
  }
`;

export function TenderDetail({
  queryRef,
  competitorRef,
  lostCompetitorRef,
}: TenderDetailProps) {
  const data = useFragment(TenderDetailFragment, queryRef);
  const { profiles } = data;
  const selectedProfile = useSearch({
    from: "/__auth/__portal/portal/tenders_/$id",
    select: (state) =>
      data.profiles.edges?.find((e) => e?.node?.id === state.p)?.node,
  });
  const isSH = data.area.code !== "GA" && data.area.code !== "HW";

  return (
    <div className="flex flex-wrap gap-2">
      {/* <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 xl:grid-cols-4"> */}
      {isSH ? (
        <SHTender
          tender={data}
          competitorRef={competitorRef}
          lostCompetitorRef={lostCompetitorRef}
        />
      ) : (
        <GAAndHWTender tender={data} />
      )}

      {isSH && (
        <div
          className={cn("top-28 mt-8 w-full self-start lg:sticky lg:w-[340px]")}
          // className={cn("self-start mt-8 top-28 lg:sticky")}
        >
          <ScrollArea className={cn("h-[calc(100vh-128px)]")}>
            <Timeline
              className="py-2 pr-4 lg:-ml-28"
              mode="left"
              items={[
                ...(profiles?.edges?.map((e, i) => {
                  const isFirst =
                    profiles?.edges && i == profiles?.edges?.length - 1;
                  const action = isFirst ? "创建了" : "更新了";
                  const isPending = e?.node?.approvalStatus == 1;
                  const isApproved = e?.node?.approvalStatus == 2;
                  const isRejected = e?.node?.approvalStatus == 3;
                  const isCancelled = e?.node?.approvalStatus == 4;
                  const isActive = data.activeProfile?.id === e?.node?.id;

                  const activeId = selectedProfile
                    ? selectedProfile?.id
                    : data.pendingProfile?.approvalStatus == 1
                      ? data.pendingProfile?.id
                      : data.activeProfile?.id;
                  return {
                    color: activeId == e?.node?.id ? undefined : "gray",
                    // label: isPending ? (
                    //   <div>
                    //     <Tag color="blue">当前</Tag>
                    //     <Tag color="green">待审批</Tag>
                    //   </div>
                    // ) : isActive ? (
                    //   <Tag color="blue">当前</Tag>
                    // ) : (
                    //   <Tag
                    //     color={approvalStatusTagColor(e?.node?.approvalStatus)}
                    //   >
                    //     {approvalStatusText(e?.node?.approvalStatus)}
                    //   </Tag>
                    // ),
                    label: (
                      <div>
                        {isActive && (
                          <div className="mb-1">
                            <Tag color="blue">当前</Tag>
                          </div>
                        )}
                        {isPending && <Tag color="green">待审批</Tag>}
                        {isApproved && <Tag color="green">已审批</Tag>}
                        {isRejected && <Tag color="red">已拒绝</Tag>}
                        {isCancelled && <Tag color="red">已取消</Tag>}
                      </div>
                    ),
                    children: (
                      <Link
                        to="."
                        search={(prev) => ({ ...prev, p: e?.node?.id })}
                        preload={false}
                        className="flex flex-col gap-1"
                        replace
                      >
                        <div className="flex gap-1 py-0.5 text-sm text-gray-500">
                          <span>{dayjs(e?.node?.createdAt).format("LLL")}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {`${e?.node?.createdBy?.name} ${action}商机`}
                        </div>
                        {(isApproved || isRejected) && (
                          <>
                            {e?.node.approvalDate && (
                              <div className="text-sm text-gray-500">
                                {dayjs(e?.node.approvalDate).format("LLL")}
                              </div>
                            )}
                            {isApproved && (
                              <div className="text-sm text-gray-500">
                                {e?.node?.approver?.name || "系统"} 批核了
                              </div>
                            )}
                            {isRejected && (
                              <div className="text-sm text-gray-500">
                                {e?.node?.approver?.name || "系统"} 拒绝了
                              </div>
                            )}
                          </>
                        )}
                      </Link>
                    ),
                  };
                }) || []),
              ]}
            />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

function SHTender({
  tender,
  competitorRef,
  lostCompetitorRef,
}: {
  tender: tenderDetailFragment$data;
  competitorRef: tenderWinModalFragment$key;
  lostCompetitorRef: tenderLoseModalFragment$key;
}) {
  const selectedProfileId = useSearch({
    from: "/__auth/__portal/portal/tenders_/$id",
    select: (state) => state.p,
  });
  const { session } = useRouteContext({ from: "/__auth" });
  const { id, followingSales, area, profiles, activeProfile, pendingProfile } =
    tender;
  const {
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
    attachments,
    finder,
    approvalStatus,
    classify,
    createdBy,
    tenderWinAmount,
    projectDefinition,
    tenderWinDate,
    tenderAmount,
  } = selectedProfileId
    ? (profiles?.edges?.find((e) => e?.node?.id === selectedProfileId)?.node ??
      {})
    : pendingProfile?.approvalStatus == 1
      ? pendingProfile
      : activeProfile || {};

  const isLeader = session.userId == pendingProfile?.createdBy?.leader?.id;

  const items = [
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
      span: "filled",
    },
    {
      key: "fullAddress",
      label: "地址",
      children: fullAddress || "-",
      span: "filled",
    },
    {
      key: "status",
      label: "状态",
      children: tenderStatusText(status),
    },

    {
      key: "finder",
      label: "发现人",
      children: finder?.name || "-",
    },
    {
      key: "createdBy",
      label: "创建人",
      children: createdBy?.name || "-",
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
      children: estimatedAmount ? `￥${fixAmount(estimatedAmount)}亿元` : "-",
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
    },
    {
      key: "remark",
      label: "备注",
      children: remark || "-",
      span: "filled",
    },
    {
      key: "biddingInstructions",
      label: "立项/投标说明",
      children: biddingInstructions || "-",
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
  ];

  if (status == 3) {
    items.push(
      {
        key: "projectCode",
        label: "项目代码",
        children: projectCode || "-",
      },
      {
        key: "projectDefinition",
        label: "项目定义",
        children: projectDefinition || "-",
      },
      {
        key: "tenderWinAmount",
        label: "中标金额",
        children: tenderWinAmount ? `￥${fixAmount(tenderWinAmount)}亿元` : "-",
      },
      {
        key: "tenderWinDate",
        label: "中标日期",
        children: tenderWinDate ? dayjs(tenderWinDate).format("LL") : "-",
      },
    );
  } else if (status == 4) {
    items.push(
      {
        key: "tenderAmount",
        label: "我方投标金额",
        children: tenderAmount ? `￥${fixAmount(tenderAmount)}亿元` : "-",
      },
      {
        key: "tenderWinDate",
        label: "中标日期",
        children: tenderWinDate ? dayjs(tenderWinDate).format("LL") : "-",
      },
    );
  }

  return (
    <div className="!space-y-4 md:w-full lg:flex-1">
      <Descriptions
        column={{ xs: 1, lg: 2, xxl: 3 }}
        className="rounded-lg bg-white !p-6"
        title={
          <div className="flex h-8 flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span>{name}</span>
              <div className="flex items-center">
                <Tag>{area.name}</Tag>
                <Tag color={approvalStatusTagColor(approvalStatus)}>
                  {approvalStatusText(approvalStatus)}
                </Tag>
              </div>
            </div>
            {canEdit(session, { tender }) && (
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/portal/tenders/$id/edit"
                  params={{ id }}
                  // disabled={!isEditable}
                >
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    // disabled={!isEditable}
                    // size="small"
                  >
                    编辑
                  </Button>
                </Link>
                <TenderWinModal
                  id={id}
                  disabled={activeProfile?.approvalStatus != 2}
                  competitorRef={competitorRef}
                />
                <TenderLoseModal
                  id={id}
                  disabled={activeProfile?.approvalStatus != 2}
                  competitorRef={lostCompetitorRef}
                />
                {(isLeader || session.isAdmin || session.isSuperAdmin) && (
                  <ApprovalModal tender={tender} />
                )}
              </div>
            )}
          </div>
        }
        items={items as DescriptionsProps["items"]}
      />

      <Descriptions
        className="rounded-lg bg-white !p-6"
        title="项目情况"
        column={1}
        items={[
          {
            key: "tenderSituations",
            label: "项目主要情况",
            children: tenderSituations || "-",
          },
          {
            key: "ownerSituations",
            label: "业主主要情况",
            children: ownerSituations || "-",
          },
          {
            key: "competitorSituations",
            label: "竞争对手情况",
            children: competitorSituations || "-",
          },
        ]}
      />

      <Descriptions
        className="rounded-lg bg-white !p-6"
        title="评分"
        column={1}
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
            dataSource={attachments?.filter(Boolean)}
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
  const { id, followingSales, profiles } = tender;
  const {
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
    finder,
    createdBy,
  } = profiles?.edges?.[0]?.node ?? {};
  return (
    <div className="!space-y-4 lg:col-span-4">
      <Descriptions
        className="rounded-lg bg-white !p-6"
        title={
          <div className="flex items-center justify-between">
            <span>{name}</span>
            {canEdit(session, { tender }) && (
              <Space>
                <Link to="/portal/tenders/$id/edit" params={{ id }}>
                  <Button type="primary" icon={<EditOutlined />}>
                    编辑
                  </Button>
                </Link>
              </Space>
            )}
          </div>
        }
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
            label: "商机所有人",
            children: finder?.name || "-",
          },
          {
            key: "createdBy",
            label: "创建人",
            children: createdBy?.name || "-",
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

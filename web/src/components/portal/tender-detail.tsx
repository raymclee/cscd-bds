import {
  tenderDetailFragment$data,
  tenderDetailFragment$key,
} from "__generated__/tenderDetailFragment.graphql";
import { Button, Card, Descriptions, Image, Space } from "antd";
import dayjs from "dayjs";
import { graphql, useFragment } from "react-relay";
import { isGAorHWOnly, tenderStatusText } from "~/lib/helper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Link, useRouteContext } from "@tanstack/react-router";
import { canEdit } from "~/lib/permission";
import { EditOutlined } from "@ant-design/icons";
import { ListEnd, ListTodo } from "lucide-react";
import { Tender } from "~/graphql/graphql";
import { usePortalStore } from "~/store/portal";

type TenderDetailProps = {
  queryRef: tenderDetailFragment$key;
};

export const TenderDetailFragment = graphql`
  fragment tenderDetailFragment on Tender {
    id
    code
    name
    status
    estimatedAmount
    tenderDate
    discoveryDate
    fullAddress
    contractor
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
    prepareToBid
    projectCode
    projectDefinition
    estimatedProjectStartDate
    estimatedProjectEndDate
    projectType
    attachements
    remark
    images
    tenderSituations
    ownerSituations
    biddingInstructions
    competitorSituations
    costEngineer
    tenderForm
    contractForm
    managementCompany
    tenderingAgency
    biddingDate
    facadeConsultant
    designUnit
    consultingFirm
    keyProject
    tenderWinCompany
    tenderCode
    architect
    developer
    tenderClosingDate
    constructionArea
    tenderWinDate
    tenderWinAmount
    lastTenderAmount
    area {
      id
      code
      name
    }
    followingSales {
      id
      name
    }
    finder {
      id
    }
    createdBy {
      id
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
  const { session } = useRouteContext({ from: "/_auth" });
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
    biddingDate,
    facadeConsultant,
    designUnit,
    consultingFirm,
    keyProject,
    tenderWinCompany,
    tenderWinDate,
    tenderWinAmount,
    lastTenderAmount,
    followingSales,
    area,
    images,
    fullAddress,
    remark,
    customer,
  } = tender;
  return (
    <div className="space-y-4">
      <Descriptions
        className="rounded-lg bg-white p-6"
        title={name}
        extra={
          canEdit(session, { tender }) && (
            <Space>
              <Link to="/portal/tenders/$id/edit" params={{ id }}>
                <Button type="primary" icon={<EditOutlined />}>
                  编辑
                </Button>
              </Link>
              <Button
                type="primary"
                icon={<ListTodo size={16} />}
                onClick={() => {
                  usePortalStore.setState({ tenderResultTender: tender });
                }}
              >
                结果
              </Button>
            </Space>
          )
        }
        items={[
          {
            key: "developer",
            label: "業主",
            children: customer ? customer.name : "-",
          },
          {
            key: "status",
            label: "狀態",
            children: tenderStatusText(status),
          },
          {
            key: "facadeConsultant",
            label: "外觀顧問",
            children: facadeConsultant ? facadeConsultant : "-",
          },

          { key: "area", label: "區域", children: area.name },
          {
            key: "fullAddress",
            label: "地址",
            children: fullAddress ? fullAddress : "-",
          },

          {
            key: "biddingInstructions",
            label: "投標說明",
            children: biddingInstructions,
          },
          {
            key: "tenderSituations",
            label: "投標情況",
            children: tenderSituations,
            span: 3,
          },
          {
            key: "ownerSituations",
            label: "業主情況",
            children: ownerSituations,
          },
          {
            key: "competitorSituations",
            label: "競爭對手情況",
            children: competitorSituations,
          },
          { key: "tenderForm", label: "投標文件", children: tenderForm },
          { key: "contractForm", label: "合同文件", children: contractForm },
          {
            key: "managementCompany",
            label: "管理公司",
            children: managementCompany,
          },
          {
            key: "tenderingAgency",
            label: "招標代理",
            children: tenderingAgency,
          },
          {
            key: "biddingDate",
            label: "投標日期",
            children: biddingDate ? dayjs(biddingDate).format("LL") : "-",
          },
          {
            key: "facadeConsultant",
            label: "外觀顧問",
            children: facadeConsultant,
          },
          { key: "designUnit", label: "設計單位", children: designUnit },
          {
            key: "consultingFirm",
            label: "顧問公司",
            children: consultingFirm,
          },
          {
            key: "keyProject",
            label: "關鍵項目",
            children: keyProject ? "是" : "否",
          },
          {
            key: "tenderWinCompany",
            label: "得標公司",
            children: tenderWinCompany,
          },
          {
            key: "tenderWinDate",
            label: "得標日期",
            children: tenderWinDate ? dayjs(tenderWinDate).format("LL") : "-",
          },
          {
            key: "tenderWinAmount",
            label: "得標金額",
            children: tenderWinAmount,
          },
          {
            key: "lastTenderAmount",
            label: "最後一次投標金額",
            children: lastTenderAmount,
          },
          {
            key: "followingSales",
            label: "跟進銷售",
            children: followingSales?.map((s) => s.name).join(", "),
          },
          { key: "remark", label: "備註", children: remark },
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
    </div>
  );
}

function GAAndHWTender({ tender }: { tender: tenderDetailFragment$data }) {
  const { session } = useRouteContext({ from: "/_auth" });
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
    area,
    images,
    fullAddress,
    tenderWinAmount,
    tenderWinDate,
    tenderWinCompany,
    lastTenderAmount,
    followingSales,
  } = tender;
  return (
    <div className="space-y-4">
      <Descriptions
        className="rounded-lg bg-white p-6"
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
        className="rounded-lg bg-white p-6"
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

import {
  tenderDetailFragment$data,
  tenderDetailFragment$key,
} from "__generated__/tenderDetailFragment.graphql";
import { Button, Card, Descriptions, Image } from "antd";
import dayjs from "dayjs";
import { graphql, useFragment } from "react-relay";
import { tenderStatusText } from "~/lib/helper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

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
  return data.area.code === "SH" ? (
    <SHTender {...data} />
  ) : (
    <GAAndHWTender {...data} />
  );
}

function SHTender({ name, status }: tenderDetailFragment$data) {
  return (
    <Card>
      <Descriptions
        title={name}
        items={[
          { key: "status", label: "狀態", children: tenderStatusText(status) },
        ]}
      />
    </Card>
  );
}

function GAAndHWTender({
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
}: tenderDetailFragment$data) {
  return (
    <div className="space-y-4">
      <Descriptions
        className="rounded-lg bg-white p-6"
        // extra={<Button type="primary">編輯</Button>}
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

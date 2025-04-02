import { Link, useRouteContext } from "@tanstack/react-router";
import {
  tenderListItemFragment$data,
  tenderListItemFragment$key,
} from "__generated__/tenderListItemFragment.graphql";
import { App, Button, List, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import { ImageOff } from "lucide-react";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { Tender } from "~/graphql/graphql";
import { useUpdateTender } from "~/hooks/use-update-tender";
import {
  approvalStatusTagColor,
  approvalStatusText,
  classifyTagColor,
  classifyText,
  tenderStatusTagColor,
  tenderStatusText,
} from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useVoidTender } from "~/hooks/use-void-tender";

type TenderListItemProps = {
  tender: tenderListItemFragment$key;
  showDelete?: boolean;
};

export function TenderListItem({
  tender,
  showDelete = true,
}: TenderListItemProps) {
  const item = useFragment(
    graphql`
      fragment tenderListItemFragment on Tender {
        id
        area {
          id
          name
          code
        }
        followingSales {
          id
        }
        pendingProfile {
          id
          approvalStatus
          name
          status
          createdAt
          estimatedAmount
          classify
          customer {
            id
            name
          }
          images
          fullAddress
          tenderDate
          discoveryDate
          tenderClosingDate
          createdBy {
            id
          }
        }
        activeProfile {
          id
          approvalStatus
          name
          status
          createdAt
          estimatedAmount
          classify
          customer {
            id
            name
          }
          images
          fullAddress
          tenderDate
          discoveryDate
          tenderClosingDate
          createdBy {
            id
          }
        }
      }
    `,
    tender,
  );
  const { session } = useRouteContext({ from: "/__auth" });

  const isGAOrHW = item.area.code === "GA" || item.area.code === "HW";
  const profile = !item.activeProfile
    ? item.pendingProfile
    : item.activeProfile;

  return (
    <List.Item
      actions={
        canEdit(session, { tender: item as unknown as Partial<Tender> })
          ? [
              <Link
                key="view-link"
                to="/portal/tenders/$id"
                params={{ id: item.id }}
              >
                <Button type="link" size="small">
                  查看
                </Button>
              </Link>,
              <Link
                key="edit-link"
                to="/portal/tenders/$id/edit"
                params={{ id: item.id }}
                // disabled={profile?.approvalStatus == 1}
              >
                <Button
                  type="link"
                  size="small"
                  // disabled={profile?.approvalStatus == 1}
                >
                  修改
                </Button>
              </Link>,
              <Link
                key="draw-link"
                to="/portal/tenders/$id/plot"
                params={{ id: item.id }}
              >
                <Button type="link" size="small">
                  地块
                </Button>
              </Link>,
              showDelete && <DeleteButton key="delete" tender={item} />,
              // <a key="list-loadmore-more">more</a>,
              // !isGAOrHW && (
              //   <Button
              //     type="link"
              //     size="small"
              //     onClick={() => {
              //       usePortalStore.setState({ tenderResultTender: item });
              //     }}
              //   >
              //     结果
              //   </Button>
              // ),
            ].filter(Boolean)
          : [
              <Link
                key="view-link"
                to="/portal/tenders/$id"
                params={{ id: item.id }}
              >
                <Button type="link" size="small">
                  查看
                </Button>
              </Link>,
            ]
      }
      extra={
        <div className="aspect-[16/9] md:max-w-[280px]">
          {profile?.images && profile?.images?.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {profile?.images?.map((image, i) => (
                  <CarouselItem key={[item.id, "image", i].join("-")}>
                    <img
                      src={image}
                      className="aspect-[16/9] rounded-lg object-cover"
                      alt={profile?.name || ""}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex aspect-[16/9] h-full w-[60vw] flex-col items-center justify-center rounded-lg bg-gray-100 sm:w-[30vw] lg:w-[280px]">
              <ImageOff className="mb-2 h-12 w-12" />
              暂没图片
            </div>
          )}
        </div>
      }
    >
      <List.Item.Meta
        title={
          <Link to="/portal/tenders/$id" params={{ id: item.id }} resetScroll>
            {profile?.name}
          </Link>
        }
        description={profile?.fullAddress}
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          {!isGAOrHW && profile?.classify && (
            <Tag color={classifyTagColor(profile?.classify)}>
              {classifyText(profile?.classify)}
            </Tag>
          )}
          <Tag>{item?.area.name}</Tag>
          <Tag color={tenderStatusTagColor(profile?.status)}>
            {tenderStatusText(profile?.status)}
          </Tag>
        </div>

        <div>
          {isGAOrHW && profile?.tenderClosingDate && (
            <div>交标日期：{dayjs(profile.tenderClosingDate).format("L")}</div>
          )}
        </div>
        {/* {(isGA(item as Partial<Tender>) || isHW(item as Partial<Tender>)) &&
          item.tenderClosingDate && (
            <Tag>{dayjs(item.tenderClosingDate).format("L")}</Tag>
          )} */}
        {/* <Tag>
          {item.area.code === "GA" || item.area.code === "HW"
            ? item.tenderDate && dayjs(item.tenderDate).format("LL")
            : item.tenderClosingDate &&
              dayjs(item.tenderClosingDate).format("LL")}
        </Tag> */}

        {/* {(isGA(item as Partial<Tender>) || isHW(item as Partial<Tender>)) &&
          item.tenderClosingDate && (
            <p>{dayjs(item.tenderClosingDate).format("L")}</p>
          )} */}
      </div>
    </List.Item>
  );
}

function DeleteButton({ tender }: { tender?: tenderListItemFragment$data }) {
  const { message } = App.useApp();
  const profile = tender?.activeProfile;
  const [commitVoid, inFlightVoid] = useVoidTender();
  return (
    <Popconfirm
      title="确定要作废吗？"
      onConfirm={() => {
        if (!tender) return;

        // const connections = [
        //   ConnectionHandler.getConnectionID(
        //     tender.area.id,
        //     "tendersTenderListFragment_tenders",
        //     { orderBy: [{ field: "CREATED_AT", direction: "DESC" }] },
        //   ),
        // ];

        // if (tender.customer?.id) {
        //   connections.push(
        //     ConnectionHandler.getConnectionID(
        //       tender.customer.id,
        //       "customerTenderListFragment_tenders",
        //     ),
        //   );
        // }

        commitVoid({
          variables: {
            id: tender.id,
          },
          onCompleted() {
            message.destroy();
            message.success("作废成功");
          },
          onError(error) {
            message.destroy();
            message.error("作废失败");
            console.error(error);
          },
        });
      }}
    >
      <Button
        disabled={inFlightVoid || profile?.status === 7}
        danger
        type="link"
        size="small"
      >
        作废
      </Button>
    </Popconfirm>
  );
}

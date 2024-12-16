import { Link, useRouteContext } from "@tanstack/react-router";
import {
  tenderListItemFragment$data,
  tenderListItemFragment$key,
} from "__generated__/tenderListItemFragment.graphql";
import { App, Button, List, Popconfirm, Tag } from "antd";
import dayjs from "dayjs";
import { ImageOff } from "lucide-react";
import { useFragment } from "react-relay";
import { ConnectionHandler, graphql } from "relay-runtime";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusTagColor, tenderStatusText } from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Tender } from "~/graphql/graphql";
import { usePortalStore } from "~/store/portal";

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
        name
        status
        createdAt
        estimatedAmount
        customer {
          id
          name
        }
        images
        fullAddress
        tenderDate
        discoveryDate
        tenderClosingDate
        area {
          id
          name
          code
        }
        followingSales {
          id
        }
        createdBy {
          id
        }
      }
    `,
    tender,
  );
  const { session } = useRouteContext({ from: "/_auth" });

  const isGAOrHW = item.area.code === "GA" || item.area.code === "HW";

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
              >
                <Button type="link" size="small">
                  修改
                </Button>
              </Link>,
              <Link
                key="draw-link"
                to="/portal/tenders/$id/plot"
                params={{ id: item.id }}
                resetScroll={false}
              >
                <Button type="link" size="small">
                  地块
                </Button>
              </Link>,
              showDelete && <DeleteButton key="delete" tender={item} />,
              // <a key="list-loadmore-more">more</a>,
              !isGAOrHW && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    usePortalStore.setState({ tenderResultTender: item });
                  }}
                >
                  结果
                </Button>
              ),
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
          {item?.images && item?.images?.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {item?.images?.map((image, i) => (
                  <CarouselItem key={[item.id, "image", i].join("-")}>
                    <img
                      src={image}
                      className="aspect-[16/9] rounded-lg object-cover"
                      alt={item?.name}
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
          <Link to="/portal/tenders/$id" params={{ id: item.id }}>
            {item?.name}
          </Link>
        }
        description={item?.fullAddress}
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Tag>{item?.area.name}</Tag>
          <Tag color={tenderStatusTagColor(item.status)}>
            {tenderStatusText(item?.status)}
          </Tag>
        </div>

        <div>
          {isGAOrHW && item.tenderClosingDate && (
            <div>交标日期：{dayjs(item.tenderClosingDate).format("L")}</div>
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
  const [commit, inFlight] = useDeleteTenderMutation();
  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() => {
        if (!tender) return;

        const connections = [
          ConnectionHandler.getConnectionID(
            tender.area.id,
            "tendersTenderListFragment_tenders",
            { orderBy: [{ field: "CREATED_AT", direction: "DESC" }] },
          ),
        ];

        if (tender.customer?.id) {
          connections.push(
            ConnectionHandler.getConnectionID(
              tender.customer.id,
              "customerTenderListFragment_tenders",
            ),
          );
        }

        commit({
          variables: {
            id: tender.id,
            connections,
          },
          onCompleted() {
            message.destroy();
            message.success("删除成功");
          },
          onError(error) {
            message.destroy();
            message.error("删除失败");
            console.error(error);
          },
        });
      }}
    >
      <Button disabled={inFlight} danger type="link" size="small">
        删除
      </Button>
    </Popconfirm>
  );
}

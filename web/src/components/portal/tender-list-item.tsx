import { Link } from "@tanstack/react-router";
import {
  tenderListItemFragment$data,
  tenderListItemFragment$key,
} from "__generated__/tenderListItemFragment.graphql";
import { App, Button, List, Popconfirm, Tag } from "antd";
import { useFragment } from "react-relay";
import { ConnectionHandler, graphql } from "relay-runtime";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusText } from "~/lib/helper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ImageOff } from "lucide-react";
import { Tender } from "~/graphql/graphql";

type TenderListItemProps = {
  queryRef: tenderListItemFragment$key;
  showDelete?: boolean;
};

export function TenderListItem({
  queryRef,
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
        area {
          id
          name
        }
      }
    `,
    queryRef,
  );

  return (
    <List.Item
      actions={[
        <Link
          key="edit-link"
          to="/portal/tenders/$id"
          params={{ id: item.id }}
          resetScroll={false}
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
            地塊
          </Button>
        </Link>,
        showDelete && <DeleteButton key="delete" tender={item} />,
        // <a key="list-loadmore-more">more</a>,
      ]}
      extra={
        <div className="aspect-[16/9] md:max-w-[280px]">
          {/* <img
            alt={item?.name}
            className="w-full h-full rounded-lg"
            src={item?.images?.[0] || ""}
          /> */}
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
            <div className="flex aspect-[16/9] h-full w-[280px] flex-col items-center justify-center rounded-lg bg-gray-100">
              <ImageOff className="mb-2 h-12 w-12" />
              暂没图片
            </div>
          )}
        </div>
      }
    >
      <List.Item.Meta
        title={<div>{item?.name}</div>}
        description={item?.fullAddress}
      />
      <div>
        <Tag>{item?.area.name}</Tag>
        <Tag>{tenderStatusText(item?.status)}</Tag>
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
        commit({
          variables: {
            id: tender.id,
            connections: [
              ConnectionHandler.getConnectionID(
                tender.area.id,
                "tendersTenderListFragment_tenders",
                { orderBy: { field: "CREATED_AT", direction: "DESC" } },
              ),
              ConnectionHandler.getConnectionID(
                tender.customer.id,
                "customersTenderListFragment_tenders",
              ),
            ],
          },
          onCompleted() {
            message.success("删除成功");
          },
          onError() {
            message.error("删除失败");
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

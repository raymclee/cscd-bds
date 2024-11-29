import { Link } from "@tanstack/react-router";
import { tenderListItemFragment$key } from "__generated__/tenderListItemFragment.graphql";
import { App, Button, List, Popconfirm, Tag } from "antd";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusText } from "~/lib/helper";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ImageOff } from "lucide-react";

export function TenderListItem({
  queryRef,
}: {
  queryRef: tenderListItemFragment$key;
}) {
  const item = useFragment(
    graphql`
      fragment tenderListItemFragment on Tender {
        id
        name
        status
        createdAt
        estimatedAmount
        customer {
          name
        }
        images
        fullAddress
        tenderDate
        discoveryDate
        area {
          name
        }
      }
    `,
    queryRef,
  );

  return (
    <List.Item
      actions={[
        <Link key="edit-link" to="/portal/tenders/$id" params={{ id: item.id }}>
          <Button type="link" size="small" disabled>
            修改
          </Button>
        </Link>,
        <Link key="draw-link" to="/portal/tenders/$id" params={{ id: item.id }}>
          <Button type="link" size="small">
            地塊
          </Button>
        </Link>,
        <DeleteButton key="delete" id={item?.id} />,
        // <a key="list-loadmore-more">more</a>,
      ]}
      extra={
        <div className="aspect-[16/9] max-w-[280px]">
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
                      className="aspect-[16/9] rounded-lg"
                      alt={item?.name}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex aspect-[16/9] h-full w-[280px] flex-col items-center justify-center rounded-lg bg-gray-100">
              <ImageOff className="w-12 h-12 mb-2" />
              暂没图片
            </div>
          )}
        </div>
      }
    >
      {/* <Skeleton avatar title={false} loading={item.loading} active> */}
      <List.Item.Meta
        title={<div>{item?.name}</div>}
        description={item?.fullAddress}
      />
      <div>
        <Tag>{item?.area.name}</Tag>
        <Tag>{tenderStatusText(item?.status)}</Tag>
      </div>
      {/* </Skeleton> */}
    </List.Item>
  );
}

function DeleteButton({ id }: { id?: string }) {
  const { message } = App.useApp();
  const [commit, inFlight] = useDeleteTenderMutation();
  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() => {
        if (!id) return;
        commit({
          variables: { id },
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

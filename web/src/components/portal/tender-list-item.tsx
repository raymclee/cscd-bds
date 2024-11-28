import { Link } from "@tanstack/react-router";
import { tenderListItemFragment$key } from "__generated__/tenderListItemFragment.graphql";
import { App, Button, List, Popconfirm, Tag } from "antd";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";
import { useDeleteTenderMutation } from "~/hooks/use-delete-tender";
import { tenderStatusText } from "~/lib/helper";

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
        <Link
          key="edit-link"
          to="/portal/tenders/$id"
          params={{ id: item!.id }}
        >
          <Button type="link" size="small" disabled>
            修改
          </Button>
        </Link>,
        <Link
          key="draw-link"
          to="/portal/tenders/$id"
          params={{ id: item!.id }}
        >
          <Button type="link" size="small">
            地塊
          </Button>
        </Link>,
        <DeleteButton key="delete" id={item?.id} />,
        // <a key="list-loadmore-more">more</a>,
      ]}
      extra={
        <div className="aspect-[4/3] max-w-[180px]">
          <img
            alt={item?.name}
            className="h-full w-full rounded-lg"
            src={item?.images?.[0] || ""}
          />
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
          updater: (store) => {
            store.delete(id);
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

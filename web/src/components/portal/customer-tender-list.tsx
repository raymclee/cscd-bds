import { customerTenderListFragment$key } from "__generated__/customerTenderListFragment.graphql";
import { List } from "antd";
import { graphql, useFragment } from "react-relay";
import { TenderListItem } from "./tender-list-item";

export function CustomerTenderList({
  queryRef,
}: {
  queryRef: customerTenderListFragment$key;
}) {
  const data = useFragment(
    graphql`
      fragment customerTenderListFragment on Customer
      @argumentDefinitions(first: { type: Int }, last: { type: Int }) {
        tenders(first: $first, last: $last)
          @connection(key: "customersTenderListFragment_tenders") {
          edges {
            node {
              id
              ...tenderListItemFragment
            }
          }
        }
      }
    `,
    queryRef,
  );

  return (
    <List
      itemLayout="vertical"
      dataSource={data.tenders.edges?.map((e) => e?.node)}
      rowKey={(node) => node?.id || ""}
      renderItem={(node) => node && <TenderListItem queryRef={node} />}
    />
  );
}

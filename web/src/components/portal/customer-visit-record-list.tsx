import { customerVisitRecordListFragment$key } from "__generated__/customerVisitRecordListFragment.graphql";
import { List } from "antd";
import { graphql, useFragment } from "react-relay";
import { VisitRecordItem } from "./visit-record-item";

export function CustomerVisitRecordList(props: {
  customer: customerVisitRecordListFragment$key;
}) {
  const data = useFragment(
    graphql`
      fragment customerVisitRecordListFragment on Customer
      @argumentDefinitions(
        first: { type: Int }
        last: { type: Int }
        orderBy: { type: "VisitRecordOrder" }
      ) {
        visitRecords(first: $first, last: $last, orderBy: $orderBy)
          @connection(key: "customerVisitRecordListFragment_visitRecords") {
          edges {
            node {
              id
              ...visitRecordItemFragment
            }
          }
        }
      }
    `,
    props.customer,
  );

  return (
    <div className="space-y-6">
      <List
        dataSource={data.visitRecords.edges?.map((e) => e?.node)}
        rowKey={(node) => node?.id || ""}
        renderItem={(node) => node && <VisitRecordItem record={node} />}
      />
    </div>
  );
}

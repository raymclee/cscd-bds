import { customerVisitRecordListFragment$key } from "__generated__/customerVisitRecordListFragment.graphql";
import { List } from "antd";
import { graphql, useFragment } from "react-relay";
import { VisitRecordItem } from "./visit-record-item";

export function CustomerVisitRecordList(props: {
  user: customerVisitRecordListFragment$key;
}) {
  const data = useFragment(
    graphql`
      fragment customerVisitRecordListFragment on User
      @argumentDefinitions(
        first: { type: Int }
        last: { type: Int }
        orderBy: { type: "[VisitRecordOrder!]!" }
      ) {
        visitRecords: myVisitRecords(
          first: $first
          last: $last
          orderBy: $orderBy
        ) @connection(key: "customerVisitRecordListFragment_visitRecords") {
          __id
          edges {
            node {
              id
              ...visitRecordItemFragment
            }
          }
        }
      }
    `,
    props.user,
  );

  return (
    <>
      <List
        grid={{ column: 1, gutter: 8 }}
        dataSource={data.visitRecords.edges?.map((e) => e?.node)}
        rowKey={(node) => node?.id || ""}
        renderItem={(node) =>
          node && (
            <VisitRecordItem
              key={node.id}
              record={node}
              connectionID={data.visitRecords.__id}
            />
          )
        }
      />
    </>
  );
}

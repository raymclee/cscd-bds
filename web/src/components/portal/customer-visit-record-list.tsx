import { customerVisitRecordListFragment$key } from "__generated__/customerVisitRecordListFragment.graphql";
import { Descriptions } from "antd";
import { List } from "antd";
import dayjs from "dayjs";
import { graphql, useFragment } from "react-relay";
import { visitTypeText } from "~/lib/helper";

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
              date
              visitType
              commPeople
              commContent
              nextStep
              tender {
                id
                name
              }
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
        renderItem={(node) =>
          node && (
            <Descriptions
              layout="vertical"
              bordered
              className="py-4"
              items={[
                {
                  key: "date",
                  label: "日期",
                  children: dayjs(node.date).format("LL"),
                },
                {
                  key: "visitType",
                  label: "拜访类型",
                  children: visitTypeText(node.visitType),
                },
                {
                  key: "commPeople",
                  label: "沟通人员",
                  children: node.commPeople,
                },
                {
                  key: "commContent",
                  label: "沟通内容",
                  children: node.commContent,
                  span: 3,
                },
                {
                  key: "nextStep",
                  label: "下一步",
                  children: node.nextStep,
                  span: 3,
                },
              ]}
            />
          )
        }
      />
    </div>
  );
}

import { Descriptions } from "antd";
import dayjs from "dayjs";
import { graphql } from "react-relay";

import { useFragment } from "react-relay";
import { visitTypeText } from "~/lib/helper";

export function VisitRecordItem(props: { record: any }) {
  const data = useFragment(
    graphql`
      fragment visitRecordItemFragment on VisitRecord {
        id
        date
        visitType
        commPeople
        commContent
        nextStep
      }
    `,
    props.record,
  );

  return (
    <Descriptions
      layout="vertical"
      bordered
      className="py-4"
      items={[
        {
          key: "date",
          label: "日期",
          children: dayjs(data.date).format("LL"),
        },
        {
          key: "visitType",
          label: "拜访类型",
          children: visitTypeText(data.visitType),
        },
        {
          key: "commPeople",
          label: "沟通人员",
          children: data.commPeople,
        },
        {
          key: "commContent",
          label: "沟通内容",
          children: data.commContent,
          span: 3,
        },
        {
          key: "nextStep",
          label: "下一步",
          children: data.nextStep || "-",
          span: 3,
        },
      ]}
    />
  );
}

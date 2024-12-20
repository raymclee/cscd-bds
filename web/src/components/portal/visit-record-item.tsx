import { useRouteContext } from "@tanstack/react-router";
import {
  visitRecordItemFragment$data,
  visitRecordItemFragment$key,
} from "__generated__/visitRecordItemFragment.graphql";
import { Button, Descriptions, Popconfirm, Space } from "antd";
import dayjs from "dayjs";
import { ConnectionHandler, graphql } from "react-relay";

import { useFragment } from "react-relay";
import { useDeleteVisitRecord } from "~/hooks/use-delete-visit-record";
import { visitTypeText } from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { usePortalStore } from "~/store/portal";

type VisitRecordItemProps = {
  record: visitRecordItemFragment$key;
  connectionID: string;
};

export function VisitRecordItem(props: VisitRecordItemProps) {
  const data = useFragment(
    graphql`
      fragment visitRecordItemFragment on VisitRecord {
        id
        date
        visitType
        commPeople
        commContent
        nextStep
        followupbys {
          edges {
            node {
              id
            }
          }
        }
        tender {
          id
        }
      }
    `,
    props.record,
  );
  const { session } = useRouteContext({ from: "/_auth" });

  return (
    <Descriptions
      title={dayjs(data.date).format("LL")}
      extra={
        canEdit(session) ? (
          <Space>
            <Button
              onClick={() => {
                usePortalStore.setState({
                  visitRecordFormVisitRecord: data,
                  visitRecordFormOpen: true,
                });
              }}
            >
              编辑
            </Button>
            <DeleteVisitRecordButton
              record={data}
              connectionID={props.connectionID}
            />
          </Space>
        ) : (
          []
        )
      }
      // layout="vertical"
      bordered
      className="py-4"
      items={[
        // {
        //   key: "date",
        //   label: "日期",
        //   children: dayjs(data.date).format("LL"),
        // },
        {
          key: "visitType",
          label: "拜访类型",
          children: visitTypeText(data.visitType),
        },
        {
          key: "commPeople",
          label: "沟通人员",
          children: data.commPeople,
          span: 2,
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

type DeleteVisitRecordButtonProps = {
  record: visitRecordItemFragment$data;
  connectionID: string;
};

function DeleteVisitRecordButton(props: DeleteVisitRecordButtonProps) {
  const [commit, isInFlight] = useDeleteVisitRecord();

  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={() =>
        commit({
          variables: {
            id: props.record.id,
            connections: [props.connectionID],
          },
        })
      }
    >
      <Button danger disabled={isInFlight}>
        删除
      </Button>
    </Popconfirm>
  );
}

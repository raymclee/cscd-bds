import { EditOutlined } from "@ant-design/icons";
import { useRouteContext } from "@tanstack/react-router";
import { customerDetail_customerContact$key } from "__generated__/customerDetail_customerContact.graphql";
import { customerDetailFragment$key } from "__generated__/customerDetailFragment.graphql";
import { App, Button, Descriptions, Modal, Space } from "antd";
import dayjs from "dayjs";
import { BookUser, Check, X } from "lucide-react";
import { useEffect } from "react";
import { graphql, useFragment, useRefetchableFragment } from "react-relay";
import { customerSizeText, industryText, ownerTypeText } from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { usePortalStore } from "~/store/portal";
import { VisitRecordFormDrawer } from "./visit-record-form-drawer";
import { useUpdateCustomer } from "~/hooks/use-update-customer";

export function CustomerDetail(props: {
  customer: customerDetailFragment$key;
  showContact: boolean;
}) {
  const customer = useFragment(
    graphql`
      fragment customerDetailFragment on Customer {
        id
        name
        createdAt
        createdBy {
          name
        }
        updatedAt
        ownerType
        industry
        size
        sales {
          id
          name
        }
        area {
          id
          name
        }
        isApproved
        contactPerson
        contactPersonPosition
        contactPersonPhone
        contactPersonEmail
        lastVisitRecord: visitRecords(last: 1)
          @connection(key: "customerDetailFragment_lastVisitRecord") {
          edges {
            node {
              date
            }
          }
        }
        # ...customerDetail_customerContact
      }
    `,
    props.customer,
  );
  // const [modal, contextHolder] = Modal.useModal();
  const { session } = useRouteContext({ from: "/__auth" });
  const [updateCustomer, inFlight] = useUpdateCustomer();
  const { message, modal } = App.useApp();

  return (
    <>
      <Descriptions
        extra={
          canEdit(session) && (
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  usePortalStore.setState({
                    customerFormOpen: true,
                    customerFormCustomer: customer,
                  });
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                icon={<BookUser size={16} />}
                onClick={() => {
                  usePortalStore.setState({
                    visitRecordFormOpen: true,
                  });
                }}
              >
                添加拜访记录
              </Button>
              {(session.isAdmin || session.isSuperAdmin) && (
                <Button
                  disabled={customer.isApproved}
                  type="primary"
                  icon={<Check size={16} />}
                  onClick={async () => {
                    const confirmed = await modal.confirm({
                      title: "批核",
                      content: "确定批核该客户吗？",
                      okText: "同意",
                      cancelText: "拒绝",
                      cancelButtonProps: {
                        danger: true,
                      },
                    });
                    if (confirmed) {
                      updateCustomer({
                        variables: {
                          id: customer.id,
                          input: { isApproved: true },
                        },
                        onCompleted: () => {
                          message.destroy();
                          message.success("批核成功");
                        },
                        onError: (error) => {
                          console.error(error);
                          message.destroy();
                          message.error("批核失败");
                        },
                      });
                    }
                  }}
                >
                  批核
                </Button>
              )}
            </Space>
          )
        }
        title={customer.name}
        items={[
          {
            key: "ownerType",
            label: "业主类型",
            children: (
              <span className="font-normal">
                {ownerTypeText(customer.ownerType)}
              </span>
            ),
          },
          {
            key: "industry",
            label: "行业",
            children: (
              <span className="font-normal">
                {industryText(customer.industry)}
              </span>
            ),
          },
          {
            key: "size",
            label: "规模",
            children: (
              <span className="font-normal">
                {customerSizeText(customer.size)}
              </span>
            ),
          },
          {
            key: "area",
            label: "区域",
            children: <span className="font-normal">{customer.area.name}</span>,
          },
          {
            key: "sales",
            label: "客户所有人",
            children: (
              <span className="font-normal">{customer.sales?.name}</span>
            ),
          },
          // {
          //   key: "contactPerson",
          //   label: "联系人",
          //   children: (
          //     <span className="font-normal">{customer.contactPerson}</span>
          //   ),
          // },
          // {
          //   key: "contactPersonPosition",
          //   label: "联系人职位",
          //   children: (
          //     <span className="font-normal">
          //       {customer.contactPersonPosition}
          //     </span>
          //   ),
          // },
          // {
          //   key: "contactPersonPhone",
          //   label: "联系人电话",
          //   children: (
          //     <span className="font-normal">{customer.contactPersonPhone}</span>
          //   ),
          // },
          // {
          //   key: "contactPersonEmail",
          //   label: "联系人邮箱",
          //   children: (
          //     <span className="font-normal">{customer.contactPersonEmail}</span>
          //   ),
          // },

          {
            key: "createdBy",
            label: "创建人",
            children: (
              <span className="font-normal">{customer.createdBy?.name}</span>
            ),
          },
          {
            key: "createdAt",
            label: "创建时间",
            children: (
              <span className="font-normal">
                {dayjs(customer.createdAt).format("LLL")}
              </span>
            ),
          },
          {
            key: "updatedAt",
            label: "更新时间",
            children: (
              <span className="font-normal">
                {dayjs(customer.updatedAt).format("LLL")}
              </span>
            ),
          },
          {
            key: "lastUpdated",
            label: "最新跟进时间",
            children: (
              <span className="font-normal">
                {customer.lastVisitRecord.edges?.at(0)?.node?.date
                  ? dayjs(
                      customer.lastVisitRecord.edges?.at(0)?.node?.date,
                    ).format("LL")
                  : "-"}
              </span>
            ),
          },
        ]}
      />
      {/* {props.showContact && (
        <Suspense fallback={<Skeleton active />}>
          <ContactDetail customer={customer} showContact={props.showContact} />
        </Suspense>
      )} */}

      <Descriptions
        className="!mt-4"
        items={[
          {
            key: "contactPerson",
            label: "对接人姓名",
            children: (
              <span className="font-normal">{customer.contactPerson}</span>
            ),
          },
          {
            key: "contactPersonPosition",
            label: "对接人职位",
            children: (
              <span className="font-normal">
                {customer.contactPersonPosition}
              </span>
            ),
          },
          {
            key: "contactPersonPhone",
            label: "对接人电话",
            children: (
              <span className="font-normal">{customer.contactPersonPhone}</span>
            ),
          },
          {
            key: "contactPersonEmail",
            label: "对接人邮箱",
            span: 2,
            children: (
              <span className="font-normal">{customer.contactPersonEmail}</span>
            ),
          },
          {
            key: "isApproved",
            label: "审批状态",
            children: (
              <span className="font-normal">
                {customer.isApproved ? "已审批" : "未审批"}
              </span>
            ),
          },
        ]}
      />

      <VisitRecordFormDrawer
        areaId={customer.area.id}
        customerId={customer.id}
      />
    </>
  );
}

function ContactDetail(props: {
  customer: customerDetail_customerContact$key;
  showContact: boolean;
}) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment customerDetail_customerContact on Customer
      @refetchable(queryName: "customerDetail_customerContactRefetchQuery")
      @argumentDefinitions(
        showContact: { type: "Boolean", defaultValue: false }
      ) {
        ... on Customer @include(if: $showContact) {
          contactPerson
          contactPersonPosition
          contactPersonPhone
          contactPersonEmail
        }
      }
    `,
    props.customer,
  );

  useEffect(() => {
    if (props.showContact) {
      refetch({ showContact: props.showContact });
    }
  }, [props.showContact]);

  return (
    <Descriptions
      className="mt-4"
      items={[
        {
          key: "contactPerson",
          label: "联系人",
          children: <span className="font-normal">{data.contactPerson}</span>,
        },
        {
          key: "contactPersonPosition",
          label: "联系人职位",
          children: (
            <span className="font-normal">{data.contactPersonPosition}</span>
          ),
        },
        {
          key: "contactPersonPhone",
          label: "联系人电话",
          children: (
            <span className="font-normal">{data.contactPersonPhone}</span>
          ),
        },
        {
          key: "contactPersonEmail",
          label: "联系人邮箱",
          children: (
            <span className="font-normal">{data.contactPersonEmail}</span>
          ),
        },
      ]}
    />
  );
}

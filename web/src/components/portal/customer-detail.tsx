import { EditOutlined } from "@ant-design/icons";
import { useRouteContext } from "@tanstack/react-router";
import { customerDetail_customerContact$key } from "__generated__/customerDetail_customerContact.graphql";
import {
  customerDetailFragment$data,
  customerDetailFragment$key,
} from "__generated__/customerDetailFragment.graphql";
import { App, Button, Descriptions, Modal, Space, Tag } from "antd";
import dayjs from "dayjs";
import { BookUser, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { graphql, useFragment, useRefetchableFragment } from "react-relay";
import {
  approvalStatusTagColor,
  approvalStatusText,
  customerSizeText,
  industryText,
  ownerTypeText,
} from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { usePortalStore } from "~/store/portal";
import { VisitRecordFormDrawer } from "./visit-record-form-drawer";
import { useUpdateCustomer } from "~/hooks/use-update-customer";
import { useApproveCustomerRequest } from "~/hooks/use-approve-customer-request";
import { useRejectCustomerRequest } from "~/hooks/use-reject-customer-request";
import { isSH } from "~/lib/areas";

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
          code
        }
        approvalStatus
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
        draft {
          name
          ownerType
          industry
          size
          contactPerson
          contactPersonPosition
          contactPersonPhone
          contactPersonEmail
          area {
            id
            code
            name
          }
          sales {
            id
            name
          }
        }
        # ...customerDetail_customerContact
      }
    `,
    props.customer,
  );
  // const [modal, contextHolder] = Modal.useModal();
  const { session } = useRouteContext({ from: "/__auth" });
  // const [updateCustomer, inFlight] = useUpdateCustomer();

  return (
    <>
      <Descriptions
        extra={
          canEdit(session) && (
            <Space>
              <Button
                type="primary"
                icon={<EditOutlined />}
                disabled={customer.approvalStatus == 1}
                onClick={() => {
                  usePortalStore.setState({
                    customerFormOpen: true,
                    customerFormCustomer: customer,
                  });
                }}
              >
                编辑
              </Button>
              {/* <Button
                type="primary"
                icon={<BookUser size={16} />}
                onClick={() => {
                  usePortalStore.setState({
                    visitRecordFormOpen: true,
                  });
                }}
              >
                添加拜访记录
              </Button> */}
              {(session.isAdmin || session.isSuperAdmin) && (
                <ApprovalModal customer={customer} />
              )}
            </Space>
          )
        }
        title={
          <div className="flex items-center gap-2">
            <span>{customer.draft?.name || customer.name}</span>
            {isSH(customer.area.code) && (
              <Tag color={approvalStatusTagColor(customer.approvalStatus)}>
                {approvalStatusText(customer.approvalStatus)}
              </Tag>
            )}
          </div>
        }
        items={[
          {
            key: "ownerType",
            label: "业主类型",
            children: (
              <span className="font-normal">
                {ownerTypeText(customer.draft?.ownerType || customer.ownerType)}
              </span>
            ),
          },
          {
            key: "industry",
            label: "行业",
            children: (
              <span className="font-normal">
                {industryText(customer.draft?.industry || customer.industry)}
              </span>
            ),
          },
          {
            key: "size",
            label: "规模",
            children: (
              <span className="font-normal">
                {customerSizeText(customer.draft?.size || customer.size)}
              </span>
            ),
          },
          {
            key: "area",
            label: "区域",
            children: (
              <span className="font-normal">
                {customer.draft?.area?.name || customer.area.name}
              </span>
            ),
          },
          {
            key: "sales",
            label: "客户所有人",
            children: (
              <span className="font-normal">
                {customer.draft?.sales?.name || customer.sales?.name}
              </span>
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
            span: { sm: 3, md: 1 },
            children: (
              <span className="font-normal">
                {dayjs(customer.createdAt).format("LLL")}
              </span>
            ),
          },
          {
            key: "updatedAt",
            label: "更新时间",
            span: { sm: 3, md: 1 },
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

function ApprovalModal({
  customer,
}: {
  customer: customerDetailFragment$data;
}) {
  const [open, setOpen] = useState(false);
  const [commitApproveCustomerRequest, inApproveCustomerRequestFlight] =
    useApproveCustomerRequest();
  const [commitRejectCustomerRequest, inRejectCustomerRequestFlight] =
    useRejectCustomerRequest();
  const { message } = App.useApp();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleReject = () => {
    commitRejectCustomerRequest({
      variables: {
        id: customer.id,
      },
      onCompleted: () => {
        message.destroy();
        message.success("拒绝成功");
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        message.destroy();
        message.error("拒绝失败");
      },
    });
  };

  const handleApprove = () => {
    commitApproveCustomerRequest({
      variables: {
        id: customer.id,
      },
      onCompleted: () => {
        message.destroy();
        message.success("批核成功");
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        message.destroy();
        message.error("批核失败");
      },
    });
  };

  if (!open) {
    return (
      <Button
        disabled={customer.approvalStatus > 1}
        type="primary"
        icon={<Check size={16} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        批核
      </Button>
    );
  }

  const isLoading =
    inApproveCustomerRequestFlight || inRejectCustomerRequestFlight;

  return (
    <Modal
      open={open}
      title="批核"
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="reject"
          // type="primary"
          loading={isLoading}
          onClick={handleReject}
          danger
        >
          拒绝
        </Button>,
        <Button
          key="approve"
          type="primary"
          loading={isLoading}
          onClick={handleApprove}
        >
          同意
        </Button>,
      ]}
    >
      <p>确定批核该客户更新吗？</p>
    </Modal>
  );
}

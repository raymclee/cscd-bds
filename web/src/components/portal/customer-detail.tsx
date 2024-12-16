import { EditOutlined } from "@ant-design/icons";
import { useRouteContext } from "@tanstack/react-router";
import { customerDetail_customerContact$key } from "__generated__/customerDetail_customerContact.graphql";
import { customerDetailFragment$key } from "__generated__/customerDetailFragment.graphql";
import { Button, Descriptions, Skeleton } from "antd";
import dayjs from "dayjs";
import { Suspense, useEffect } from "react";
import { graphql, useFragment, useRefetchableFragment } from "react-relay";
import { customerSizeText, industryText, ownerTypeText } from "~/lib/helper";
import { canEdit } from "~/lib/permission";
import { usePortalStore } from "~/store/portal";

export function CustomerDetail(props: {
  customer: customerDetailFragment$key;
  showContact: boolean;
}) {
  const customer = useFragment(
    graphql`
      fragment customerDetailFragment on Customer {
        id
        name
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
        contactPerson
        contactPersonPosition
        contactPersonPhone
        contactPersonEmail
        ...customerDetail_customerContact
      }
    `,
    props.customer,
  );

  const { session } = useRouteContext({ from: "/_auth" });

  return (
    <>
      <Descriptions
        extra={
          canEdit(session) && (
            // <Link to="/portal/customers/$id/edit" params={{ id: customer.id! }}>
            <Button
              type="primary"
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
            // </Link>
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
            label: "地区",
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
            label: "创建者",
            children: (
              <span className="font-normal">{customer.createdBy.name}</span>
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
        ]}
      />
      {props.showContact && (
        <Suspense fallback={<Skeleton active />}>
          <ContactDetail customer={customer} showContact={props.showContact} />
        </Suspense>
      )}
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

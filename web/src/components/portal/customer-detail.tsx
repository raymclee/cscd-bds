import { customerDetailFragment$key } from "__generated__/customerDetailFragment.graphql";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import { customerSizeText, industryText } from "~/lib/helper";
import { graphql, useFragment, useRefetchableFragment } from "react-relay";
import { ownerTypeText } from "~/lib/helper";
import {
  customerDetailContactFragment$data,
  customerDetailContactFragment$key,
} from "__generated__/customerDetailContactFragment.graphql";
import { useEffect } from "react";

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
        ...customerDetailContactFragment @alias(as: "contact")
      }
    `,
    props.customer,
  );

  return (
    <>
      <Descriptions
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
        <ContactDetail
          customer={customer.contact}
          showContact={props.showContact}
        />
      )}
    </>
  );
}

function ContactDetail(props: {
  customer: customerDetailContactFragment$key;
  showContact: boolean;
}) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment customerDetailContactFragment on Customer
      @refetchable(queryName: "customerDetailContactFragmentRefetchQuery")
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

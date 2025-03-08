import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import {
  CreateVisitRecordInput,
  useCreateVisitRecordMutation,
} from "__generated__/useCreateVisitRecordMutation.graphql";
import { graphql, useMutation } from "react-relay";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { visitTypeOptions, visitTypeText } from "~/lib/helper";

export function useCreateVisitRecord() {
  return useMutation<useCreateVisitRecordMutation>(graphql`
    mutation useCreateVisitRecordMutation(
      $input: CreateVisitRecordInput!
      $connections: [ID!]!
    ) {
      createVisitRecord(input: $input) {
        edges @prependEdge(connections: $connections) {
          node {
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
        }
      }
    }
  `);
}

export function useCreateVisitRecordAction({
  users,
  customers,
}: {
  users?: { readonly id: string; readonly name: string }[];
  customers?: { readonly id: string; readonly name: string }[];
}) {
  const [commitCreateVisitRecord, isCreateVisitRecordInFlight] =
    useCreateVisitRecord();

  useCopilotReadable({
    description: "这是跟进形式(visitType)的选项",
    value: visitTypeOptions,
  });

  useCopilotReadable({
    description: "这是跟进人员(followupbyIDs)的选项",
    value: users,
  });

  useCopilotReadable({
    description: "这是客户(customer)的选项",
    value: customers,
  });

  useCopilotAction({
    name: "create-customer-visit-record",
    description: "创建客户访问记录",
    parameters: [
      {
        name: "customerID",
        description: "客户ID",
        type: "string",
      },
      {
        name: "date",
        type: "string",
        description: "跟进时间",
      },
      {
        name: "visitType",
        type: "number",
        description: "跟进形式",
      },
      {
        name: "followupbyIDs",
        type: "string[]",
        description: "跟进人员",
      },
      {
        name: "commPeople",
        type: "string",
        description: "沟通对象",
      },
      {
        name: "commContent",
        type: "string",
        description: "跟进内容",
      },
      {
        name: "nextStep",
        type: "string",
        description: "下一步计划",
        required: false,
      },
      {
        name: "tenderID",
        type: "string",
        description: "商机",
        required: false,
      },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      if (status === "complete") return <></>;

      const customer = customers?.find((c) => c.id === args.customerID);
      // const tender = tenders?.find((t) => t.id === args.tenderID);

      return (
        <Card>
          <CardHeader className="mt-4">
            <CardTitle className="text-lg">创建访问记录</CardTitle>
          </CardHeader>
          <CardContent className="mt-1">
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">客户</div>
                <div className="col-span-2">{customer?.name}</div>
                {/* <Select value={customer?.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择客户" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map((c) => (
                      <SelectItem key={c.id} value={c.name}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">跟进时间</div>
                <div className="col-span-2">{args.date}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">跟进形式</div>
                <div className="col-span-2">
                  {visitTypeText(args.visitType)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">跟进人员</div>
                <div className="col-span-2">
                  {args.followupbyIDs
                    ?.map((id) => users?.find((u) => u.id === id)?.name)
                    .join(", ")}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">沟通对象</div>
                <div className="col-span-2">{args.commPeople}</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-neutral-500">沟通内容</div>
                <div className="col-span-2">{args.commContent}</div>
              </div>

              {args.tenderID && (
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-neutral-500">商机</div>
                  <div className="col-span-2">{args.tenderID || ""}</div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              size="sm"
              disabled={isCreateVisitRecordInFlight || status === "inProgress"}
              onClick={() => {
                respond?.("确认");
                if (!customer) {
                  throw new Error("客户不能为空");
                }
                if (!args.commPeople) {
                  throw new Error("沟通对象不能为空");
                }
                if (!args.commContent) {
                  throw new Error("沟通内容不能为空");
                }
                const input: CreateVisitRecordInput = {
                  date: args.date ? new Date(args.date) : new Date(),
                  visitType: args.visitType,
                  commPeople: args.commPeople,
                  commContent: args.commContent,
                  nextStep: args.nextStep,
                  customerID: customer.id,
                };
                if (args.tenderID) {
                  input.tenderID = args.tenderID;
                }
                commitCreateVisitRecord({
                  variables: {
                    input,
                    connections: [],
                  },
                  onError(error) {
                    console.error(error);
                    throw error;
                  },
                });
              }}
            >
              确认
            </Button>
            <Button
              size="sm"
              disabled={isCreateVisitRecordInFlight || status === "inProgress"}
              className="bg-red-600 hover:bg-red-500"
              onClick={() => {
                respond?.("取消");
              }}
            >
              取消
            </Button>
          </CardFooter>
        </Card>
      );
    },
    // handler(args) {
    //   console.log(args);
    //   const input: CreateVisitRecordInput = {
    //     date: new Date(args.date),
    //     visitType: args.visitType,
    //     commPeople: args.commPeople,
    //     commContent: args.commContent,
    //     nextStep: args.nextStep,
    //     customerID: args.customer.customerID,
    //   };
    //   if (args.tender) {
    //     input.tenderID = args.tender.id;
    //   }
    //   commitCreateVisitRecord({
    //     variables: {
    //       input,
    //       connections: [],
    //     },
    //     onError(error) {
    //       console.error(error);
    //       throw error;
    //     },
    //   });
    // },
  });
}

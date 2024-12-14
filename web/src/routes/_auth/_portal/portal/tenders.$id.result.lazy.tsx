import { createLazyFileRoute } from "@tanstack/react-router";
import { tendersResultModal_competitors$key } from "__generated__/tendersResultModal_competitors.graphql";
import { tendersResultModal_tender$key } from "__generated__/tendersResultModal_tender.graphql";
import { tendersResultPageQuery } from "__generated__/tendersResultPageQuery.graphql";
import { useSetCompetitorMutation$variables } from "__generated__/useSetCompetitorMutation.graphql";
import { Alert, App, Form, Modal, Radio, Select } from "antd";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";
import { useSetCompetitor } from "~/hooks/use-set-competitor";

export const Route = createLazyFileRoute(
  "/_auth/_portal/portal/tenders/$id/result",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const data = usePreloadedQuery<tendersResultPageQuery>(
    graphql`
      query tendersResultPageQuery($id: ID!, $userId: ID!) {
        node(id: $userId) {
          ... on User {
            areas {
              edges {
                node {
                  tenders(where: { id: $id }) {
                    edges {
                      node {
                        ...tendersResultModal_tender
                      }
                    }
                  }
                }
              }
            }
          }
        }
        ...tendersResultModal_competitors
      }
    `,
    Route.useLoaderData(),
  );

  const tender = data.node?.areas?.edges
    ?.flatMap((area) => area?.node?.tenders.edges)
    .at(0);
  if (!tender?.node) {
    return null;
  }

  return <TenderResultModal tender={tender.node} competitors={data} />;
}

function TenderResultModal(props: {
  tender: tendersResultModal_tender$key;
  competitors: tendersResultModal_competitors$key;
}) {
  const navigate = Route.useNavigate();
  const [form] = Form.useForm<useSetCompetitorMutation$variables>();
  const tender = useFragment(
    graphql`
      fragment tendersResultModal_tender on Tender {
        id
        name
      }
    `,
    props.tender,
  );
  const competitors = useFragment(
    graphql`
      fragment tendersResultModal_competitors on Query {
        competitors {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    props.competitors,
  );
  const [commit, isInFlight] = useSetCompetitor();
  const { id } = Route.useParams();
  const closeModal = () => {
    navigate({
      to: "/portal/tenders",
      resetScroll: false,
      search: (prev) => prev,
    });
  };
  const { message } = App.useApp();

  return (
    <>
      <Modal
        title={tender.name}
        open
        onOk={() => {
          form.submit();
        }}
        onCancel={closeModal}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            disabled={isInFlight}
            layout="vertical"
            form={form}
            requiredMark={false}
            clearOnDestroy
            onFinish={(values) => {
              commit({
                variables: {
                  tenderId: id,
                  competitorId: values.competitorId,
                  won: values.won,
                },
                onCompleted: () => {
                  closeModal();
                  message.destroy();
                  message.success("更新成功");
                },
                onError: (error) => {
                  console.error(error);
                  message.destroy();
                  message.error("更新失败");
                },
              });
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          className="mt-4"
          label="竞标者"
          name="competitorId"
          rules={[{ required: true, message: "请选择竞标者" }]}
        >
          <Select
            options={
              competitors.competitors?.edges?.map((c) => ({
                label: c?.node?.name,
                value: c?.node?.id,
              })) ?? []
            }
          />
        </Form.Item>
        <Form.Item
          label="状态"
          name="won"
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: "中标", value: true },
              { label: "失标", value: false },
            ]}
          ></Radio.Group>
        </Form.Item>

        <Alert
          message="请注意，一旦确定，将无法更改"
          type="error"
          className="mb-4"
        />
      </Modal>
    </>
  );
}

import { tenderResultModal_competitorsQuery } from "__generated__/tenderResultModal_competitorsQuery.graphql";
import {
  Alert,
  App,
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Skeleton,
} from "antd";
import { Suspense, useState } from "react";
import {
  graphql,
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay";
import { useSetCompetitor } from "~/hooks/use-set-competitor";
import { usePortalStore } from "~/store/portal";

const CompetitorQuery = graphql`
  query tenderResultModal_competitorsQuery {
    competitors {
      edges {
        node {
          id
          shortName
          name
        }
      }
    }
  }
`;

export function TenderResultModal() {
  const [open, setOpen] = useState(false);
  const [queryRef, loadQuery] =
    useQueryLoader<tenderResultModal_competitorsQuery>(CompetitorQuery);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          if (!queryRef) {
            loadQuery({});
          }
          setOpen(true);
        }}
      >
        New Collection
      </Button>
      <Suspense fallback={<Skeleton active />}>
        {queryRef && (
          <TenderResultModalContent
            open={open}
            setOpen={setOpen}
            competitors={queryRef}
          />
        )}
      </Suspense>
    </>
  );
}

type TenderResultModalContentProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  competitors: PreloadedQuery<tenderResultModal_competitorsQuery>;
};

function TenderResultModalContent({
  competitors,
}: TenderResultModalContentProps) {
  const tender = usePortalStore((state) => state.tenderResultTender);
  const [form] = Form.useForm();
  const data = usePreloadedQuery<tenderResultModal_competitorsQuery>(
    CompetitorQuery,
    competitors,
  );
  const [commit, isInFlight] = useSetCompetitor();
  const { message } = App.useApp();

  const closeModal = () => {
    usePortalStore.setState({ tenderResultTender: null });
  };

  if (!tender) {
    return null;
  }

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
                  tenderId: tender.id,
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
              data.competitors?.edges?.map((c) => ({
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

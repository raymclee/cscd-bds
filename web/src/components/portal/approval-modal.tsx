import { useNavigate } from "@tanstack/react-router";
import { tenderDetailFragment$data } from "__generated__/tenderDetailFragment.graphql";
import { App, Button, Modal } from "antd";
import { Check } from "lucide-react";
import { useState } from "react";
import { useApproveTender } from "~/hooks/use-approve-tender";
import { useRejectTender } from "~/hooks/use-reject-tender";

export function ApprovalModal({
  tender,
}: {
  tender: tenderDetailFragment$data;
}) {
  const [open, setOpen] = useState(false);
  const [commitApproveTenderRequest, inApproveTenderRequestFlight] =
    useApproveTender();
  const [commitRejectTenderRequest, inRejectTenderRequestFlight] =
    useRejectTender();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleReject = () => {
    commitRejectTenderRequest({
      variables: {
        id: tender.id,
      },
      onCompleted: () => {
        message.destroy();
        message.success("拒绝成功");
        setOpen(false);
        navigate({
          to: ".",
          search: {
            p: undefined,
          },
        });
      },
      onError: (error) => {
        console.error(error);
        message.destroy();
        message.error("拒绝失败");
      },
    });
  };

  const handleApprove = () => {
    commitApproveTenderRequest({
      variables: {
        id: tender.id,
      },
      onCompleted: () => {
        message.destroy();
        message.success("批核成功");
        setOpen(false);
        navigate({
          to: ".",
          search: {
            p: undefined,
          },
        });
      },
      onError: (error) => {
        console.error(error);
        message.destroy();
        message.error("批核失败");
      },
    });
  };

  const isPendingApproval = tender.pendingProfile?.approvalStatus == 1;

  if (!open) {
    return (
      <Button
        disabled={!isPendingApproval}
        type="primary"
        icon={<Check size={16} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        审批
      </Button>
    );
  }

  const isLoading = inApproveTenderRequestFlight || inRejectTenderRequestFlight;

  return (
    <>
      <Button
        disabled={!isPendingApproval}
        type="primary"
        icon={<Check size={16} />}
        onClick={() => {
          setOpen(true);
        }}
      >
        审批
      </Button>
      <Modal
        open={open}
        title="审批"
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
        <p>确定批核该申请吗？</p>
      </Modal>
    </>
  );
}

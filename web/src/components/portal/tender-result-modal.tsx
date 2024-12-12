import { Button, Form, Input, Radio } from "antd";
import { Modal } from "antd";
import { useState } from "react";
import { graphql, useFragment } from "react-relay";

export function TenderResultModal(props: any) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const compitetor = useFragment(
    graphql`
      fragment tenderResultModal_competitors on Query {
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
    `,
    props.competitors,
  );

  console.log(compitetor);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        New Collection
      </Button>
      <Modal
        open={open}
        title="Create a new collection"
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: "public" }}
            clearOnDestroy
            onFinish={(values) => {}}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="modifier"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Modal>
    </>
  );
}

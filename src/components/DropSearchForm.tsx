import { useState } from "react";
import { Button, Form, Input, Select, Space, Row, Col } from "antd";

const { Option } = Select;

interface FormData {
  name: string;
  tagId: string;
  location: string;
  timeOfDay: string;
}

interface Props {
  tags: Tag[];
  onSubmit: (values: FormData) => void;
  children: React.ReactNode;
}

export default function DropSearchForm({ tags, onSubmit, children }: Props) {
  const [form] = Form.useForm<FormData>();

  return (
    <Form
      layout='inline'
      onFinish={onSubmit}
      autoComplete='off'
      form={form}
      style={{ width: "100%", display: "inline-grid" }}>
      {children}
      <Space style={{ display: "inline-grid" }}>
        <Row
          gutter={[12, 12]}
          style={{
            marginTop: "16px",
            marginBottom: "16px",
            marginLeft: 0,
            marginRight: 0,
            width: "100%",
          }}>
          <Col xs={12} xl={6}>
            <Form.Item label='Name' name='name'>
              <Input allowClear style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={12} xl={5} xxl={5}>
            <Form.Item label='Tag' name='tagId'>
              <Select allowClear style={{ width: "100%" }}>
                {tags.map((tag) => (
                  <Option key={tag.id} value={tag.id}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} xl={5} xxl={5}>
            <Form.Item label='Location' name='location'>
              <Select allowClear style={{ width: "100%" }}>
                <Option value='Interior'>Interior</Option>
                <Option value='Exterior'>Exterior</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} xl={5} xxl={5}>
            <Form.Item label='Time of Day' name='timeOfDay'>
              <Select allowClear style={{ width: "100%" }}>
                <Option value='Sunrise'>Sunrise</Option>
                <Option value='Morning'>Morning</Option>
                <Option value='Day'>Day</Option>
                <Option value='Sunset'>Sunset</Option>
                <Option value='Night'>Night</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={8} md={3} xl={3}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={{ width: "100%" }}>
                Search
              </Button>
            </Form.Item>
          </Col>
          {/* <Col xs={8} md={3} xl={2}>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                onClick={() => form.resetFields()}>
                Clear
              </Button>
            </Form.Item>
          </Col> */}
        </Row>
      </Space>
    </Form>
  );
}

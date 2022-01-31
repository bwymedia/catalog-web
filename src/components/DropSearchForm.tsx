import { Button, Form, Input, Select } from "antd";

const { Option } = Select;

interface FormData {
  name: string;
  style: string;
  location: string;
  timeOfDay: string;
}

interface Props {
  onSubmit: (values: FormData) => void;
}

export default function DropSearchForm({ onSubmit }: Props) {
  const [form] = Form.useForm<FormData>();

  return (
    <Form layout="inline" onFinish={onSubmit} autoComplete="off" form={form}>
      <Form.Item label="Name" name="name">
        <Input allowClear />
      </Form.Item>
      <Form.Item label="Style" name="style">
        <Select allowClear style={{ width: 150 }}>
          <Option value="abstract">Abstract</Option>
          <Option value="arches">Arches</Option>
          <Option value="art_deco">Art Deco</Option>
          <Option value="banners">Banners</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Location" name="location">
        <Select allowClear style={{ width: 100 }}>
          <Option value="Interior">Interior</Option>
          <Option value="Exterior">Exterior</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Time of Day" name="timeOfDay">
        <Select allowClear style={{ width: 100 }}>
          <Option value="Day">Day</Option>
          <Option value="Night">Night</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button onClick={() => form.resetFields()}>Clear</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
}

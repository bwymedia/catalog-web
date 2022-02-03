import { Button, Form, Input, Select } from "antd";

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
}

export default function DropSearchForm({ tags, onSubmit }: Props) {
  const [form] = Form.useForm<FormData>();

  return (
    <Form layout="inline" onFinish={onSubmit} autoComplete="off" form={form}>
      <Form.Item label="Name" name="name">
        <Input allowClear />
      </Form.Item>
      <Form.Item label="Tag" name="tagId">
        <Select allowClear style={{ width: 150 }}>
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
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
          <Option value="Sunrise">Sunrise</Option>
          <Option value="Morning">Morning</Option>
          <Option value="Day">Day</Option>
          <Option value="Sunset">Sunset</Option>
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

import * as React from "react";
import { Form, Input, Button, Checkbox, DatePicker } from "antd";

export default function LeadForm() {
  return (
    <Form name='lead' autoComplete='off'>
      <Form.Item label='First name' name='first_name'>
        <Input />
      </Form.Item>
      <Form.Item label='Last name' name='last_name'>
        <Input />
      </Form.Item>
      <Form.Item label='Email address' name='email_address'>
        <Input type='email' />
      </Form.Item>
      <Form.Item label='Organization' name='organization'>
        <Input />
      </Form.Item>
      <Form.Item label='First performance date' name='first_performance'>
        <DatePicker />
      </Form.Item>
    </Form>
  );
}

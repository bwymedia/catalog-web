import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { NextPage } from "next";
import { loadStripe } from "@stripe/stripe-js";
import { Row, Col, Form, Button, Alert, Input } from "antd";
import validator from "validator";
import moment from "moment";

import useComponentVisible from "../hooks/useComponentVisible";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_RSH_LIVE_PUBLISHABLE_KEY}`
);

export type DropNames = { [itemNames: string]: string };

export default function Checkout(items: DropNames) {
  const [inputValue, SetInputValue] = useState("");
  const [startDate, setStartDate] = useState(moment().format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(moment().format("MM-DD-YYYY"));
  const [dateFormatErrorMessage, setDateFormatErrorMessage] = useState("");

  const cart = useAppSelector((state) => state.cart);

  const validateDate = (value) => {
    if (!validator.isDate(value)) {
      setDateFormatErrorMessage("Enter Valid Date!");
    }
  };

  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const itemNames = cart.map((item) => {
    const name = `#${item.id} ${item.name}`;
    return name;
  });
  const allIds = cart.map((item) => "#" + item.id);

  const onChangeHandler = (event) => {
    SetInputValue(event.target.value);
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (totalQuantity > 25) {
      return <p>You can only order a maximum of 25 items at once.</p>;
    }
    const { sessionId } = await fetch("./api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allDropNames: itemNames,
        quantity: totalQuantity,
        organization: inputValue,
        startDate: startDate,
        endDate: endDate,
      }),
    }).then((res) => res.json());
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {totalQuantity > 25 ? (
        <Alert
          type='warning'
          style={{
            marginBottom: "8px",
            fontSize: "90%",
            textAlign: "center",
            paddingLeft: "4px",
            paddingRight: "4px",
          }}
          message='You can only add 25 drops with the Unlimited.'
        />
      ) : (
        ""
      )}
      <Row gutter={[8, 0]}>
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onFinish}
          style={{ width: "100%" }}
          form={form}
          validateMessages={validateMessages}>
          <Form.Item
            name={["user", "organization"]}
            label='Organization'
            help='Please add Organization name.'
            rules={[
              {
                required: true,
                message: "Please add Organization name.",
              },
            ]}>
            <Input value={inputValue} onChange={onChangeHandler} size='small' />
          </Form.Item>
          <Form.Item
            name={["user", "startDate"]}
            label='First Date'
            hasFeedback
            validateTrigger='onBlur'
            help='First Performance Date (MM-DD-YYYY).'
            rules={[
              {
                type: "date",
                required: true,
                message: "First Performance Date (MM-DD-YYYY).",
              },
              // () => {
              //   {
              //     validateDate(startDate);
              //     if (startDate === null) {
              //       return {
              //         message: dateFormatErrorMessage,
              //         type: "error",
              //       };
              //     } else {
              //       return {
              //         message: true,
              //         type: "success",
              //       };
              //     }
              //   }
              // },
            ]}>
            <input
              value={startDate}
              // size='small'
              type='date'
              style={{ width: "100%", border: "1px solid #d9d9d9" }}
              placeholder='First Performance Date'
            />
          </Form.Item>
          <Form.Item
            name={["user", "endDate"]}
            label='Last Date'
            help='Last Performance Date (MM-DD-YYYY).'
            rules={[
              {
                type: "date",
                required: true,
                message: "Last Performance Date (MM-DD-YYYY).",
              },
              // () => {
              //   {
              //     validateDate(endDate);
              //     if (endDate === null) {
              //       return {
              //         message: dateFormatErrorMessage,
              //         type: "error",
              //       };
              //     } else {
              //       return {
              //         message: true,
              //         type: "success",
              //       };
              //     }
              //   }
              // },
            ]}
            hasFeedback
            validateTrigger='onBlur'>
            <input
              value={endDate}
              type='date'
              style={{ width: "100%", border: "1px solid #d9d9d9" }}
              placeholder='Last Performance Date'
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType='submit'
              style={{
                width: "100%",
                color: "#fff",
                borderColor: "#1890ff",
                background: "#1890ff",
                textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
                boxShadow: "0 2px 0 rgb(0 0 0 / 5%)",
                textTransform: "uppercase",
              }}
              role='link'
              onClick={() => form.submit()}>
              Proceed to Checkout
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}

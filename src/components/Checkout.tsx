import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { NextPage } from "next";
import { loadStripe } from "@stripe/stripe-js";
import { Row, Col, Alert, Input } from "antd";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export type DropNames = { [itemNames: string]: string };

export default function Checkout(items: DropNames) {
  const [inputValue, SetInputValue] = useState(null);
  const cart = useAppSelector((state) => state.cart);
  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const itemNames = cart.map((item) => item.name);
  const allIds = cart.map((item) => "#" + item.id);

  const onChangeHandler = (event) => {
    SetInputValue(event.target.value);
  };
  const handleClick = async (event) => {
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
        ids: allIds,
        organization: inputValue,
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
            marginBottom: 0,
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
      <Row>
        <Col span={24} style={{ marginBottom: "8px" }}>
          <Input
            value={inputValue}
            onChange={onChangeHandler}
            placeholder='Please Add Your Organization Name'
            required
          />
        </Col>
      </Row>
      <button
        style={{
          width: "100%",
          color: "#fff",
          borderColor: "#1890ff",
          background: "#1890ff",
          textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
          boxShadow: "0 2px 0 rgb(0 0 0 / 5%)",
          textTransform: "uppercase",
        }}
        className={inputValue === null ? "disabled" : ""}
        role='link'
        onClick={() => {
          handleClick(event);
        }}>
        Proceed to Checkout
      </button>
    </div>
  );
}

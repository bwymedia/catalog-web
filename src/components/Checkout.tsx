import { useAppSelector } from "../hooks/hooks";
import { NextPage } from "next";
import { loadStripe } from "@stripe/stripe-js";
import { Alert } from "antd";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export type DropNames = { [itemNames: string]: string };

export default function Checkout(items: DropNames) {
  const cart = useAppSelector((state) => state.cart);
  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const itemNames = cart.map((item) => item.name);
  itemNames.join();

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
        name: items,
        quantity: totalQuantity,
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
          style={{ marginBottom: 0, fontSize: "90%" }}
          message='You can only order a maximum of 25 items at once.'
        />
      ) : (
        ""
      )}
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
        className={totalQuantity > 25 || totalQuantity === 0 ? "disabled" : ""}
        role='link'
        onClick={() => {
          handleClick(event);
        }}>
        Proceed to Checkout
      </button>
    </div>
  );
}

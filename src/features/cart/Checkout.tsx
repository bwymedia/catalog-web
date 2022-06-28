import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function Checkout({ items }) {
  // console.log(`items: ${items}`);
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form
      action={`${
        items >= 5 ? "/api/checkout_unlimited" : "/api/checkout_sessions"
      }`}
      method='POST'>
      <section>
        <button
          role='link'
          type='submit'
          className={`ant-btn ant-btn-primary ${
            items.length === 0 ? `disabled` : ""
          }`}
          style={{
            width: "100%",
            textTransform: "uppercase",
          }}>
          Checkout
        </button>
      </section>
    </form>
  );
}

import { useAppSelector } from "../hooks/hooks";
import { NextPage } from "next";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

export default function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const itemNames = cart.map((item) => item.name);
  itemNames.join();
  console.log(itemNames);

  const handleClick = async (event) => {
    const { sessionId } = await fetch("./api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: Object.entries(cart).map(([_, { id, quantity }]) => ({
          price: id,
          name: name,
        })),
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
        role='link'
        onClick={() => {
          handleClick(event);
        }}>
        Proceed to Checkout
      </button>
    </div>
  );
}

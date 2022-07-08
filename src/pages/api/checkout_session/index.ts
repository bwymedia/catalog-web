import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_RSH_LIVE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

type Quantity = 1 | 2 | 3 | 4 | 5;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quantity, allDropNames, ids, organization, startDate, endDate } =
    req.body;

  let productQuantity = quantity;

  if (quantity > 4) {
    productQuantity = 1;
  } else {
    productQuantity = quantity;
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "required",
    payment_intent_data: {
      metadata: {
        organization: organization,
        quantity: quantity,
        allDropNames: allDropNames.toString(),
        startDate: startDate,
        endDate: endDate,
      },
    },
    mode: "payment",
    line_items: [
      {
        price: `${
          quantity > 4
            ? process.env.ULIMITED_RSH_LIVE_PRICE_ID
            : process.env.SINGLE_RSH_LIVE_PRICE_ID
        }`,
        quantity: productQuantity,
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}`,
  });
  res.status(200).json({ sessionId: session.id });
}

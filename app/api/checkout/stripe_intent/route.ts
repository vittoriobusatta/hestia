import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const { items } = await request.json();
  const calculateOrderAmount = (items: any) => {
    return 1400;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return new NextResponse(
    JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// return NextResponse.redirect(
//     `/checkout/stripe_intent?clientSecret=${paymentIntent.client_secret}`
//   );

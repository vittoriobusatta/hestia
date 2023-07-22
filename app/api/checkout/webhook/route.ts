import { getFormattedDate, parseFormattedDate } from "@/utils/helpers";
import axios from "axios";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;

      const startDate = parseFormattedDate(
        paymentIntentSucceeded.metadata.startDate
      );
      const endDate = parseFormattedDate(
        paymentIntentSucceeded.metadata.endDate
      );

      try {
        const response = await axios.post(
          "http://localhost:3000/api/reservations",
          {
            listingId: paymentIntentSucceeded.metadata.listingId,
            startDate: startDate,
            endDate: endDate,
            totalPrice: paymentIntentSucceeded.amount / 100,
          }
        );

        if (response.status !== 200) {
          console.error("Error creating reservation");
        }

        const data = await response.data;
        console.log("Reservation created:", data);
      } catch (error) {
        console.error("Error creating reservation:", error);
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Success");
}

// 4242 4242 4242 4242

import { parseFormattedDate } from "@/utils/helpers";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { createReservation } from "@/app/actions/create/createReservation";

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

      const reservation = {
        startDate: parseFormattedDate(
          paymentIntentSucceeded.metadata.startDate
        ),
        endDate: parseFormattedDate(paymentIntentSucceeded.metadata.endDate),
        totalPrice: paymentIntentSucceeded.amount / 100,
        listingId: paymentIntentSucceeded.metadata.listingId,
        userId: paymentIntentSucceeded.metadata.userId,
      };

      await createReservation(reservation);

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response("Success");
}

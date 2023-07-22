import getCurrentUser from "@/app/actions/getCurrentUser";
import { parseFormattedDate } from "@/utils/helpers";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const { items } = await request.json();
  const currentUser = await getCurrentUser();

  if (!items) return new NextResponse("Missing items", { status: 400 });

  const calculateOrderAmount = (items: any) => {
    const formattedStartDate = parseFormattedDate(items[0].startDate);
    const formattedEndDate = parseFormattedDate(items[0].endDate);

    if (formattedStartDate === null || formattedEndDate === null) {
      throw new Error("Invalid date format");
    }

    const days = Math.floor(
      (formattedEndDate.getTime() - formattedStartDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const calculatedTotalPrice = days * items[0].price;

    if (calculatedTotalPrice === items[0].totalPrice) {
      return calculatedTotalPrice * 100;
    } else {
      throw new Error("Price is not correct");
    }
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      startDate: items[0].startDate, // Ajoutez la date de début comme métadonnée
      endDate: items[0].endDate, // Ajoutez la date de fin comme métadonnée
      listingId: items[0].listingId, // Ajoutez l'identifiant de l'annonce comme métadonnée
      userId: currentUser.id, // Ajoutez l'identifiant de l'utilisateur comme métadonnée
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

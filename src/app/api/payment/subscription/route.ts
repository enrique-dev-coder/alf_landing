import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.TOKEN);

export async function POST(request: NextRequest) {
  const { customerStripeId, stripePriceId } = await request.json();
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerStripeId,
      items: [
        {
          price: stripePriceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });
    return NextResponse.json(
      {
        subscriptionid: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

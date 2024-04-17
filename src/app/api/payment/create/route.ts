import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.TOKEN);

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    // pasarle los datos desde el componente de stripe payments
    //src\components\PaymentStrypeElement.tsx
    const payment = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: "usd",
      customer: body.customerStripeId,
      description: body.description,
      payment_method_types: ["card"],
    });
    return NextResponse.json(payment.client_secret, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

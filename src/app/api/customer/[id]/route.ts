// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
const stripe = require("stripe")(process.env.TOKEN);

export async function GET(req, params) {
  try {
    const getStripeIdFromCustomer = await prisma.user.findFirst({
      where: {
        id: params.params.id,
      },
      select: {
        stripeId: true,
      },
    });
    const stripeCustomer = await stripe.customers.retrieve(
      getStripeIdFromCustomer?.stripeId,
      {
        expand: ["subscriptions"],
      }
    );
    return NextResponse.json(
      {
        id: getStripeIdFromCustomer,
        customerSubscriptions: stripeCustomer.subscriptions.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}

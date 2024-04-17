//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "../../../../prisma";

const registerStrypeCustomer = async (data: {
  name: string;
  email: string;
}) => {
  return axios.post("https://api.stripe.com/v1/customers", data, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "content-type": "application/x-www-form-urlencoded",
    },
  });
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json(
      "Lo sentimos, te falta el email, nombre o contraseña",
      { status: 500 }
    );
  }

  try {
    const getStripeCustomerId = await registerStrypeCustomer({ name, email });
    const createdUserInOurDb = await prisma.user.create({
      data: {
        email,
        name,
        password,
        role: "customer",
        stripeId: getStripeCustomerId.data.id,
      },
    });
    return NextResponse.json(createdUserInOurDb, { status: 200 });
  } catch (error) {
    if (error.code === "P2002") {
      return NextResponse.json("Este email o nombre ya estan registrados", {
        status: 500,
      });
    }
    return NextResponse.json(
      "Lo sentimos, en este momento hay un error. Intenta mas tarde :(",
      {
        status: 500,
      }
    );
  }
}

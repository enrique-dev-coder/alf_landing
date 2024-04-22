import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function POST(params: NextRequest) {
  const body = await params.json();
  const { email, password } = body;
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!findUser) {
      return NextResponse.json("El email de usuario no esta registrado", {
        status: 500,
      });
    }
    if (findUser.password !== password) {
      return NextResponse.json("Contraseña equivocada", {
        status: 500,
      });
    }
    if (findUser.password === password) {
      return NextResponse.json(
        { userId: findUser.id },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json("Hay un problema porfavor intenta mas tarde :(", {
      status: 500,
    });
  }
}

//@ts-nocheck
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountInformation from "@/components/AccountInformation";
import prisma from "../../../prisma";
import DashboardMenu from "@/components/DashboardMenu";

const page = async () => {
  const cookieStore = cookies().get("mailsage");
  if (!cookieStore) {
    redirect("/register");
  }
  const parsedCookie = JSON.parse(cookieStore.value);
  const { userid } = parsedCookie;

  const getUserData = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      stripeId: true,
      email: true,
      name: true,
    },
  });

  return (
    <div className="w-full">
      <div className="max-w-[1580px] w-[90%]  flex mx-auto ">
        <div className="w-3/12">
          <DashboardMenu
            email={getUserData?.email}
            nombre={getUserData?.name}
          />
        </div>
        <div className="w-9/12">
          <div className="p-2">
            <h2 className="text-2xl font-medium ">Mis Suscripciones</h2>
            <AccountInformation userId={userid} />
          </div>
          <div className="p-2">
            <h2 className="text-2xl font-medium text-center ">
              ✅ Pronto se contactarán a su email para activar el servicio
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

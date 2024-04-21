import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountInformation from "@/components/AccountInformation";
import prisma from "../../../prisma";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <div className="max-w-[1280px] w-[80%] mx-auto mt-6">
        <h2 className="text-4xl font-medium ">
          Bienvenido: {getUserData?.name} !
        </h2>
        <hr className=" my-4" />
        <h3 className="text-2xl font-medium ">
          Email: {getUserData?.email}
        </h3>{" "}
        <AccountInformation />
      </div>
    </div>
  );
};

export default page;

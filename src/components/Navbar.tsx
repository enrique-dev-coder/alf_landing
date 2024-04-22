import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image/mailSage_logo.svg";
import { UserCircleIcon } from "lucide-react";
import prisma from "../../prisma";
import { cookies } from "next/headers";
import NavbarUSerMenu from "./NavbarUSerMenu";

const Navbar = async () => {
  const cookieStore = cookies().get("mailsage");
  if (!cookieStore) {
    return (
      <nav className=" w-full bg-white">
        <div className="max-w-[1280px] w-[80%]  mx-auto  py-4 flex  justify-between items-center">
          <Link href={"/"}>
            <Image alt="logo" src={logo} className="w-[200px]" />
          </Link>
          <div className="flex justify-center gap-8">
            <div>
              <button className=" border-2 border-mainDark px-4 py-2  rounded-md ">
                Contact us
              </button>
            </div>
            <Link href={"/login"}>
              <button className=" bg-mainDark text-white px-4 py-2  rounded-md">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  const parsedCookie = JSON.parse(cookieStore.value);
  const { userid } = parsedCookie;

  const getUserData = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      name: true,
    },
  });

  return (
    <nav className=" w-full bg-white">
      <div className="max-w-[1280px] w-[80%]  mx-auto  py-4 flex  justify-between items-center">
        <Link href={"/"}>
          <Image alt="logo" src={logo} className="w-[200px]" />
        </Link>
        <div className="flex justify-center gap-8">
          <div>
            <button className=" border-2 border-mainDark px-4 py-2  rounded-md ">
              Contact us
            </button>
          </div>
          <NavbarUSerMenu userName={getUserData?.name} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

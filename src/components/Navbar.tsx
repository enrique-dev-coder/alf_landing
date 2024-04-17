import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image/mailSage_logo.svg";
import { UserCircleIcon } from "lucide-react";
import prisma from "../../prisma";
import { cookies } from "next/headers";

const Navbar = async () => {
  const cookieStore = cookies().get("mailsage");
  if (!cookieStore) {
    return (
      <nav className=" w-full bg-white">
        <div className="max-w-[1280px] w-[80%]  mx-auto  py-4 flex  justify-between items-center">
          <div>
            <Image alt="logo" src={logo} className="w-[200px]" />
          </div>
          <div className="flex justify-center gap-8">
            <div>
              <button className=" border-2 border-mainDark px-4 py-2  rounded-full ">
                Contact us
              </button>
            </div>
            <Link href={"/login"}>
              <button className=" bg-mainDark text-white px-4 py-2  rounded-full">
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
        <div>
          <Image alt="logo" src={logo} className="w-[200px]" />
        </div>
        <div className="flex justify-center gap-8">
          <div>
            <button className=" border-2 border-mainDark px-4 py-2  rounded-full ">
              Contact us
            </button>
          </div>
          <div className="flex items-center gap-2 text-xl text-white bg-mainDark  border-2 px-2 py-1 rounded-full border-mainDark cursor-pointer">
            <UserCircleIcon />
            <p>{getUserData?.name}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

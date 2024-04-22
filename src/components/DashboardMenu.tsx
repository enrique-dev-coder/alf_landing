import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image/mailSage_logo.svg";
import { HomeIcon } from "lucide-react";
const DashboardMenu = ({
  nombre,
  email,
}: {
  nombre: string;
  email: string;
}) => {
  return (
    <div className=" h-screen bg-sky-50 flex flex-col  border-r-2 border-mainDark">
      <div>
        <Link href={"/"}>
          <Image alt="logo" src={logo} className="w-[200px] pl-3" />
        </Link>
      </div>
      <div className=" w-full px-3">
        <p className=" text-mainDark text-xl font-semibold">Hola {nombre} !</p>
        <p className=" text-mainDark font-semibold">email: {email}</p>
      </div>
      <div className=" bg-mainDark h-[.5px] w-full mt-4" />
      <div className="my-4">
        <button className=" flex bg-mainDark w-[95%] mx-auto px-2 py-1 gap-2 text-sky-50 rounded-md items-center">
          <HomeIcon size={20} />
          <p className=" text-xl">Inicio</p>
        </button>
      </div>
    </div>
  );
};

export default DashboardMenu;

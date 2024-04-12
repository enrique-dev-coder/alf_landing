import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/image/mailSage_logo.svg";
const Navbar = () => {
  return (
    <nav className=" w-full bg-white">
      <div className="max-w-[1280px] w-[80%]  mx-auto  py-4 flex  justify-between">
        <div>
          <Image alt="logo" src={logo} className="w-[200px]" />
        </div>
        <div className="flex justify-center gap-8">
          <button className=" border-2 border-mainDark px-4 py-2  rounded-full ">
            Contact us
          </button>
          {/* <Link href={"/login"}>
            <button className=" bg-mainDark text-white px-4 py-2  rounded-full">
              Login
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

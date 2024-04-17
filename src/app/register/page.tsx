import React from "react";
import Image from "next/image";
import Logo from "../../../public/image/mailSage_logo.svg";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <Link href={"/"}>
        <Image src={Logo} alt="Mail sage" width={200} />
      </Link>
      <div className="w-full">
        <p className="text-md font-medium text-center w-[350px] mx-auto ">
          Es necesario crear una cuenta para tener acceso a la compra de
          nuestros servicios
        </p>
      </div>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;

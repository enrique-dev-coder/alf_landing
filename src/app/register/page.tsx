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
      <p className="text-lg  font-medium">
        Crea una cuenta para poder compra uno de nuestros servicios
      </p>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default page;

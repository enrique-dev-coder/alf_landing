import React from "react";
import Image from "next/image";
import Logo from "../../../public/image/mailSage_logo.svg";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2">
      <Image src={Logo} alt="Mail sage" width={200} />
      <p className="text-lg  font-medium">Inicia sesion para continuar</p>
      <div>
        <LoginForm />
      </div>
      <Link href={"/register"}>
        <p>
          Aún no tienes una cuenta?{" "}
          <span className=" font-bold text-mainDark underline">
            Crea una cuenta
          </span>
        </p>
      </Link>
    </div>
  );
};

export default page;

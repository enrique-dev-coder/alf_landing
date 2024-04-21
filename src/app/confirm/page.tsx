import Link from "next/link";
import React from "react";
import { LogInIcon, MailIcon } from "lucide-react";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h2 className=" text-mainDark font-bold text-4xl uppercase w-6/12 text-center">
        Gracias por tu compra! 🥳
      </h2>
      <h3 className=" text-xl w-6/12 text-center font-semibold text-slate-950">
        En un momento recibiras las instrucciones de acceso al servicio por
        correo
      </h3>
      <h4 className=" text-slate-950 text-lg font-medium">
        Que quieres hacer ahora?
      </h4>
      <div className=" flex gap-4">
        <Link href={"/account"}>
          <button className=" bg-mainDark text-white px-3 py-1 border border-mainDark  rounded-md flex gap-2">
            Ir a mi cuenta
            <LogInIcon />
          </button>
        </Link>
        <button className=" bg-white text-mainDark border border-mainDark px-3 py-1  rounded-md flex items-center gap-2">
          Contáctanos <MailIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default page;

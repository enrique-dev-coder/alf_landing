import ContainerHome from "@/wrappers/ContainerHome";
import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <ContainerHome>
      <h2 className=" text-center text-mainDark font-bold text-5xl mb-4">
        Nuestros Servicios
      </h2>
      <div className="w-full grid grid-cols-12  gap-4 ">
        <div className=" col-span-4 bg-white flex flex-col gap-8 p-4 border-2 border-mainDark border-dashed rounded-md">
          {/*price*/}
          <div className="flex justify-center items-end gap-1">
            <h2 className=" text-mainDark font-bold text-4xl">$135</h2>
            <p className="text-mainDark font-bold text-xl">usd</p>
          </div>
          {/*description*/}
          <div className=" flex justify-center text-xl">
            <p>
              <span className="font-medium text-3xl">30,000</span> mails
            </p>
          </div>
          {/*button*/}
          <div className="flex justify-center">
            <Link href={"/checkout?producto=basic"}>
              <button className=" bg-mainDark text-white font-medium text-lg px-4 py-2  rounded-full">
                Comprar
              </button>
            </Link>
          </div>
        </div>
        <div className=" col-span-4 bg-white flex flex-col gap-8 p-4 border-2 border-mainDark border-dashed rounded-md">
          {/*price*/}
          <div className="flex justify-center items-end gap-1">
            <h2 className=" text-mainDark font-bold text-4xl">$195</h2>
            <p className="text-mainDark font-bold text-xl">usd</p>
          </div>
          {/*description*/}
          <div className=" flex justify-center text-xl">
            <p>
              <span className="font-medium text-3xl">60,000</span> mails
            </p>
          </div>
          {/*button*/}
          <div className="flex justify-center">
            <Link href={"/checkout?producto=plus"}>
              <button className=" bg-mainDark text-white font-medium text-lg px-4 py-2  rounded-full">
                Comprar
              </button>
            </Link>
          </div>
        </div>
        <div className=" col-span-4 bg-white flex flex-col gap-8 p-4 border-2 border-mainDark border-dashed rounded-md">
          {/*price*/}
          <div className="flex justify-center items-end gap-1">
            <h2 className=" text-mainDark font-bold text-4xl">$300</h2>
            <p className="text-mainDark font-bold text-xl">usd</p>
          </div>
          {/*description*/}
          <div className=" flex justify-center text-xl">
            <p>
              <span className="font-medium text-3xl">120,000</span> mails
            </p>
          </div>
          {/*button*/}
          <div className="flex justify-center">
            <Link href={"/checkout?producto=premium"}>
              <button className=" bg-mainDark text-white font-medium text-lg px-4 py-2  rounded-full">
                Comprar
              </button>
            </Link>
          </div>
        </div>{" "}
      </div>
    </ContainerHome>
  );
};

export default page;

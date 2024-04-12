import React from "react";
import logo from "../../public/image/mailSage_logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className=" w-full bg-white">
      <div className="max-w-[1280px] grid grid-cols-12 mx-auto h-[200px] py-10">
        <div className="text-4xl col-span-4">
          <Image src={logo} alt="logo" />
        </div>
        <div className=" col-span-4"></div>
        {/* <div className=" col-span-4">
          <ul>
            <li>Link 1</li> <li>link2</li>
          </ul>
        </div> */}
      </div>
      <div>
        <p className="text-center py-2">2024 Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;

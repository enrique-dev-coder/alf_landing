import React from "react";

const Footer = () => {
  return (
    <div className=" w-full">
      <div className="max-w-[1280px] grid grid-cols-12 mx-auto h-[300px] py-10">
        <div className="text-4xl col-span-4">LOGO</div>
        <div className=" col-span-4"></div>
        <div className=" col-span-4">
          <ul>
            <li>Link 1</li> <li>link2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

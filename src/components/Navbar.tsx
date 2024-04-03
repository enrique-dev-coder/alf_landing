import React from "react";

const Navbar = () => {
  return (
    <nav className=" w-full">
      <div className="max-w-[1280px] w-[80%]  mx-auto  py-4 flex  justify-between">
        <div>
          <p className=" text-3xl">LOGO</p>
        </div>
        <div className="flex justify-center gap-8">
          <button className=" border-2 border-black px-4 py-2  rounded-full ">
            Contact us
          </button>
          <button className=" bg-black text-white px-4 py-2  rounded-full">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

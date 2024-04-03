import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const ContainerHome = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="w-10/12 mx-auto max-w-[1280px]  my-10">{children}</main>
      <Footer />
    </>
  );
};

export default ContainerHome;

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href={"/"}>
        <button>return home</button>
      </Link>
    </div>
  );
};

export default page;

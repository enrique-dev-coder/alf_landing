"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdowMenu";
import { useRouter } from "next/navigation";

import { useCookies } from "react-cookie";
import Link from "next/link";

import { UserCircleIcon } from "lucide-react";

const NavbarUSerMenu = ({ userName }: { userName: string | undefined }) => {
  const { push, refresh } = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 text-xl text-white bg-mainDark  border-2 px-2 py-1 rounded-md border-mainDark cursor-pointer">
          <UserCircleIcon />
          <p>{userName}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        <DropdownMenuLabel>
          <Link href={"/account"}>
            <button>Mi cuenta</button>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            onClick={() => {
              removeCookie("mailsage");
              push("/");
              refresh();
            }}
            className=" font-medium text-red-500"
          >
            Cerrar Sesión
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUSerMenu;

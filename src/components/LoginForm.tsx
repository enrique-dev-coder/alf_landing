//@ts-nocheck
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { expirationDate } from "@/lib/utils/time";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";

interface formData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });

  const [, setCookie] = useCookies();
  const { push } = useRouter();

  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/login", data);
    },
    onSuccess: (response) => {
      // esto viene del NextResponse de 200 de la API,
      setCookie(
        "mailsage",
        {
          userid: response.data.userId,
        },
        {
          expires: expirationDate,
        }
      );
      push("/pricing");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData);
  };

  return (
    <>
      {isPending ? (
        <div className="flex justify-center">
          <Loader2Icon className=" animate-spin text-mainDark" size={80} />
        </div>
      ) : (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className=" border shadow-md rounded-md p-3   w-[300px]"
        >
          <div className="flex flex-col mb-2">
            <label>Email</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-mainDark p-1 rounded-sm"
              type="email"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label>Contraseña</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border border-mainDark p-1 rounded-sm"
              type="password"
            />
          </div>
          <button
            type="submit"
            className=" bg-mainDark text-white w-full rounded-sm py-2"
          >
            Entrar
          </button>
          {error && (
            <div className="flex text-red-500 text-sm gap-2 mt-2">
              <AlertCircleIcon size={20} />
              <p>{error?.response?.data}</p>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default LoginForm;

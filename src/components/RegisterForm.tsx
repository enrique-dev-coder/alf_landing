//@ts-nocheck
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { expirationDate } from "@/utils/time";
import { Loader2Icon, AlertCircleIcon } from "lucide-react";

interface formData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [, setCookie] = useCookies();
  const { push } = useRouter();
  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
  });

  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("/api/register", data);
    },
    onSuccess: (response) => {
      // esto viene del NextResponse de 200 de la API,
      setCookie(
        "mailsage",
        {
          userid: response.data.id,
        },
        {
          expires: expirationDate,
        }
      );
      push("/");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
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
          className=" border shadow-md rounded-md p-3   w-[350px]"
        >
          <div className="flex flex-col mb-2">
            <label>Nombre</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="border border-mainDark p-1 rounded-sm"
              type="text"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label>Email</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-mainDark p-1 rounded-sm"
              type="text"
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
            Crear
          </button>
          {error && (
            <div className="flex text-red-500 text-sm">
              <AlertCircleIcon />
              <p>{error?.response?.data}</p>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default RegisterForm;

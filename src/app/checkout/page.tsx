//@ts-nocheck
/* eslint-disable */
"use client";
import { useState } from "react";
import { ChevronRightCircle, LoaderCircleIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import axios from "axios";
import PaymenStripeElement from "@/components/PaymentStrypeElement";
import StripeLogo from "../../../public/image/stripe_logo.svg";

// TODO: ver que pedo con eso que NEXT_PUBLIC exposes this value to the browser
// TODO: porque se expone la autorization en la pestaña de red, igual le pregunto a mati a ver que dice

const page = ({ searchParams }) => {
  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    email: "",
  });
  const [stripeCustomerSecret, setStripeCustomerSecret] = useState("");
  const { producto } = searchParams;
  const metadata = {
    producto1: {
      amount: 13500,
      amount_shown: 135,
      description: "30 mil mails",
    },
    producto2: {
      amount: 19500,
      amount_shown: 195,
      description: "60 mil mails",
    },
    producto3: {
      amount: 30000,
      amount_shown: 300,
      description: "120 mil mails",
    },
  };
  // generar payment intent agregando amount y customer id
  // 1 en la form generar el customer de stripe al dar click en el boton de siguiente, esto se hace con un post a https://api.stripe.com/v1/customers
  // 2 aqui se hace un payment intent con el customer id  mandando un post a "https://api.stripe.com/v1/payment_intents",
  // 3 ese secret se pasa como prop a el payment element de stripe

  const {
    mutate: createStripeCustomer,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => {
      return axios.post("https://api.stripe.com/v1/customers", data, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    },
    // onSuccess: (data) => setStripeCustomerId(data.data.id),
    onSuccess: (data) => {
      return axios
        .post(
          "https://api.stripe.com/v1/payment_intents",
          {
            amount: metadata[producto].amount,
            description: metadata[producto].description,
            customer: data.data.id,
            currency: "usd",
            automatic_payment_methods: {
              enabled: true,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
              "content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((data) => setStripeCustomerSecret(data.data.client_secret));
    },
  });

  const onCustomerFormSumbit = (e) => {
    e.preventDefault();
    createStripeCustomer(customerFormData);
  };

  return (
    <div className="w-10/12 mx-auto my-8 max-w-[1140px]">
      <p className="text-lg">
        Escribe tu nombre y correo para continuar con tu compra{" "}
      </p>

      <div className=" flex gap-4">
        <form
          onSubmit={(e) => onCustomerFormSumbit(e)}
          className=" py-2  w-6/12 "
        >
          <div className="flex flex-col">
            <label className=" text-mainDark ">Nombre</label>
            <input
              required
              onChange={(e) =>
                setCustomerFormData({
                  ...customerFormData,
                  name: e.target.value,
                })
              }
              className=" p-1 border  border-mainDark rounded-sm "
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label className=" text-mainDark ">Email</label>
            <input
              required
              onChange={(e) =>
                setCustomerFormData({
                  ...customerFormData,
                  email: e.target.value,
                })
              }
              className=" p-1 border  border-mainDark rounded-sm "
              type="email"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!!stripeCustomerSecret}
              className=" disabled:bg-mainDark/50 bg-mainDark py-1 px-3  flex gap-2 text-lg  rounded-full text-sky-50 my-3"
            >
              Siguiente
              <ChevronRightCircle />
            </button>
          </div>
        </form>
        <div className="w-6/12 border-l-2 pl-4">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tu Compra:</h2>
          <div className="text-xl flex flex-col gap-4">
            <p>
              Envío de{" "}
              <span className=" font-semibold text-mainDark">
                {metadata[producto].description}
              </span>{" "}
            </p>
            <p className="font-semibold">
              TOTAL:
              <br /> ${metadata[producto].amount_shown} usd
            </p>
          </div>
        </div>
      </div>

      {isSuccess && stripeCustomerSecret ? (
        <div className="mt-[80px]">
          <div className="flex items-center text-lg my-2">
            <p>Pago seguro con </p>
            <Image alt="stripe logo" src={StripeLogo} />
          </div>
          <PaymenStripeElement clientSecret={stripeCustomerSecret} />
        </div>
      ) : (
        <div className="flex justify-center">
          {isPending && (
            <LoaderCircleIcon
              size={64}
              className=" animate-spin mt-[120px] text-mainDark "
            />
          )}
        </div>
      )}
    </div>
  );
};

export default page;

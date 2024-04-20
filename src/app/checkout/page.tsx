//@ts-nocheck
/* eslint-disable */

import PaymenStripeElement from "@/components/PaymentStrypeElement";
import prisma from "../../../prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({ searchParams }) => {
  // const [stripeCustomerSecret, setStripeCustomerSecret] = useState("");

  // redirigir a crear cuenta si no hay cookie
  const cookieStore = cookies().get("mailsage");
  if (!cookieStore) {
    redirect("/register");
  }
  const parsedCookie = JSON.parse(cookieStore.value);
  const { userid } = parsedCookie;
  const getUserData = await prisma.user.findUnique({
    where: {
      id: userid,
    },
    select: {
      stripeId: true,
    },
  });
  const { stripeId } = getUserData;

  const { producto } = searchParams;
  const metadata = {
    producto1: {
      amount: 13500,
      amount_shown: 135,
      description: "30 mil mails",
      stripePriceId: "price_1P786MKFPZUKkl8SrdWFMa9j",
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

  return (
    <div className="w-10/12 mx-auto my-8 max-w-[1140px]">
      <div className=" flex gap-4">
        <div className="w-6/12  pl-4">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Tu Compra:</h2>
          <div className="text-xl flex flex-col gap-4">
            <p>
              Envío de{" "}
              <span className=" font-semibold text-mainDark">
                {metadata[producto].description}
              </span>{" "}
            </p>
            <p className="font-semibold">
              TOTAL: ${metadata[producto].amount_shown} usd
            </p>
          </div>
        </div>
      </div>
      {/*TODO: esto pasarlo a un componente  de cliente donde reciba el userid y la metadata  y ahi hacer el payment intent*/}
      {stripeId ? (
        <PaymenStripeElement
          customerStripeId={stripeId}
          amount={metadata[producto].amount}
          description={metadata[producto].description}
          stripePriceId={metadata[producto].stripePriceId}
        />
      ) : null}
    </div>
  );
};

export default page;

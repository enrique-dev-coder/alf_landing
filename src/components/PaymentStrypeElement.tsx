//@ts-nocheck
"use client";
import { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import StripeLogo from "../../public/image/stripe_logo.svg";
import { loadStripe } from "@stripe/stripe-js";
import { LoaderCircleIcon } from "lucide-react";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_OTRO_TOKEN_XD);

const PaymenStripeElement = ({
  customerStripeId,
  amount,
  description,
  stripePriceId,
}: {
  customerStripeId: string;
  stripePriceId: string;
  amount: string;
  description: string;
}) => {
  const [subscriptionObj, setSubscriptionObj] = useState({});
  // NOTA : SE ELIMINA LA PARTE DE PAYMENT INTENT PORQUE YA NO TIENE CASO
  // PARA UN MODELO DE SUSCRIPCION SOLO SE NECESITA EL CLIENT SECRET
  // PARA PASARLO A LOS ELEMENTOS DE STRIPE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const createInactiveSuscription = await fetch(
          "/api/payment/subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerStripeId, stripePriceId }),
          }
        );
        const subscriptionInfo = await createInactiveSuscription.json();
        setSubscriptionObj(subscriptionInfo);
        // Aquí puedes hacer algo con los datos recibidos si es necesario
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
    // Si necesitas hacer alguna limpieza al desmontar el componente, puedes retornar una función aquí
  }, []);

  // loader hasta que carge el seceret
  if (subscriptionObj?.clientSecret) {
    const options = {
      clientSecret: subscriptionObj?.clientSecret,
      // Fully customizable with appearance API.
      appearance: {
        /*...*/
      },
    };
    return (
      <div className="mt-[80px]">
        <div className="flex items-center text-lg my-2">
          <p>Pago seguro con </p>
          <Image alt="stripe logo" src={StripeLogo} />
        </div>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    );
  } else {
    return (
      <div>
        <LoaderCircleIcon
          className="animate-spin  text-mainDark mt-10"
          size={80}
        />
      </div>
    );
  }
};

export default PaymenStripeElement;

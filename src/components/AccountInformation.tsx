//@ts-nocheck
"use client";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
// TODO Aqui traer info del cliente
// la suscripcion si esta activa y cuando se renueva etc

const AccountInformation = ({ userId }: { userId: string }) => {
  const [userSuscriptionsData, setUserSuscriptionsData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const createInactiveSuscription = await fetch(
          `/api/customer/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const subscriptionInfo = await createInactiveSuscription.json();
        setUserSuscriptionsData(subscriptionInfo.customerSubscriptions);
        // Aquí puedes hacer algo con los datos recibidos si es necesario
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };

    fetchData();
    // Si necesitas hacer alguna limpieza al desmontar el componente, puedes retornar una función aquí
  }, [userId]);

  const productsDescriptions = {
    price_1P786MKFPZUKkl8SrdWFMa9j: {
      billed: "mensual",
      desc: "30,000 mails",
    },
    price_1P84wxKFPZUKkl8SnbBrwznA: {
      billed: "mensual",
      desc: "60,000 mails",
    },
    price_1P84xYKFPZUKkl8SUNyyEu6I: {
      billed: "mensual",
      desc: "120,000 mails",
    },
  };

  if (userSuscriptionsData) {
    return (
      <>
        <div>
          {userSuscriptionsData
            .filter((item) => item.status === "active")
            .map((item, i) => (
              <div key={i} className="flex w-full border-2 text-lg p-2 mt-2">
                <div className="w-4/12 ">
                  <p className="font-medium">Producto</p>
                  <p>{productsDescriptions[item.plan.id].desc}</p>
                </div>
                <div className="w-4/12">
                  <p className="font-medium">Cargo</p>
                  <p>{productsDescriptions[item.plan.id].billed}</p>
                </div>
                <div className="w-4/12">
                  <p className=" font-medium">Estado</p>
                  <p className=" bg-green-100 px-1 w-fit text-green-700">
                    {" "}
                    Activo
                  </p>
                </div>
              </div>
            ))}
        </div>
      </>
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

export default AccountInformation;

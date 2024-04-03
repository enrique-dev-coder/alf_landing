import ContainerHome from "@/wrappers/ContainerHome";
import Image from "next/image";
import DemoImage from "../../public/image/demo_img.svg";
export default function Home() {
  return (
    <div className=" w-full">
      <ContainerHome>
        <div className=" flex flex-col gap-8">
          <p className=" text-center font-medium">
            $3 and as low as $1.75 per mailbox.
          </p>
          <h1 className=" text-center font-bold text-6xl w-8/12 mx-auto">
            Cold Email Infrastructure Sorted In Minutes
          </h1>
          <p className=" text-center w-6/12 mx-auto  font-medium">
            Create hundreds of domains and mailboxes in minutes with premium
            deliverability and free automated setup.
          </p>
          <div className="flex justify-center gap-8">
            <button className=" border-2 border-black px-4 py-2  rounded-full ">
              Schedule a demo
            </button>
            <button className=" bg-black text-white px-4 py-2  rounded-full">
              Buy now!
            </button>
          </div>
        </div>
        <Image alt="demo image" src={DemoImage} />
      </ContainerHome>
    </div>
  );
}

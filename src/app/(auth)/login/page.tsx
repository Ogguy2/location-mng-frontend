import React from "react";
import Image from "next/image";
import Button from "@/components/buttons";

const Page = () => {
  return (
    <div className="">
      <div className="flex h-screen w-screen  items-center justify-center">
        <div className=" w-1/2 h-full flex items-center justify-center p-5">
          {/* <div className="relative h-full "> */}
          {/* <Image fill src={"/images/login/bg-two.jpg"} className=" shadow rounded-2xl" style={{ objectFit: "cover" }} alt="dd" /> */}
          {/* </div> */}
          <div className="">
            {/* Logo */}
            <Logo />
            <div className=""></div>
            <div className=""></div>
            <div className="">
              <Button variant="solid" color="primary" className="">
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className=" w-1/2 h-full p-5">
          <div className="relative  h-full ">
            <Image fill src={"/images/login/bg-two.jpg"} className=" shadow rounded-2xl" style={{ objectFit: "cover" }} alt="dd" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const FormContainer = () => {
  return <div className=""></div>;
};

interface LoginContainerProps {
  children: React.ReactNode;
}

const LoginContainer = ({ children }: LoginContainerProps) => {
  return <div className=""></div>;
};

const Logo = () => {
  return (
    <div className="">
      <Image src={"/images/logo/logo1.png"} alt="logo" width={50} height={50} />
    </div>
  );
};

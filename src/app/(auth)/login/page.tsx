import React from "react";
import Image from "next/image";
// import Button from "@/components/buttons";
// import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="">
      <div className="flex h-screen w-screen  items-center justify-center">
        <div className=" border-r-2 border-primary  border-0 w-1/3 h-full flex items-center justify-center p-5">
          {/* <div className="relative h-full "> */}
          {/* <Image fill src={"/images/login/bg-two.jpg"} className=" shadow rounded-2xl" style={{ objectFit: "cover" }} alt="dd" /> */}
          {/* </div> */}
          <div className="w-[300px] space-y-10">
            {/* Logo */}
            <div className="flex justify-center w-full">
              <Logo />
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Input placeholder="Nom d'utilisateur" className="" />
              </div>
              <div className="space-y-1">
                <Input placeholder="Mot de passe" type="password" className="" />
                <Link className=" underline text-sm font-semibold" href={"#"}>
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            <div className=""></div>
            <div className="">
              <Button
                variant={"default"}
                color="primary"
                className="w-full font-semibold"
              >
                Se connecter
              </Button>
            </div>
          </div>
        </div>
        <div className=" w-2/3 relative h-full">
          <Image
            fill
            src={"/images/login/bg-two.jpg"}
            style={{ objectFit: "cover" }}
            alt="dd"
          />
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

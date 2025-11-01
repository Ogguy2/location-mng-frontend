"use client";
import React, { useActionState } from "react";
import Image from "next/image";
// import Button from "@/components/buttons";
import { signUp } from "@/app/actions/auth";
// import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [error, setErrors] = React.useState(state);
  const [password, setPassword] = React.useState("password123");
  const [email, setEmail] = React.useState("Maggie.Skiles@gmail.com");

  React.useEffect(() => {
    setErrors(state);
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    }
    if (name === "email") {
      setEmail(value);
    }
  };
  return (
    <div className="">
      <div className="flex h-screen w-screen  items-center justify-center">
        <div className=" xl:border-r-2 border-primary   xl:border-0 w-full xl:w-1/2 2xl:h-1/3 h-full  flex items-center justify-center p-5">
          {/* <div className="relative h-full "> */}
          {/* <Image fill src={"/images/login/bg-two.jpg"} className=" shadow rounded-2xl" style={{ objectFit: "cover" }} alt="dd" /> */}
          {/* </div> */}
          <div className=" w-[300px] space-y-10">
            {/* Logo */}
            <form
              action={action}
              className="flex space-y-9 w-full flex-col font-nunito"
            >
              <div className="flex justify-center w-full">
                <Logo />
              </div>
              <div className="space-y-5">
                <div className="">
                  <div className="space-y-2">
                    <Label className="" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="jonhdoh@exemple.com"
                      className=""
                    />
                  </div>
                  {error && (
                    <p className="text italic text-sm font-semibold text-red-500">
                      {error.properties?.email?.errors[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="space-y-2">
                    <Label className="" htmlFor="password">
                      Mot de passe
                    </Label>
                    <Input
                      name="password"
                      placeholder="Mot de passe"
                      type="password"
                      value={password}
                      onChange={handleChange}
                      className=""
                    />
                  </div>
                  {error && (
                    <p className="text italic text-sm font-semibold text-red-500">
                      {error.properties?.password?.errors[0]}
                    </p>
                  )}
                  {error && (
                    <p className="text text-red-500">{error.message}</p>
                  )}
                  <Link className=" underline text-sm font-semibold" href={"#"}>
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <div className=""></div>
              <div className="">
                <Button
                  disabled={pending}
                  variant={"default"}
                  color="primary"
                  className="w-full font-semibold"
                >
                  Se connecter
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className=" xl:w-1/2 2xl:w-2/3 relative hidden xl:block h-full">
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

export const Logo = () => {
  return (
    <div className="">
      <Image src={"/images/logo/logo1.png"} alt="logo" width={50} height={50} />
    </div>
  );
};

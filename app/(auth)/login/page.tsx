import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/globe.svg";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="self-center flex items-center gap-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold">Logo</h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

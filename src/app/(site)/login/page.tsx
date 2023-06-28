"use client";
import Image from "next/image";
import AuthForm from "../component/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-5 bg-cyan-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto max-w-md"
          src="/images/logo.png"
          height={48}
          width={48}
          alt="logo"
          crossOrigin=""
          priority
        />
        <h2 className="font-bold text-3xl text-center text-gray-900">
          Sign in your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}

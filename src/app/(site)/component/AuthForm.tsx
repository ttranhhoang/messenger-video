"use client";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type TypeVariant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const router = useRouter();
  const session = useSession();
  const [variant, setVariant] = useState<TypeVariant>("LOGIN");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const toggleVariant = () => {
    if (variant === "LOGIN") return setVariant("REGISTER");

    if (variant === "REGISTER") return setVariant("LOGIN");
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Something went wrong!");
          } else if (callback?.ok && !callback?.error) {
            router.push("/users");
            toast.success("Logged success");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const onClickSocial = (type: string) => {
    console.log("click social", type);
    signIn(type, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Something went wrong!");
        }
        if (callback?.ok && !callback.error) {
          toast.success("Logged success");
        }
      })
      .finally(() => setIsLoading(false));
  };
  // useEffect(() => {
  //   if (session.status === "authenticated") {
  //     router.push("/users");
  //     console.log("log");
  //   }
  //   if (session.status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [session.status, router]);
  return (
    <div className="bg-white px-4 py-8 mt-4 shadow rounded-lg">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {variant === "REGISTER" && (
          <Input
            id="name"
            label="Name"
            type="text"
            required
            register={register}
            disable={isLoading}
            errors={errors}
          />
        )}
        <Input
          id="email"
          label="Email"
          type="email"
          required
          register={register}
          disable={isLoading}
          errors={errors}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          required
          register={register}
          disable={isLoading}
          errors={errors}
        />
        <Button type="submit" disable={isLoading} fullWidth>
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </Button>
      </form>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <span className="absolute px-3 font-light text-sm text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
          or continute with
        </span>
      </div>
      <div className="flex items-center gap-1">
        <ButtonIcon icon={BsGithub} onClick={() => onClickSocial("github")} />
        <ButtonIcon icon={BsGoogle} onClick={() => onClickSocial("google")} />
      </div>
      <div className="text-center text-sm mt-5">
        {variant === "LOGIN" ? "New to message?" : "Already have an account"}
        <span className="ml-1 underline cursor-pointer" onClick={toggleVariant}>
          {variant === "LOGIN" ? "Create account" : "Login"}
        </span>
      </div>
    </div>
  );
}

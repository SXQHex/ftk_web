"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { SubmitBtn } from "../../../../components/auth/SubmitBtn";
import { GoogleAuthBtn } from "@/components/auth/GoogleAuthBtn";
import { RegisterSchema, RegisterSchemaType } from "@/lib/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { registerUser } from "../action/register";
import { redirect } from "next/navigation";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterSchemaType) => {
    try {
      setErrorMessage("");
      startTransition(async () => {
        const res = await registerUser(data);
        if (!res.success) {
          setErrorMessage(res.error ? res.error : "");
          return;
        }
        redirect("/");
      });
    } catch {
      setErrorMessage("birşeyler ters gitti .");
    }
  };
  return (
    <>
      <div className="w-125 p-3 bg-white border border-gray-200 shadow-2xl">
        <div className="flex flex-col  justify-center items-center w-full">
          <h1 className="text-2xl font-bold text-indigo-900">Yeni Hesap</h1>
          <p className="text-base text-gray-600">Kayıt olun </p>
        </div>
        <Form {...form}>
          <form
            className="p-3 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="john doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-destructive">
              {errorMessage ? errorMessage : ""}
            </h1>
            <SubmitBtn isPending={isPending}>Register</SubmitBtn>

            <div className="flex justify-center">
              <span className="text-red-500">Or</span>
            </div>
            <GoogleAuthBtn />

            <div>
              <h1>
                Already have an account?{" "}
                <Link href={"/"} className="underline text-indigo-900">
                  {" "}
                  Login here
                </Link>
              </h1>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
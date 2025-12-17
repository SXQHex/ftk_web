// src/app/[auth]/login/components/LoginForm.tsx
"use client";

import { LoginSchema, LoginSchemaType } from "@/lib/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GoogleAuthBtn } from "@/components/auth/GoogleAuthBtn";
import { SubmitBtn } from "@/components/auth/SubmitBtn";
import { redirect } from "next/navigation";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setErrorMessage("");
      startTransition(async () => {
        const result = await signIn("credentials", {
          ...data, // Artık sadece email ve password içeriyor
          redirect: false,
        });

        if (result?.error) {
          setErrorMessage(result.error);
        } else {
          redirect("/Home");
        }
      });
    } catch (err) {
      console.error("Giriş sırasında hata oluştu:", err);
      setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <div className="w-125 p-3 bg-white border border-gray-200 shadow-2xl">
        <div className="flex flex-col justify-center items-center w-full">
          <h1 className="text-2xl font-bold text-indigo-900">Hoşgeldiniz</h1>
          <p className="text-base text-gray-600">Hesabınıza Giriş Yapın </p>
        </div>
        <Form {...form}>
          <form
            className="p-3 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-posta <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ornek@ornek.com" {...field} />
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
                    Parola <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h1 className="text-destructive text-xl font-semibold">
              {" "}
              {errorMessage ? errorMessage : ""}
            </h1>
            <SubmitBtn isPending={isPending}>Giriş Yap</SubmitBtn>

            <div className="flex justify-center">
              <span className="text-red-500">Veya</span>
            </div>
            <GoogleAuthBtn />
            <div>
              <h1>
                Hesabınız yok mu?{" "}
                <Link href={"/register"} className="underline text-indigo-900">
                  {" "}
                  Kayıt olun
                </Link>
              </h1>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
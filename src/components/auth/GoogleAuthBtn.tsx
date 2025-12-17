"use client";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export const GoogleAuthBtn = () => {
  const [isPending, startTransition] = useTransition();
  const onLogin = () => {
    startTransition(
      async () =>
        await signIn("google", {
          redirect: true,
          redirectTo: "/login",
        })
    );
  };
    return (
        <Button 
            variant={"outline"} 
            className="w-full"
        >
            <Image 
                src={"/google.svg"}
                width={300}
                height={300}
                alt="google icon"
                className="size-4" 
            /> {" "}
            {isPending && <LoaderCircle className="animate-spin" />} Google ile giriş yap
        </Button>
    );
};
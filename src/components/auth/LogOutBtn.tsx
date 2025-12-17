"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const LogOutBtn = () => {
  const onLogin = async () => {
    await signOut();
  };
  return (
    <Button type="button" variant={"outline"} onClick={onLogin}>
      {" "}
      <LogOut /> Log out
    </Button>
  );
};
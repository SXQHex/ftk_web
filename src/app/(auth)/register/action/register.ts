"use server";

import { RegisterSchema, RegisterSchemaType } from "@/lib/auth.schema";
import { error } from "console";

export const registerUser = async (user: RegisterSchemaType) => {
  try {
    const isValidData = RegisterSchema.safeParse(user);

    if (!isValidData.success) {
      return {
        success: false,
        error: "Invalid data",
      };
    }
    const { email, password, name } = isValidData.data;
    const isUser = await getUserByEmail(email);
    if (isUser) {
      return {
        success: false,
        error: "user already exist",
      };
    }
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      error: null,
    };
  } catch (err) {
    throw err;
  }
};
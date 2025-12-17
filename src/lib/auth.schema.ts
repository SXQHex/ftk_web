// src/lib/auth.schema.ts
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Geçersiz eposta",
  }),
  password: z.string().min(6, {
    message: "Parola 6 karakterden az olamaz",
  }),
});


export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(3, {
      message: "isim 3 karakterden az olamaz",
    }),
    email: z.string().email({
      message: "Geçersiz eposta",
    }),
    password: z.string().min(6, {
      message: "Parola 6 karakterden az olamaz",
    }),
    confirmPassword: z.string().min(6, {
      message: "Parola 6 karakterden az olamaz",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Parolalar eşleşmiyor",
      });
    }
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
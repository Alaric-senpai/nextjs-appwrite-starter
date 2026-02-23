import * as z from "zod"


export const RegisterformSchema = z.object({
  "name": z.string({ error: 'This field is required' }),
  "email": z.email({error: 'Please enter a valid email'}),
  "password": z.string({ error: 'This field is required' }).min(8, "Password must be at least 8 characters"),
  "confirm-password": z.string({ error: 'This field is required' }),
  "social-media-buttons": z.unknown(),
  "agree": z.literal(true, {error: 'This field is required'})
}).refine((data) => data.password === data["confirm-password"], {
  message: "Passwords do not match",
  path: ["confirm-password"],
});


export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}
export const LoginformSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  password: z.string({ error: "This field is required" }),
});

export const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
});

export const ResetPasswordSchema = z.object({
  password: z.string({ error: "This field is required" }).min(8, "Password must be at least 8 characters"),
  "confirm-password": z.string({ error: 'This field is required' }),
  userId: z.string(),
  secret: z.string(),
}).refine((data) => data.password === data["confirm-password"], {
  message: "Passwords do not match",
  path: ["confirm-password"],
});

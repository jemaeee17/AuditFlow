import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "Name must be at least 3 characters"),

        email: z
            .email("Invalid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from "zod";

const UserSchema = z.object({
    user_id: z.string().min(8, "Must be at least 8 characters"),
    name: z.string().min(8, "Must be at least 8 characters"),
});
export type UserSchemaType = z.output<typeof UserSchema>;

export const RegisterSchema = UserSchema.extend({
    password: z.string().min(8, "Must be at least 8 characters"),
    confirm_password: z.string().min(8, "Must be at least 8 characters"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})
export type RegisterSchemaType = z.output<typeof RegisterSchema>;

export const LoginSchema = UserSchema.omit({ name: true }).extend({
    password: z.string().min(8, "Must be at least 8 characters"),
});
export type LoginSchemaType = z.output<typeof LoginSchema>;

const UserResponseSchema = UserSchema.extend({
    id: z.number(),
    token: z.string(),
});
export type UserResponseSchemaType = z.output<typeof UserResponseSchema>;
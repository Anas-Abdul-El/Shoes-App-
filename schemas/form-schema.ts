import { z } from "zod"

/**
 * Zod schema for sign-in form validation.
 * Validates name, email, and password fields.
 */
export const formSchema = z.object({
    /** User's full name - must be at least 1 character */
    name: z.string().min(1, {
        message: "Please enter your name.",
    }),
    /** User's email address - must be a valid email format */
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    /** User's password - must be at least 8 characters long */
    password: z.string().min(8, {
        message: "Password must be at least 8 character.",
    }),
})

/**
 * Zod schema for login form validation.
 * Validates email and password fields (no name required).
 */
export const loginSchema = z.object({
    /** User's email address - must be a valid email format */
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    /** User's password - must be at least 8 characters long */
    password: z.string().min(1, {
        message: "Password is required.",
    }),
})

/**
 * TypeScript type inferred from formSchema.
 * Represents the shape of data for sign-in forms.
 */
export type FormSchemaType = z.infer<typeof formSchema>

/**
 * TypeScript type inferred from loginSchema.
 * Represents the shape of data for login forms.
 */
export type LoginSchemaType = z.infer<typeof loginSchema>
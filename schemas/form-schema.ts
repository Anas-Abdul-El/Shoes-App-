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
 * Zod schema for address form validation.
 * Validates street, city, state, zipCode, and country fields.
 */
export const addressSchema = z.object({
    /** User's street address - must be at least 1 character */
    street: z.string().min(1, {
        message: "Please enter your street address.",
    }),
    /** User's city - must be at least 1 character */
    city: z.string().min(1, {
        message: "Please enter your city.",
    }),
    /** User's state - must be at least 1 character */
    state: z.string().min(1, {
        message: "Please enter your state.",
    }),
    /** User's zip code - must be a number between 4 and 8 digits */
    zipCode: z.string()
        .min(4, {
            message: "Please enter your zip code.",
        }).max(8, {
            message: "Zip code is too long.",
        }),
    /** User's country - must be at least 1 character */
    country: z.string().min(1, {
        message: "Please enter your country.",
    }),
})

/**
 * Zod schema for add items (product) form validation.
 * Validates product name, description, price, quantity, category, and image.
 */
export const addItemSchema = z.object({
    /** Product name - must be at least 1 character */
    name: z.string().min(1, {
        message: "Please enter a product name.",
    }),
    /** Product description - must be at least 1 character */
    description: z.string().min(1, {
        message: "Please enter a description.",
    }),
    /** Product price - must be a positive number */
    price: z.string().min(1, {
        message: "Please enter a price.",
    }),
    /** Product quantity - must be a positive integer */
    quantity: z.string().min(1, {
        message: "Quantity must be at least 1.",
    }),
    /** Product category - must be one of the allowed types */
    category: z.enum(["RUNNING", "CASUAL", "SPORTS", "BOOTS"], {
        message: "Please select a valid category.",
    }),
    /** Product image file */
    imageUrl: z.string().min(1, {
        message: "Please upload an image.",
    }),
})

/**
 * Zod schema for edit items (product) form validation.
 * Validates product name, description, price, quantity, category.
 */
export const editItemSchema = z.object({
    /** Product name - must be at least 1 character */
    name: z.string().min(1, {
        message: "Please enter a product name.",
    }),
    /** Product description - must be at least 1 character */
    description: z.string().min(1, {
        message: "Please enter a description.",
    }),
    /** Product price - must be a positive number */
    price: z.string().min(1, {
        message: "Please enter a price.",
    }),
    /** Product quantity - must be a positive integer */
    quantity: z.string().min(1, {
        message: "Quantity must be at least 1.",
    }),
    /** Product category - must be one of the allowed types */
    category: z.enum(["RUNNING", "CASUAL", "SPORTS", "BOOTS"], {
        message: "Please select a valid category.",
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

/**
 * TypeScript type inferred from loginSchema.
 * Represents the shape of data for address forms.
 */
export type AddressSchemaType = z.infer<typeof addressSchema>

/**
 * TypeScript type inferred from addItemSchema.
 * Represents the shape of data for add item forms.
 */
export type AddItemSchemaType = z.infer<typeof addItemSchema>

/**
 * TypeScript type inferred from addItemSchema.
 * Represents the shape of data for edit item forms.
 */
export type EditItemSchemaType = z.infer<typeof editItemSchema>
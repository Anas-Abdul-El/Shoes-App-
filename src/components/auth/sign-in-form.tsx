"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formSchema, type FormSchemaType } from "../../../schemas/form-schema"
import Link from "next/link"
import { useState, useTransition } from "react"
import { signInAction } from "../../../server/sign-form-action"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

/**
 * Sign-in form component.
 * Provides a form for new users to create an account with name, email, and password.
 * 
 * @returns {JSX.Element} Sign-in form component with name, email, and password fields
 */
export function SignInForm({ role = "USER" }: { role?: "USER" | "ADMIN" }) {
  /** React Hook Form instance with Zod validation */
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const [error, setError] = useState<string | null>()
  const [isLoading, startTransition] = useTransition()

  /**
   * Handles form submission.
   * 
   * @param {FormSchemaType} values - Validated form values (name, email, and password)
   */
  function onSubmit(values: FormSchemaType) {
    startTransition(() => {
      signInAction(values)
        .then(res => setError(res?.error))
    })
  }


  return (
    <Card className="w-80 max-w-md dark ">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          {
            role === "ADMIN" ? "Admin sign-up portal" : "Create a new account"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="ex: John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              error &&
              <div className="border-destructive border p-1">
                <p className="text-red-500 ml-2">{error}</p>
              </div>
            }
            <Button type="submit" className="w-full" disabled={isLoading}>
              Sign In
            </Button>
          </form>
        </Form>
        {
          role !== "ADMIN" &&
          <CardFooter>
            <div className=" my-5 text-sm text-center">
              <Link href="/login" className="hover:underline">
                Already have an account?
              </Link>
            </div>
          </CardFooter>
        }
      </CardContent>
    </Card >
  )
}

"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema, type LoginSchemaType } from "../../../schemas/form-schema"
import { useState, useTransition } from "react"
import { loginInAction } from "../../../server/login-form-action"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
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
 * Login form component.
 * Provides a form for users to log in with email and password.
 * 
 * @returns {JSX.Element} Login form component with email and password fields
 */
export function LoginForm() {
  /** React Hook Form instance with Zod validation */
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isLoading, startTransition] = useTransition()
  const [error, setError] = useState<string>()

  /**
   * Handles form submission.
   * 
   * @param {LoginSchemaType} values - Validated form values (email and password)
   */
  function onSubmit(values: LoginSchemaType): void {
    startTransition(() => {
      loginInAction(values)
        .then(res => {
          setError(res?.error)
        })
    })
  }

  return (
    <Card className="w-80 max-w-md dark ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      autoComplete="current-password"
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
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              Login
            </Button>
          </form>
        </Form>
        <CardFooter>
          <div className="mb-4 mt-5 text-sm text-center">
            <Link href="/sign-in" className="hover:underline ">
              create an account
            </Link>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

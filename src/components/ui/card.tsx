import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card container component.
 * Main wrapper for card content.
 * 
 * @param {Object} props - Card props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card container
 */
function Card({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card header component.
 * Container for card title and description.
 * 
 * @param {Object} props - CardHeader props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card header
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card title component.
 * Displays the main title of the card.
 * 
 * @param {Object} props - CardTitle props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card title
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Card description component.
 * Displays secondary text below the card title.
 * 
 * @param {Object} props - CardDescription props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card description
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

/**
 * Card action component.
 * Container for action buttons or links in the card header.
 * 
 * @param {Object} props - CardAction props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card action
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Card content component.
 * Main content area of the card.
 * 
 * @param {Object} props - CardContent props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card content
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Card footer component.
 * Container for footer content at the bottom of the card.
 * 
 * @param {Object} props - CardFooter props
 * @param {string} props.className - Additional CSS classes
 * @param {...React.ComponentProps<"div">} props - All standard div HTML attributes
 * @returns {JSX.Element} Card footer
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
